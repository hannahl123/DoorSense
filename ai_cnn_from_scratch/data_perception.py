import os
import requests
import zipfile
import shutil

# Create directories for datasets
os.makedirs("dataset/parcels", exist_ok=True)
os.makedirs("dataset/persons", exist_ok=True)

# Download and extract parcel dataset
parcel_url = "https://cdn.edgeimpulse.com/datasets/parcel-detection.zip"
response = requests.get(parcel_url)
with open("parcel-detection.zip", "wb") as f:
    f.write(response.content)
with zipfile.ZipFile("parcel-detection.zip", "r") as zip_ref:
    zip_ref.extractall("dataset/parcels")

# Download and extract INRIA Person dataset
person_url = "ftp://ftp.inrialpes.fr/pub/lear/douze/data/INRIAPerson.tar"
response = requests.get(person_url)
with open("INRIAPerson.tar", "wb") as f:
    f.write(response.content)
shutil.unpack_archive("INRIAPerson.tar", "dataset/persons")

# Clean up
os.remove("parcel-detection.zip")
os.remove("INRIAPerson.tar")

print("Datasets downloaded and extracted.")