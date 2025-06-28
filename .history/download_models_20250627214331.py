import os
import tensorflow as tf
import tensorflow_hub as hub

os.makedirs('models', exist_ok=True)

# URLs for TensorFlow Hub models
potato_model_url = 'https://tfhub.dev/google/plant_village/potato_disease_classifier/1'
tomato_model_url = 'https://tfhub.dev/google/plant_village/tomato_disease_classifier/1'

print('Downloading and saving Potato model...')
potato_model = hub.load(potato_model_url)
tf.saved_model.save(potato_model, 'models/potato_leaf_model')
print('Potato model saved to models/potato_leaf_model')

print('Downloading and saving Tomato model...')
tomato_model = hub.load(tomato_model_url)
tf.saved_model.save(tomato_model, 'models/tomato_leaf_model')
print('Tomato model saved to models/tomato_leaf_model') 