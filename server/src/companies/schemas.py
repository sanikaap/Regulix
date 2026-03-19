from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class CompanyCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    industry: Optional[str] = None
    jurisdictions: List[str] = []
    product_types: List[str] = []
    tech_stack: List[str] = []
    revenue_band: Optional[str] = None

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    industry: Optional[str] = None
    jurisdictions: Optional[List[str]] = None
    product_types: Optional[List[str]] = None
    tech_stack: Optional[List[str]] = None
    revenue_band: Optional[str] = None

class CompanyResponse(BaseModel):
    id: str
    user_id: str
    name: str
    industry: Optional[str]
    jurisdictions: List[str]
    product_types: List[str]
    tech_stack: List[str]
    revenue_band: Optional[str]
    completion_percent: int
    created_at: datetime
    
    class Config:
        from_attributes = True