# Live Meeting Analyzer

A full-stack web application for **audio transcription, speaker diarization, and meeting analysis**.  
This project allows you to upload audio files or record live meetings and provides:  

- High-quality transcription using **Whisper**  
- Speaker diarization using **Resemblyzer**  
- Summary, key topics, and action items detection  
- Frontend built with **React + TailwindCSS**  
- Backend built with **FastAPI**  

---

## Features

### Audio Processing
- Upload audio files (MP3, WAV, M4A, OGG)  
- Live recording from microphone  
- Noise reduction  

### Analysis Features
- Automatic transcription  
- Speaker identification (diarization)  
- Sentiment analysis of the meeting  
- Key topics extraction & action items detection  

---
### Folder Structure
project-root/
│── backend/ # FastAPI backend
│ ├── app.py
│ ├── main.py
│── requirements.txt
│
│── public/ # Frontend public files
│── src/ # Frontend React source code
│
│── package.json
│── package-lock.json
│── byte.config
│── README.md
│── .gitignore


---

### Getting Started

### 1. Clone the repository

git clone https://github.com/yourusername/live-meeting-analyzer.git
cd live-meeting-analyzer
cd backend
python -m venv venv

### Activate virtual environment
### Windows
venv\Scripts\activate
### Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

### Run FastAPI server
uvicorn app:app --reload

### Frontend Setup
cd ../
npm install
npm run dev

### Usage
### 1. File Upload
Go to the File Upload page
Drag & drop or browse an audio file
Click Analyze File
View transcript, speaker diarization, summary, and action items
### 2. Live Recording
Go to the Live Recording page
Click Start Recording
Pause/Resume recording as needed
Click Stop & Analyze
View results similar to file upload



