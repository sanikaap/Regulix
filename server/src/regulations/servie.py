from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from .models import Regulation, SeverityLevel

async def get_regulations(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 20,
    severity: Optional[str] = None,
    source: Optional[str] = None
) -> List[Regulation]:
    query = select(Regulation)
    
    if severity:
        query = query.where(Regulation.severity == severity)
    if source:
        query = query.where(Regulation.source == source)
    
    query = query.offset(skip).limit(limit).order_by(Regulation.created_at.desc())
    
    result = await db.execute(query)
    return result.scalars().all()

async def get_regulation_by_id(db: AsyncSession, regulation_id: str) -> Regulation | None:
    result = await db.execute(select(Regulation).where(Regulation.id == regulation_id))
    return result.scalar_one_or_none()