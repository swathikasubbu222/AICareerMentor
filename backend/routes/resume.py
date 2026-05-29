from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ResumeInput(BaseModel):
    resume_text: str

@router.post("/analyze")
def analyze_resume(data: ResumeInput):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert career coach and resume analyzer. Always respond in JSON format only."
                },
                {
                    "role": "user",
                    "content": f"""Analyze this resume and respond ONLY in this JSON format:
{{
    "score": <number 0-100>,
    "summary": "<2 sentence summary>",
    "strengths": ["strength1", "strength2", "strength3"],
    "improvements": ["improvement1", "improvement2", "improvement3"],
    "missing_skills": ["skill1", "skill2", "skill3"],
    "recommended_roles": ["role1", "role2", "role3"]
}}

Resume:
{data.resume_text}"""
                }
            ]
        )
        
        import json
        result = response.choices[0].message.content
        return json.loads(result)
    
    except Exception as e:
        print(f"FULL ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))