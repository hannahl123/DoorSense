# Use the official TensorFlow GPU image as the base
# Use the official TensorFlow GPU image as the base
FROM tensorflow/tensorflow:latest-gpu

# Set the working directory in the container
WORKDIR /workspace

# Copy the local requirements file into the container
COPY requirements.txt requirements.txt

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files into the container
COPY . .

# Set the default command to run your training script
CMD ["python", "train_model.py"]
