from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class InterviewInput(BaseModel):
    role: str

@router.post("/questions")
def generate_questions(data: InterviewInput):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert technical interviewer. Always respond in JSON format only."
                },
                {
                    "role": "user",
                    "content": f"""Generate 8 interview questions for a {data.role} position.
Respond ONLY in this JSON format:
{{
    "questions": [
        {{"question": "question here", "tip": "brief answering tip here"}},
        {{"question": "question here", "tip": "brief answering tip here"}}
    ]
}}"""
                }
            ]
        )
        result = response.choices[0].message.content
        return json.loads(result)
    except Exception as e:
        print(f"FULL ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))