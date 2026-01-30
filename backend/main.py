from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
import json
import re

load_dotenv()

app = FastAPI(title="Translation API", description="Chinese to English Translation with Keyword Extraction")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslationRequest(BaseModel):
    text: str

class TranslationResponse(BaseModel):
    translation: str
    keywords: list[str]

# DeepSeek API configuration
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
if not DEEPSEEK_API_KEY:
    raise ValueError("DEEPSEEK_API_KEY environment variable is required")

client = openai.OpenAI(
    api_key=DEEPSEEK_API_KEY,
    base_url="https://api.deepseek.com/v1"
)

@app.post("/translate", response_model=TranslationResponse)
async def translate_text(request: TranslationRequest):
    try:
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        # Create a comprehensive prompt for translation and keyword extraction
        prompt = f"""
请将以下中文翻译成英文，并从原文中提取3个最重要的关键词。

中文原文: {request.text}

请按以下JSON格式返回结果：
{{
    "translation": "英文翻译结果",
    "keywords": ["关键词1", "关键词2", "关键词3"]
}}

要求：
1. 翻译要准确、自然、流畅
2. 关键词应该是原文中最重要的词汇，能概括主要内容
3. 严格按照JSON格式返回，不要添加任何其他文字
"""

        # Call DeepSeek API
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a professional translator and keyword extraction expert. Always respond with valid JSON format only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1000
        )

        # Extract the response content
        response_content = response.choices[0].message.content.strip()
        
        # Try to parse JSON response
        try:
            # Clean up the response to ensure it's valid JSON
            response_content = response_content.replace("```json", "").replace("```", "").strip()
            result = json.loads(response_content)
            
            # Validate the response structure
            if "translation" not in result or "keywords" not in result:
                raise ValueError("Invalid response structure")
            
            # Ensure keywords is a list with exactly 3 items
            keywords = result["keywords"]
            if not isinstance(keywords, list):
                raise ValueError("Keywords must be a list")
            
            # Limit to 3 keywords, pad if less than 3
            if len(keywords) < 3:
                keywords.extend([""] * (3 - len(keywords)))
            keywords = keywords[:3]
            
            return TranslationResponse(
                translation=result["translation"],
                keywords=keywords
            )
            
        except json.JSONDecodeError:
            # Fallback: try to extract translation and keywords manually
            translation_match = re.search(r'"translation":\s*"([^"]*)"', response_content)
            keywords_match = re.search(r'"keywords":\s*\[(.*?)\]', response_content)
            
            if translation_match:
                translation = translation_match.group(1)
                keywords = []
                
                if keywords_match:
                    keywords_str = keywords_match.group(1)
                    keywords = [kw.strip().strip('"') for kw in keywords_str.split(',')]
                
                # Ensure exactly 3 keywords
                if len(keywords) < 3:
                    keywords.extend([""] * (3 - len(keywords)))
                keywords = keywords[:3]
                
                return TranslationResponse(
                    translation=translation,
                    keywords=keywords
                )
            else:
                raise HTTPException(status_code=500, detail="Failed to parse AI response")
    
    except openai.APIError as e:
        raise HTTPException(status_code=500, detail=f"DeepSeek API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Translation API is running", "endpoint": "POST /translate"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
