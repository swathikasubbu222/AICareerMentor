from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.resume import router as resume_router
from routes.interview import router as interview_router
from routes.roadmap import router as roadmap_router
from routes.chat import router as chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(resume_router, prefix="/api/resume")
app.include_router(interview_router, prefix="/api/interview")
app.include_router(roadmap_router, prefix="/api/roadmap")
app.include_router(chat_router, prefix="/api/chat")

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "project": "AI Career Mentor"