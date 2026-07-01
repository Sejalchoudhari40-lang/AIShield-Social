from auth.current_user import get_current_user
from database.user_model import User
from database.analysis_model import Analysis
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database.database import get_db
from database.user_crud import (
    create_user,
    get_user_by_email,
    authenticate_user,
)

from auth.password import (
    hash_password,
    verify_password,
)

from auth.auth_handler import create_access_token

router = APIRouter()


# -------------------------
# Request Models
# -------------------------

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str

class UpdateProfileRequest(BaseModel):
    username: str
    email: str
# -------------------------
# Register API
# -------------------------
class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(
        db,
        data.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    user = create_user(
        db,
        username=data.username,
        email=data.email,
        password=hash_password(data.password),
    )

    return {
        "message": "User Registered Successfully ✅",
        "username": user.username,
        "email": user.email,
    }


# -------------------------
# Login API
# -------------------------

@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = authenticate_user(
        db,
        data.email,
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email",
        )

    if not verify_password(
        data.password,
        user.password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password",
        )

    access_token = create_access_token(
        {
            "sub": user.email,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username,
    }
    
@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    total_uploads = (
        db.query(Analysis)
        .count()
    )

    positive_analysis = (
        db.query(Analysis)
        .filter(Analysis.sentiment == "POSITIVE")
        .count()
    )

    safe_content = (
        db.query(Analysis)
        .filter(Analysis.confidence >= 50)
        .count()
    )

    return {
        "username": current_user.username,
        "email": current_user.email,
        "total_uploads": total_uploads,
        "positive_analysis": positive_analysis,
        "safe_content": safe_content,
        "member_since": "June 2026",
    }
@router.put("/profile/update")
def update_profile(
    data: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    current_user.username = data.username
    current_user.email = data.email

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile Updated Successfully",
        "username": current_user.username,
        "email": current_user.email,
    }
@router.put("/change-password")
def change_password(
    data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    if not verify_password(
        data.current_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect",
        )

    current_user.password = hash_password(
        data.new_password
    )

    db.commit()

    return {
        "message": "Password Changed Successfully ✅"
    }