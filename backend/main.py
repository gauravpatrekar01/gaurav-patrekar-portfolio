from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import os

from app.routes import blogs

# Create FastAPI app
app = FastAPI(
    title="Gaurav Patrekar - Portfolio API",
    description="API for the portfolio website with blog system",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://gaurav-patrekar-portfolio.vercel.app/",
        "http://localhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(blogs.router, prefix="/api")

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return JSONResponse(
        {
            "status": "healthy",
            "message": "Portfolio API is running",
        }
    )

# Root endpoint
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
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
