from fastapi import APIRouter
from pydantic import BaseModel
from services.policy_manager import system_state, trigger_disaster, reset_network

router = APIRouter()

# Define the expected format from Next.js
class DisasterRequest(BaseModel):
    disaster_type: str = "earthquake"
    severity: int = 8

@router.get("/status")
async def get_status():
    """Returns the current state of the network simulation."""
    return system_state

@router.post("/trigger")
async def activate_emergency(request: DisasterRequest):
    """Next.js calls this when the user hits the Big Red Button."""
    response = trigger_disaster(request.disaster_type, request.severity)
    return response

@router.post("/reset")
async def deactivate_emergency():
    """Next.js calls this when the user stabilizes the network."""
    response = reset_network()
    return response