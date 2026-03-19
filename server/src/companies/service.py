from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from .models import Company
from .schemas import CompanyCreate, CompanyUpdate
from ..exceptions import not_found

async def create_company(db: AsyncSession, user_id: str, data: CompanyCreate) -> Company:
    company = Company(
        user_id=user_id,
        name=data.name,
        industry=data.industry,
        jurisdictions=data.jurisdictions,
        product_types=data.product_types,
        tech_stack=data.tech_stack,
        revenue_band=data.revenue_band
    )
    db.add(company)
    await db.commit()
    await db.refresh(company)
    return company

async def get_company_by_user(db: AsyncSession, user_id: str) -> Company | None:
    result = await db.execute(select(Company).where(Company.user_id == user_id))
    return result.scalar_one_or_none()

async def update_company(db: AsyncSession, company: Company, data: CompanyUpdate) -> Company:
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(company, field, value)
    
    await db.commit()
    await db.refresh(company)
    return company

def calculate_completion_percent(company: Company) -> int:
    """Calculate profile completion percentage"""
    fields = [
        company.name,
        company.industry,
        company.jurisdictions,
        company.product_types,
        company.tech_stack,
        company.revenue_band
    ]
    
    filled = sum(1 for field in fields if field)
    return int((filled / len(fields)) * 100)