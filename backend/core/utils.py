import logging

# -----------------------------------------
# 1. Professional Terminal Logging
# -----------------------------------------
def setup_logger(name: str):
    """Creates a clean, formatted logger for your terminal."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s | %(levelname)s | %(name)s | %(message)s', 
            datefmt='%H:%M:%S'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
    return logger

# -----------------------------------------
# 2. Machine Learning Math Helpers
# -----------------------------------------
def normalize_value(value: float, min_val: float, max_val: float) -> float:
    """
    Min-Max Scaling: Compresses any number into a safe 0.0 to 1.0 range 
    so it doesn't break the PyTorch model.
    """
    if max_val == min_val:
        return 0.0
    
    # Ensure value doesn't exceed our expected bounds
    value = max(min_val, min(value, max_val))
    
    return (value - min_val) / (max_val - min_val)

def clamp(value: float, min_val: float, max_val: float) -> float:
    """Forces a value to stay within a specific min/max range."""
    return max(min_val, min(value, max_val))