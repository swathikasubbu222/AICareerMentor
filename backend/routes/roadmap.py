from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class RoadmapInput(BaseModel):
    current_skills: str
    target_role: str

@router.post("/generate")
def generate_roadmap(data: RoadmapInput):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert career coach. Always respond in JSON format only."
                },
                {
                    "role": "user",
                    "content": f"""Create a career roadmap for someone with skills: {data.current_skills} who wants to become a {data.target_role}.
Respond ONLY in this JSON format:
{{
    "target_role": "{data.target_role}",
    "estimated_time": "X months",
    "steps": [
        {{"step": 1, "title": "title", "description": "description", "skills": ["skill1", "skill2"], "duration": "X weeks"}},
        {{"step": 2, "title": "title", "description": "description", "skills": ["skill1", "skill2"], "duration": "X weeks"}}
    ],
    "resources": ["resource1", "resource2", "resource3"]
}}"""
                }
            ]
        )
        result = response.choices[0].message.content
        return json.loads(result)
    except Exception as e:
        print(f"FULL ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))