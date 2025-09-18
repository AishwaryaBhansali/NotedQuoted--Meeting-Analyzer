import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Play, Pause, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LiveRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const audioChunks = useRef<Blob[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    audioChunks.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      uploadAudio(audioBlob);
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const pauseRecording = () => {
    if (!mediaRecorder) return;
    isPaused ? mediaRecorder.resume() : mediaRecorder.pause();
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    if (!mediaRecorder) return;
    mediaRecorder.stop();
    setIsRecording(false);
    setIsPaused(false);
    setIsAnalyzing(true);
  };

  const uploadAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    try {
      const res = await fetch("http://localhost:8000/record-transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setIsAnalyzing(false);

      // 👇 Navigate with data
      navigate("/transcriptions", { state: { transcript: data.transcript } });

    } catch (err) {
      console.error("Upload failed", err);
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-8">
          <CardContent className="text-center">
            <Loader2 className="h-16 w-16 text-purple-400 mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold text-white mb-4">Analyzing Your Meeting</h2>
            <p className="text-slate-300 mb-6">Processing audio and extracting insights...</p>
            <div className="w-64 bg-slate-700 rounded-full h-2 mx-auto">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-8 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-4">Live Recording</CardTitle>
              <div className="text-4xl font-mono text-purple-400 mb-6">
                {formatTime(recordingTime)}
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-8">
                <div className="flex justify-center items-end space-x-1 h-20 mb-4">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-purple-500 to-blue-500 w-3 rounded-t transition-all duration-100"
                      style={{
                        height: isRecording && !isPaused ? `${Math.random() * 60 + 10}px` : '10px',
                        opacity: isRecording && !isPaused ? 1 : 0.3
                      }}
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-sm">
                  {isRecording
                    ? isPaused
                      ? "Recording paused"
                      : "Recording in progress..."
                    : "Ready to record"}
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-full"
                  >
                    <Mic className="mr-2 h-6 w-6" />
                    Start Recording
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={pauseRecording}
                      size="lg"
                      variant="outline"
                      className="border-slate-600 text-white hover:bg-slate-700 px-6 py-4 rounded-full"
                    >
                      {isPaused ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
                    </Button>
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-full"
                    >
                      <Square className="mr-2 h-6 w-6" />
                      Stop & Analyze
                    </Button>
                  </>
                )}
              </div>

              {isRecording && (
                <div className="mt-8 p-4 bg-slate-700/50 rounded-lg">
                  <p className="text-slate-300 text-sm mb-2">Recording Status</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`}></div>
                    <span className="text-white font-medium">
                      {isPaused ? 'Paused' : 'Live'}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveRecording;
