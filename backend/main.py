import os
import argparse
import whisper
import numpy as np
import soundfile as sf
from resemblyzer import VoiceEncoder, preprocess_wav
from resemblyzer.hparams import sampling_rate
from pathlib import Path
import torch
import pyaudio
import wave
import time
import keyboard
from sklearn.cluster import KMeans
from collections import defaultdict


def record_microphone_enter(output_file="live_audio.wav"):
    print("🎙️ Press ENTER to start recording...")
    while True:
        if keyboard.is_pressed("enter"):
            break
    time.sleep(0.3)

    print("🔴 Recording... Press ENTER again to stop.")
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paInt16,
                    channels=1,
                    rate=sampling_rate,
                    input=True,
                    frames_per_buffer=1024)
    frames = []

    while True:
        data = stream.read(1024)
        frames.append(data)
        if keyboard.is_pressed("enter"):
            break

    stream.stop_stream()
    stream.close()
    p.terminate()
    time.sleep(0.3)

    wf = wave.open(output_file, 'wb')
    wf.setnchannels(1)
    wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
    wf.setframerate(sampling_rate)
    wf.writeframes(b''.join(frames))
    wf.close()

    print(f"✅ Audio saved to {output_file}")


def diarize_and_transcribe(audio_path):
    print("🔊 Loading audio and preprocessing...")
    wav = preprocess_wav(audio_path)
    encoder = VoiceEncoder()
    print("🔍 Running speaker embeddings...")
    _, cont_embeds, wav_splits = encoder.embed_utterance(wav, return_partials=True, rate=16)

    print("🎯 Clustering speaker embeddings...")
    n_speakers = 2  # Adjust manually
    kmeans = KMeans(n_clusters=n_speakers, random_state=0).fit(cont_embeds)
    labels = kmeans.labels_

    # Step 1: Compute average mid-time per speaker
    label_times = defaultdict(list)
    for i, s in enumerate(wav_splits):
        label = labels[i]
        mid_time = (s.start + s.stop) / 2 / sampling_rate
        label_times[label].append(mid_time)

    avg_times = {
        label: sum(times) / len(times)
        for label, times in label_times.items()
    }

    # Step 2: Sort and assign speaker numbers
    ordered_labels = {
        label: idx + 1
        for idx, label in enumerate(sorted(avg_times, key=avg_times.get))
    }

    print("\n📌 Speaker Label Mapping:")
    for raw_label, ordered in ordered_labels.items():
        print(f"Cluster {raw_label} → Speaker {ordered}")

    # Step 3: Assign speaker times
    speaker_times = []
    for i, s in enumerate(wav_splits):
        label = labels[i]
        speaker = f"Speaker {ordered_labels[label]}"
        speaker_times.append({
            "speaker": speaker,
            "start": s.start / sampling_rate,
            "end": s.stop / sampling_rate
        })

    print("📝 Transcribing with Whisper...")
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    segments = result["segments"]

    final_output = []
    for seg in segments:
        seg_start = seg['start']
        seg_end = seg['end']
        max_overlap = 0
        segment_speaker = "Unknown"

        for spk in speaker_times:
            overlap = max(0, min(seg_end, spk["end"]) - max(seg_start, spk["start"]))
            if overlap > max_overlap:
                max_overlap = overlap
                segment_speaker = spk["speaker"]

        final_output.append({
            "speaker": segment_speaker,
            "start": seg_start,
            "end": seg_end,
            "text": seg['text']
        })

    print("\n🧾 Final Transcript with Speakers:")
    for out in final_output:
        print(f"[{out['speaker']}] {out['text']}")

    return final_output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Whisper + Resemblyzer Speaker Diarization")
    parser.add_argument("--audio", type=str, help="Path to recorded audio file (.wav)")
    parser.add_argument("--live", action="store_true", help="Record audio from mic using Enter keys")
    args = parser.parse_args()

    if args.live:
        filename = "live_audio.wav"
        record_microphone_enter(output_file=filename)
    elif args.audio:
        filename = args.audio
    else:
        print("❌ Please provide --audio path or use --live to record.")
        exit(1)

    diarize_and_transcribe(filename)
