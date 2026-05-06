import torch
import torch.nn as nn
import torch.nn.functional as F

class NetworkFlowEncoder(nn.Module):
    def __init__(self, input_features=3, hidden_dim=64, embedding_dim=2):
        """
        input_features = 3 (RTT, Jitter, Packet Size)
        embedding_dim = 2 (X, Y coordinates for your 2D frontend dashboard)
        """
        super(NetworkFlowEncoder, self).__init__()
        
        # LSTM layer to understand the "flow" of data over time
        self.lstm = nn.LSTM(
            input_size=input_features, 
            hidden_size=hidden_dim, 
            num_layers=2, 
            batch_first=True
        )
        
        # Fully connected layer to map the LSTM output to your 2D map
        self.fc = nn.Linear(hidden_dim, embedding_dim)

    def forward(self, x):
        # Process the sequence of packets
        _, (hidden, _) = self.lstm(x)
        
        # Grab the final understanding from the LSTM
        embedding = self.fc(hidden[-1])
        
        # CRITICAL: Normalize the output. 
        # This is required for Contrastive Learning to calculate Cosine Similarity.
        return F.normalize(embedding, p=2, dim=1)