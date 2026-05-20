# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn

# # Import your routes and config
# from api.routes import router as api_router
# from api.websockets import router as ws_router
# from core.config import settings

# # Initialize the FastAPI application
# app = FastAPI(
#     title=settings.APP_NAME,
#     description="AI-Powered Disaster Communication Command Center",
#     version="1.0.0"
# )

# # Configure CORS (Cross-Origin Resource Sharing)
# # This is CRITICAL. Without this, your Next.js frontend will be blocked from connecting.
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # For development, we allow all origins. 
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows GET, POST, etc.
#     allow_headers=["*"],
# )

# # Mount the REST API and WebSocket routes
# app.include_router(api_router, prefix="/api", tags=["Control Panel"])
# app.include_router(ws_router, prefix="/ws", tags=["Live Stream"])

# @app.get("/", tags=["Health"])
# async def root():
#     """Root endpoint to verify the engine is running."""
#     return {
#         "status": "online", 
#         "system": settings.APP_NAME,
#         "environment": settings.APP_ENV
#     }

# if __name__ == "__main__":
#     # This allows you to run the server directly using `python main.py`
#     # or the standard `uvicorn main:app --reload`
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router
import uvicorn

app = FastAPI(title="OmniRoute AI Backend")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change "*" to your specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routes
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "OmniRoute AI Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    # Runs the server locally on port 8000
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)