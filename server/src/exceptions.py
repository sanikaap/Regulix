from fastapi import HTTPException, status

class RegulixException(Exception):
    """Base exception for Regulix"""
    pass

class NotFoundException(RegulixException):
    """Resource not found"""
    pass

class UnauthorizedException(RegulixException):
    """Unauthorized access"""
    pass

class ValidationException(RegulixException):
    """Validation error"""
    pass

# HTTP Exception handlers
def not_found(detail: str = "Resource not found"):
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=detail
    )

def unauthorized(detail: str = "Unauthorized"):
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail
    )

def forbidden(detail: str = "Forbidden"):
    return HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail=detail
    )

def bad_request(detail: str = "Bad request"):
    return HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail=detail
    )