# FROM python:latest
# WORKDIR /app
# COPY . .
# RUN pip install -r requirements.txt
# CMD ["python", "bookstore-api.py"]


# Base image
FROM python:latest

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libmariadb-dev-compat  \
    && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --upgrade pip setuptools && pip install -r requirements.txt

# Copy application code
COPY . /app/

CMD ["python", "bookstore-api.py"]
