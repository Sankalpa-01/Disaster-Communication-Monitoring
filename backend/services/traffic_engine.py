import random
from services.disaster_sim import apply_disaster_physics

from ml.inference import get_traffic_embedding

def generate_traffic_tick(state: dict):
    """
    Generates a single "frame" or "tick" of live network data.
    This is what gets blasted to Next.js via WebSockets.
    """
    
    # 1. Base Traffic Distribution (Normal Mode)
    # Heavy on entertainment, light on emergency
    ratios = {
        "Streaming": 20, 
        "Standard Web": 15, 
        "Emergency VoIP": 5
    }
    
    # 2. Disaster Policy Enforcement
    # If disaster strikes, the AI router drops Netflix and boosts Hospitals
    if state["mode"] == "DISASTER":
        ratios = {
            "Streaming": 2,          # Throttled heavily!
            "Standard Web": 5,       # Throttled
            "Emergency VoIP": 35     # Priority bandwidth given!
        }
    
    packets = []
    
    # 3. Generate the actual packet flows
    for t_type, count in ratios.items():
        for i in range(count):
            
            # Establish baseline healthy physics for each traffic type
            if t_type == "Streaming":
                rtt, jitter, p_size = 35.0, 5.0, 1500  # Big packets, fast ping
            elif t_type == "Standard Web":
                rtt, jitter, p_size = 45.0, 15.0, 800  # Medium packets
            else: # Emergency VoIP
                rtt, jitter, p_size = 20.0, 2.0, 200   # Tiny packets, ultra-fast ping
                
            # 4. Apply Disaster Physics (if active)
            if state["mode"] == "DISASTER":
                # The AI router protects emergency traffic from the chaos
                eff_severity = state["severity"] if t_type != "Emergency VoIP" else state["severity"] * 0.2
                rtt, jitter = apply_disaster_physics(rtt, jitter, eff_severity)
                
            coordinates = get_traffic_embedding(rtt, jitter, p_size)

            # Create the packet object
            packets.append({
                # Change the ID generation to use the stable index 'i'
                "id": f"{t_type[:3].upper()}-{i}", 
                "category": t_type,
                "rtt": round(rtt, 2),
                "jitter": round(jitter, 2),
                "packet_size": int(p_size + random.randint(-50, 50)),
                "coordinates": coordinates 
            })
            
    # Shuffle the packets so it looks organic on the frontend
    random.shuffle(packets)
    
    # Return the final payload that Next.js will receive
    return {
        "system_status": state["mode"],
        "severity": state["severity"],
        "active_connections": len(packets),
        "flows": packets
    }