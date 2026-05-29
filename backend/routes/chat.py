from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatInput(BaseModel):
    message: str
    history: list = []

@router.post("/message")
def chat(data: ChatInput):
    try:
        messages = [
            {
                "role": "system",
                "content": "You are an expert AI career mentor helping students with career advice, job searching, resume tips, skill development, and interview preparation. Be encouraging, practical and specific."
            }
        ]
        for h in data.history:
            messages.append(h)
        messages.append({"role": "user", "content": data.message})

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        print(f"FULL ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))