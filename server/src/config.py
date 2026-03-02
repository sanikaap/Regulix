from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Regulix"
    ENVIRONMENT: str = "development"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str
    
    # Security
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173"]
    
    # LLM
    GROQ_API_KEY: str

    
    # Scraper Schedule
    SCRAPER_CRON_HOUR: int = 6
    DIGEST_CRON_DAY: str = "monday"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()