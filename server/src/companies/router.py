from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from ..database import get_async_db
from ..dependencies import get_current_user
from ..auth.models import User
from . import service
from .schemas import CompanyCreate, CompanyUpdate, CompanyResponse

router = APIRouter(prefix="/companies", tags=["Companies"])

@router.post("", response_model=CompanyResponse, status_code=201)
async def create_company(
    data: CompanyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db)
):
    # Check if company already exists
    existing = await service.get_company_by_user(db, current_user.id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Company profile already exists"
        )
    
    company = await service.create_company(db, current_user.id, data)
    
    return CompanyResponse(
        **company.__dict__,
        completion_percent=service.calculate_completion_percent(company)
    )

@router.get("/me", response_model=CompanyResponse)
async def get_my_company(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db)
):
    company = await service.get_company_by_user(db, current_user.id)
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found"
        )
    
    return CompanyResponse(
        **company.__dict__,
        completion_percent=service.calculate_completion_percent(company)
    )

@router.patch("/me", response_model=CompanyResponse)
async def update_my_company(
    data: CompanyUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db)
):
    company = await service.get_company_by_user(db, current_user.id)
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found"
        )
    
    company = await service.update_company(db, company, data)
    
    return CompanyResponse(
        **company.__dict__,
        completion_percent=service.calculate_completion_percent(company)
    )