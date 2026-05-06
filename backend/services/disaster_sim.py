import numpy as np

def apply_disaster_physics(base_rtt: float, base_jitter: float, severity: int):
    """
    Mathematically distorts network traffic based on disaster severity (1-10).
    """
    # Severity 10 means 5x latency multiplier
    rtt_multiplier = 1.0 + (severity * 0.4) 
    
    # Add random chaos (noise) to the signal
    chaos_factor = severity * 5.0
    
    # Calculate new damaged stats using numpy's normal distribution
    new_rtt = (base_rtt * rtt_multiplier) + np.random.normal(0, chaos_factor)
    new_jitter = base_jitter + np.random.normal(5, chaos_factor)
    
    # Network stats can't be negative, so we clamp them to realistic minimums
    final_rtt = max(10.0, float(new_rtt))
    final_jitter = max(1.0, float(new_jitter))
    
    return final_rtt, final_jitter