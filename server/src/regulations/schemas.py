from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .models import SeverityLevel

class RegulationCreate(BaseModel):
    title: str
    body_text: str
    source: str
    source_url: Optional[str] = None
    severity: Optional[SeverityLevel] = None
    jurisdictions: List[str] = []
    product_categories: List[str] = []
    published_date: Optional[datetime] = None
    deadline: Optional[datetime] = None

class RegulationResponse(BaseModel):
    id: str
    title: str
    body_text: str
    source: str
    source_url: Optional[str]
    severity: Optional[SeverityLevel]
    jurisdictions: List[str]
    product_categories: List[str]
    published_date: Optional[datetime]
    deadline: Optional[datetime]
    created_at: datetime
    relevance_score: Optional[float] = None
    
    class Config:
        from_attributes = True

class RelevanceScoreResponse(BaseModel):
    regulation_id: str
    score: float
    match_reasons: Optional[str]
    computed_at: datetime
    
    class Config:
        from_attributes = True