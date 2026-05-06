import torch
import torch.nn as nn

class SupervisedContrastiveLoss(nn.Module):
    def __init__(self, temperature=0.1):
        super(SupervisedContrastiveLoss, self).__init__()
        self.temperature = temperature

    def forward(self, embeddings, labels):
        # Calculate Cosine Similarity between all traffic embeddings
        cosine_sim = torch.matmul(embeddings, embeddings.T) / self.temperature
        
        # Create a mask to find matching labels (e.g., Streaming vs Streaming)
        labels = labels.contiguous().view(-1, 1)
        mask = torch.eq(labels, labels.T).float().to(embeddings.device)
        
        # Apply the mathematical penalty/reward
        exp_sim = torch.exp(cosine_sim) * (1 - torch.eye(labels.shape[0]).to(embeddings.device))
        log_prob = cosine_sim - torch.log(exp_sim.sum(dim=1, keepdim=True) + 1e-8)
        
        # Compute the final loss metric
        mean_log_prob_pos = (mask * log_prob).sum(dim=1) / mask.sum(dim=1)
        loss = -mean_log_prob_pos.mean()
        
        return loss