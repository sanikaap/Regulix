from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_async_db
from ..dependencies import get_current_user
from . import service
from .schemas import RegisterRequest, LoginRequest, RefreshRequest, TokenResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=201)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_async_db)
):
    user = await service.register_user(db, data)
    return user

@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    db: AsyncSession = Depends(get_async_db)
):
    return await service.login_user(db, data)

@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    data: RefreshRequest,
    db: AsyncSession = Depends(get_async_db)
):
    return await service.refresh_access_token(db, data.refresh_token)

@router.post("/logout", status_code=204)
async def logout(
    data: RefreshRequest,
    db: AsyncSession = Depends(get_async_db),
    current_user = Depends(get_current_user)
):
    await service.logout_user(db, data.refresh_token)

@router.get("/me", response_model=UserResponse)
async def get_me(current_user = Depends(get_current_user)):
    return current_user