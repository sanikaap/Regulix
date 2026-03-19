from sqlalchemy import Column, String, ARRAY, DateTime, ForeignKey
from sqlalchemy.sql import func
from ..database import Base
import uuid

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    
    name = Column(String, nullable=False)
    industry = Column(String, nullable=True)  # BNPL, Lending, Crypto, etc.
    
    # Arrays for multi-select fields
    jurisdictions = Column(ARRAY(String), default=list)  # ['US', 'UK', 'EU']
    product_types = Column(ARRAY(String), default=list)  # ['Lending', 'Payments']
    tech_stack = Column(ARRAY(String), default=list)     # ['AWS', 'Stripe', 'Plaid']
    
    revenue_band = Column(String, nullable=True)  # <$1M, $1M-$10M, etc.
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())