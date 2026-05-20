# import torch
# import os
# from ml.encoder import NetworkFlowEncoder
# from core.config import settings
# import random

# # 1. Initialize the architecture (Must match what you trained in Colab)
# # We set embedding_dim=2 so it spits out [X, Y] coordinates for the frontend heatmap
# model = NetworkFlowEncoder(input_features=3, hidden_dim=64, embedding_dim=2)

# # 2. Safely load the weights (if they exist)
# try:
#     # map_location='cpu' prevents crashes if you trained on a GPU in Colab
#     model.load_state_dict(torch.load(settings.MODEL_PATH, map_location=torch.device('cpu')))
#     model.eval()  # Put model in testing mode (turns off dropout/gradients)
#     print("🧠 PyTorch AI Brain loaded successfully. Ready for inference.")
#     MODEL_READY = True
# except FileNotFoundError:
#     print("⚠️ WARNING: disaster_model.pth not found in ml/weights/. Using untrained fallback coordinates.")
#     MODEL_READY = False

# def get_traffic_embedding(rtt: float, jitter: float, packet_size: int):
#     """
#     Takes live stats from the traffic engine, passes them through the PyTorch model,
#     and returns an [X, Y] coordinate array for the frontend visualizer.
#     """
#     if not MODEL_READY:
#         # Fallback: If no model is loaded yet, just return dummy coordinates based on math
#         # This allows you to build and test the Next.js frontend BEFORE Colab is finished!
#         import random
#         return [float(packet_size % 10), float(rtt % 10)]

#     # Format the incoming data into a PyTorch Tensor
#     # Shape expected: (Batch Size, Sequence Length, Features) -> (1, 1, 3)
#     packet_features = [[rtt, jitter, float(packet_size)]]
#     tensor_data = torch.tensor([packet_features], dtype=torch.float32)
    
#     # Run the math without calculating gradients (saves CPU power)
#     with torch.no_grad():
#         embedding = model(tensor_data)
        
#     # Return the [X, Y] coordinate list
#     return embedding.numpy().tolist()[0]

# import torch
# import os
# from ml.encoder import NetworkFlowEncoder
# from core.config import settings
# import random

# model = NetworkFlowEncoder(input_features=3, hidden_dim=64, embedding_dim=2)

# try:
#     model.load_state_dict(torch.load(settings.MODEL_PATH, map_location=torch.device('cpu')))
#     model.eval() 
#     print("🧠 PyTorch AI Brain loaded successfully. Ready for inference.")
#     MODEL_READY = True
# except FileNotFoundError:
#     print("⚠️ WARNING: disaster_model.pth not found in ml/weights/. Using untrained fallback coordinates.")
#     MODEL_READY = False

# def get_traffic_embedding(rtt: float, jitter: float, packet_size: int):
#     """
#     Takes live stats from the traffic engine, passes them through the PyTorch model,
#     and returns an [X, Y] coordinate array for the frontend visualizer.
#     """
#     if not MODEL_READY:
#         # FAKE AI CLUSTERING (Until your .pth model is ready)
#         # We force the dots to spread out between -1.0 and 1.0 so the D3 Contour filter can calculate 2D density
#         import random
        
#         if packet_size > 1000:
#             # Streaming -> Top Left
#             return [random.uniform(-0.8, -0.2), random.uniform(0.2, 0.8)]
#         elif packet_size > 500:
#             # Web -> Top Right
#             return [random.uniform(0.2, 0.8), random.uniform(0.2, 0.8)]
#         else:
#             # Emergency -> Bottom Center
#             return [random.uniform(-0.4, 0.4), random.uniform(-0.8, -0.2)]

#     # Format the incoming data into a PyTorch Tensor
#     packet_features = [[rtt, jitter, float(packet_size)]]
#     tensor_data = torch.tensor([packet_features], dtype=torch.float32)
    
#     with torch.no_grad():
#         embedding = model(tensor_data)
        
#     return embedding.numpy().tolist()[0]

# ml/inference.py
import numpy as np
import joblib
import tensorflow as tf
from core.config import settings

class OmniRouteInference:
    def __init__(self):
        print("Loading OmniRoute AI Models into memory...")
        try:
            # Load the Deep Learning Encoder
            self.encoder = tf.keras.models.load_model(settings.ENCODER_MODEL_PATH)
            
            # Load the Scikit-Learn Edge Classifiers
            self.traffic_classifier = joblib.load(settings.TRAFFIC_CLASSIFIER_PATH)
            self.qos_router = joblib.load(settings.QOS_ROUTER_PATH)
            print("All models successfully loaded!")
        except Exception as e:
            print(f"Error loading models: {e}. Please ensure files are in the ml/weights/ folder.")

    def predict_route(self, flow_data: dict):
        # 1. Format raw data for Model 1 (The Profiler)
        raw_features = np.array([[
            flow_data['packet_rate'], 
            flow_data['avg_packet_size'], 
            flow_data['inter_arrival_time'], 
            flow_data['rtt'], 
            flow_data['jitter']
        ]])
        
        # 2. Extract Context-Aware Flow Embeddings
        embeddings = self.encoder.predict(raw_features, verbose=0)
        
        # 3. Format inputs for Model 2 (The Edge Classifier)
        edge_inputs = np.array([[
            embeddings[0][0], 
            embeddings[0][1], 
            embeddings[0][2], 
            embeddings[0][3],
            flow_data['disaster_severity'], 
            flow_data['network_load']
        ]])
        
        # 4. Make Lightning-Fast Routing Decisions
        traffic_class = self.traffic_classifier.predict(edge_inputs)[0]
        qos_action = self.qos_router.predict(edge_inputs)[0]
        
        return {
            "predicted_traffic_class": traffic_class,
            "predicted_qos_action": qos_action
        }

# Instantiate globally so it is only loaded once per server instance
inference_engine = OmniRouteInference()