import logging
import os
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routes import blogs

load_dotenv()

logger = logging.getLogger("portfolio_blog_api")
if not logger.hasHandlers():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )


def parse_allowed_origins(value: str) -> List[str]:
    origins = [origin.strip() for origin in value.split(",") if origin.strip()]
    clean_origins = [origin.rstrip("/") for origin in origins]
    return clean_origins


ALLOWED_ORIGINS = parse_allowed_origins(
    os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:8080,http://127.0.0.1:5173,https://gaurav-patrekar-portfolio.vercel.app",
    )
)
FASTAPI_HOST = os.getenv("FASTAPI_HOST", "0.0.0.0")
FASTAPI_PORT = int(os.getenv("FASTAPI_PORT", "8000"))
FASTAPI_ENV = os.getenv("FASTAPI_ENV", "production")

# Create FastAPI app
app = FastAPI(
    title="Gaurav Patrekar - Portfolio API",
    description="API for the portfolio website with blog system",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

# Include routes
app.include_router(blogs.router, prefix="/api")


@app.on_event("startup")
async def startup_event():
    logger.info("Starting Portfolio Blog API")
    logger.info("Allowed origins: %s", ALLOWED_ORIGINS)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return JSONResponse({"status": "healthy", "message": "Portfolio API is running"})


@app.get("/")
async def root():
    """Root endpoint."""
    return JSONResponse(
        {
            "message": "Welcome to Gaurav Patrekar's Portfolio API",
            "docs": "/docs",
            "openapi_url": "/openapi.json",
        }
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=FASTAPI_HOST,
        port=FASTAPI_PORT,
        reload=FASTAPI_ENV == "development",
    )
