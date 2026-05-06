# from fastapi import APIRouter
# from pydantic import BaseModel
# from services.policy_manager import system_state, trigger_disaster, reset_network

# router = APIRouter()

# # Define the expected format from Next.js
# class DisasterRequest(BaseModel):
#     disaster_type: str
#     severity: int = 8
#     infra_damage: int = 0         # Default to 0
#     traffic_surge: int = 100      # Default to 100%
#     emergency_priority: bool = True
#     traffic_source: str = "simulated"

# @router.get("/status")
# async def get_status():
#     """Returns the current state of the network simulation."""
#     return system_state

# @router.post("/trigger")
# async def activate_emergency(request: DisasterRequest):
#     """Next.js calls this when the user hits the Big Red Button."""
#     response = trigger_disaster(request.disaster_type, request.severity)
#     return response

# @router.post("/reset")
# async def deactivate_emergency():
#     """Next.js calls this when the user stabilizes the network."""
#     response = reset_network()
#     return response

from fastapi import APIRouter
from pydantic import BaseModel
from services.policy_manager import system_state, trigger_disaster, reset_network

router = APIRouter()

# Define the expected format from Next.js
class DisasterRequest(BaseModel):
    disaster_type: str
    severity: int
    infra_damage: int = 0         # Default to 0
    traffic_surge: int = 100      # Default to 100%
    emergency_priority: bool = True
    traffic_source: str = "simulated"

@router.get("/status")
async def get_status():
    """Returns the current state of the network simulation."""
    return system_state

@router.post("/trigger")
async def activate_emergency(request: DisasterRequest):
    """Next.js calls this when the user hits the Big Red Button."""
    
    # 1. Print the incoming data to the Python terminal so you can verify the connection!
    print(f"\n🚨 RECEIVED COMMAND FROM COMMAND CENTER 🚨")
    print(f"Type: {request.disaster_type.upper()}, Severity: {request.severity}")
    print(f"Damage: {request.infra_damage}%, Surge: {request.traffic_surge}%")
    print(f"Priority: {'ON' if request.emergency_priority else 'OFF'}")
    print(f"Source: {request.traffic_source}\n")

    # 2. Call your policy manager 
    # (Note: Right now policy_manager only expects type and severity. 
    # We will upgrade policy_manager to use the damage/surge math in the next step!)
    response = trigger_disaster(request.disaster_type, request.severity)
    
    return response

@router.post("/reset")
async def deactivate_emergency():
    """Next.js calls this when the user stabilizes the network."""
    print("\n✅ COMMAND CENTER: NETWORK RESET INITIATED\n")
    response = reset_network()
    return response