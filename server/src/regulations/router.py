from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from ..database import get_async_db
from ..dependencies import get_current_user
from ..auth.models import User
from . import service
from .schemas import RegulationResponse

router = APIRouter(prefix="/regulations", tags=["Regulations"])

@router.get("", response_model=List[RegulationResponse])
async def get_regulations(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    severity: Optional[str] = None,
    source: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db)
):
    """Get paginated list of regulations with optional filters"""
    regulations = await service.get_regulations(
        db, 
        skip=skip, 
        limit=limit,
        severity=severity,
        source=source
    )
    return regulations

@router.get("/{regulation_id}", response_model=RegulationResponse)
async def get_regulation(
    regulation_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db)
):
    """Get single regulation by ID"""
    regulation = await service.get_regulation_by_id(db, regulation_id)
    if not regulation:
        from ..exceptions import not_found
        raise not_found("Regulation not found")
    
    return regulation