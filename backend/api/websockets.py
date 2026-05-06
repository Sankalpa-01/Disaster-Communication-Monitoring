from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
from services.traffic_engine import generate_traffic_tick
from services.policy_manager import system_state

router = APIRouter()

@router.websocket("/stream")
async def traffic_stream(websocket: WebSocket):
    """Streams live synthetic network packets to the Next.js frontend."""
    await websocket.accept()
    print("🟢 Frontend connected to Live Traffic Stream.")
    
    try:
        while True:
            # 1. Ask the engine to generate fake data based on current state (Normal vs Disaster)
            live_data = generate_traffic_tick(system_state)
            
            # 2. Send the JSON payload directly to Next.js
            await websocket.send_text(json.dumps(live_data))
            
            # 3. Sleep for 0.1 seconds (gives you a smooth 10 frames-per-second update rate)
            await asyncio.sleep(0.4)
            
    except WebSocketDisconnect:
        print("🔴 Frontend disconnected from stream.")
    except Exception as e:
        print(f"⚠️ WebSocket Error: {e}")