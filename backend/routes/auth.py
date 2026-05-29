from fastapi import APIRouter, HTTPException
from models.user import RegisterModel, LoginModel
from services.auth_service import hash_password, verify_password, create_token
from config import MONGODB_URL, DATABASE_NAME
from pymongo import MongoClient

router = APIRouter()

try:
    client = MongoClient(MONGODB_URL, serverSelectionTimeoutMS=5000)
    client.server_info()  # This will throw if MongoDB is not reachable
    db = client[DATABASE_NAME]
    print("✅ MongoDB connected successfully!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    db = None

@router.post("/register")
def register(user: RegisterModel):
    try:
        print(f"📩 Register attempt: {user.email}")
        
        if db is None:
            raise HTTPException(status_code=500, detail="Database not connected")

        existing = db.users.find_one({"email": user.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed = hash_password(user.password)
        db.users.insert_one({
            "name": user.name,
            "email": user.email,
            "password": hashed
        })
        print(f"✅ User created: {user.email}")
        return {"message": "Account created successfully!"}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Register error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(user: LoginModel):
    try:
        print(f"🔐 Login attempt: {user.email}")
        
        if db is None:
            raise HTTPException(status_code=500, detail="Database not connected")

        db_user = db.users.find_one({"email": user.email})
        if not db_user:
            raise HTTPException(status_code=400, detail="Invalid email or password")

        if not verify_password(user.password, db_user["password"]):
            raise HTTPException(status_code=400, detail="Invalid email or password")

        token = create_token({"userId": str(db_user["_id"]), "email": user.email})
        print(f"✅ Login success: {user.email}")
        return {"token": token, "name": db_user["name"]}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Login error: {e}")
        raise HTTPException(status_code=500, detail=str(e))