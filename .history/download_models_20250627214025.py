import os
import gdown

os.makedirs('models', exist_ok=True)

# Example Google Drive links (replace with actual links if needed)
potato_model_url = 'https://drive.google.com/uc?id=1Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Qw8Q'  # Replace with real model file ID
potato_model_path = 'models/potato_leaf_model.h5'
tomato_model_url = 'https://drive.google.com/uc?id=1XxXxXxXxXxXxXxXxXxXxXxXxXxXxXxX'  # Replace with real model file ID
tomato_model_path = 'models/tomato_leaf_model.h5'

def download_model(url, out):
    print(f'Downloading {out}...')
    gdown.download(url, out, quiet=False)
    print(f'Saved to {out}')

# Download models
download_model(potato_model_url, potato_model_path)
download_model(tomato_model_url, tomato_model_path) 