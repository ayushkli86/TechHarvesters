import os
import csv

def create_csv(dataset_dir, output_csv):
    rows = []
    for root, dirs, files in os.walk(dataset_dir):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                label = os.path.basename(root)
                img_path = os.path.join(root, file)
                rows.append([img_path, label])
    with open(output_csv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['image_path', 'label'])
        writer.writerows(rows)
    print(f"CSV created: {output_csv} (Total images: {len(rows)})")

tomato_path = r'C:\Users\acer\.cache\kagglehub\datasets\kaustubhb999\tomatoleaf\versions\1'
potato_path = r'C:\Users\acer\.cache\kagglehub\datasets\abdallahalidev\plantvillage-dataset\versions\1'

create_csv(tomato_path, 'tomato_leaf_dataset.csv')
create_csv(potato_path, 'potato_leaf_dataset.csv') 