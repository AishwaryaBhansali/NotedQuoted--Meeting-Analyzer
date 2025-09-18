from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from main import diarize_and_transcribe  # Your existing function
import shutil
import os
import whisper
from transformers import pipeline as hf_pipeline
from pyannote.audio import Pipeline

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your frontend domain
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/record-transcribe")
async def record_and_transcribe(file: UploadFile = File(...)):
    # Save uploaded file as temp.wav
    with open("temp.wav", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Call your main.py function
    result = diarize_and_transcribe("temp.wav")

    return {"transcript": result}