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

import torch
import os
from ml.encoder import NetworkFlowEncoder
from core.config import settings
import random

model = NetworkFlowEncoder(input_features=3, hidden_dim=64, embedding_dim=2)

try:
    model.load_state_dict(torch.load(settings.MODEL_PATH, map_location=torch.device('cpu')))
    model.eval() 
    print("🧠 PyTorch AI Brain loaded successfully. Ready for inference.")
    MODEL_READY = True
except FileNotFoundError:
    print("⚠️ WARNING: disaster_model.pth not found in ml/weights/. Using untrained fallback coordinates.")
    MODEL_READY = False

def get_traffic_embedding(rtt: float, jitter: float, packet_size: int):
    """
    Takes live stats from the traffic engine, passes them through the PyTorch model,
    and returns an [X, Y] coordinate array for the frontend visualizer.
    """
    if not MODEL_READY:
        # FAKE AI CLUSTERING (Until your .pth model is ready)
        # We force the dots to spread out between -1.0 and 1.0 so the D3 Contour filter can calculate 2D density
        import random
        
        if packet_size > 1000:
            # Streaming -> Top Left
            return [random.uniform(-0.8, -0.2), random.uniform(0.2, 0.8)]
        elif packet_size > 500:
            # Web -> Top Right
            return [random.uniform(0.2, 0.8), random.uniform(0.2, 0.8)]
        else:
            # Emergency -> Bottom Center
            return [random.uniform(-0.4, 0.4), random.uniform(-0.8, -0.2)]

    # Format the incoming data into a PyTorch Tensor
    packet_features = [[rtt, jitter, float(packet_size)]]
    tensor_data = torch.tensor([packet_features], dtype=torch.float32)
    
    with torch.no_grad():
        embedding = model(tensor_data)
        
    return embedding.numpy().tolist()[0]