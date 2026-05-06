# The global memory of your backend
system_state = {
    "mode": "NORMAL",
    "severity": 1,
    "active_disaster": None
}

def trigger_disaster(disaster_type: str, severity: int):
    """Activates the disaster mode and updates the global state."""
    system_state["mode"] = "DISASTER"
    system_state["active_disaster"] = disaster_type
    system_state["severity"] = severity
    
    # In a real app, you would log this to a database
    print(f"🚨 ALERT: {disaster_type.upper()} simulated at Severity {severity}!")
    
    return {
        "status": "critical", 
        "message": f"Emergency protocols activated. Throttling non-essential bandwidth."
    }

def reset_network():
    """Returns the network to a peaceful state."""
    system_state["mode"] = "NORMAL"
    system_state["active_disaster"] = None
    system_state["severity"] = 1
    
    print("✅ Network stabilized.")
    
    return {
        "status": "healthy", 
        "message": "Network stabilized. Standard routing resumed."
    }