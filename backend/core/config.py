# import os
# from dotenv import load_dotenv

# # Load variables from the .env file
# load_dotenv()

# class Settings:
#     # App Settings
#     APP_NAME: str = "Disaster Command Center API"
#     APP_ENV: str = os.getenv("APP_ENV", "development")
    
#     # Machine Learning Settings
#     BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#     WEIGHTS_DIR = os.path.join(BASE_DIR, "ml", "weights")
#     MODEL_PATH = os.path.join(WEIGHTS_DIR, "disaster_model.pth")
    
#     # Future-proofing: Add your Weather API key here later!
#     # WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "")

# # Create a global settings object to import anywhere
# settings = Settings()

# core/config.py
import os
from pathlib import Path

# Build paths relative to this config file
BASE_DIR = Path(__file__).resolve().parent.parent
WEIGHTS_DIR = os.path.join(BASE_DIR, "ml", "weights")

class Settings:
    PROJECT_NAME: str = "OmniRoute Backend"
    
    # AI Model Paths
    ENCODER_MODEL_PATH: str = os.path.join(WEIGHTS_DIR, "omniroute_encoder.h5")
    TRAFFIC_CLASSIFIER_PATH: str = os.path.join(WEIGHTS_DIR, "omniroute_traffic_classifier.pkl")
    QOS_ROUTER_PATH: str = os.path.join(WEIGHTS_DIR, "omniroute_qos_router.pkl")

settings = Settings()