from sqlalchemy import Column, String, Text, ARRAY, DateTime, Float, Integer, ForeignKey, Enum as SQLEnum
from sqlalchemy.sql import func
from ..database import Base
import uuid
import enum

class SeverityLevel(str, enum.Enum):
    FINAL_RULE = "Final Rule"
    PROPOSED_RULE = "Proposed Rule"
    GUIDANCE = "Guidance"

class Regulation(Base):
    __tablename__ = "regulations"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    title = Column(String, nullable=False)
    body_text = Column(Text, nullable=False)
    source = Column(String, nullable=False)  # SEC, CFPB, FCA, etc.
    source_url = Column(String, nullable=True)
    
    severity = Column(SQLEnum(SeverityLevel), nullable=True)
    jurisdictions = Column(ARRAY(String), default=list)
    product_categories = Column(ARRAY(String), default=list)
    
    published_date = Column(DateTime(timezone=True), nullable=True)
    deadline = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class RelevanceScore(Base):
    __tablename__ = "relevance_scores"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    regulation_id = Column(String, ForeignKey("regulations.id", ondelete="CASCADE"), nullable=False)
    company_id = Column(String, ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    
    score = Column(Float, nullable=False)  # 0.0 to 1.0
    match_reasons = Column(Text, nullable=True)  # JSON string with reasons
    
    computed_at = Column(DateTime(timezone=True), server_default=func.now())