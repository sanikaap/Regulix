from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta
from .models import User, RefreshToken
from .schemas import RegisterRequest, LoginRequest, TokenResponse
from .utils import hash_password, verify_password, create_access_token, create_refresh_token, decode_refresh_token
from ..exceptions import bad_request, unauthorized
from ..config import settings

async def register_user(db: AsyncSession, data: RegisterRequest) -> User:
    # Check if user exists
    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise bad_request("Email already registered")
    
    # Create user
    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password)
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

async def login_user(db: AsyncSession, data: LoginRequest) -> TokenResponse:
    # Get user
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(data.password, user.hashed_password):
        raise unauthorized("Invalid email or password")
    
    if not user.is_active:
        raise unauthorized("Account is inactive")
    
    # Create tokens
    access_token = create_access_token({"sub": user.id})
    refresh_token_str = create_refresh_token({"sub": user.id})
    
    # Store refresh token
    refresh_token = RefreshToken(
        token=refresh_token_str,
        user_id=user.id,
        expires_at=datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )
    db.add(refresh_token)
    await db.commit()
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token_str
    )

async def refresh_access_token(db: AsyncSession, refresh_token: str) -> TokenResponse:
    payload = decode_refresh_token(refresh_token)
    if not payload:
        raise unauthorized("Invalid refresh token")
    
    # Verify token exists in DB
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token == refresh_token)
    )
    token_record = result.scalar_one_or_none()
    
    if not token_record or token_record.expires_at < datetime.utcnow():
        raise unauthorized("Refresh token expired")
    
    # Create new access token
    access_token = create_access_token({"sub": payload["sub"]})
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )

async def get_user_by_id(db: AsyncSession, user_id: str) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def logout_user(db: AsyncSession, refresh_token: str):
    await db.execute(
        select(RefreshToken).where(RefreshToken.token == refresh_token)
    )
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token == refresh_token)
    )
    token_record = result.scalar_one_or_none()
    if token_record:
        await db.delete(token_record)
        await db.commit()