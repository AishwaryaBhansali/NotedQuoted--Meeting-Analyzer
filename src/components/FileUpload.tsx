import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsAnalyzing(true);

      const res = await fetch("http://localhost:8000/record-transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setIsAnalyzing(false);

      // Navigate to transcription page with backend results
      navigate("/transcriptions", { 
        state: { 
          transcript: data.transcript, 
          diarization: data.diarization, 
          summary: data.summary 
        } 
      });

    } catch (err) {
      console.error("File upload failed", err);
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-8">
          <CardContent className="text-center">
            <Loader2 className="h-16 w-16 text-purple-400 mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold text-white mb-4">Analyzing Your File</h2>
            <p className="text-slate-300 mb-6">Processing audio and extracting insights...</p>
            <div className="w-64 bg-slate-700 rounded-full h-2 mx-auto">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse"
                style={{ width: "70%" }}
              ></div>
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
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-4">Upload Audio File</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-300 
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-600 file:text-white
                  hover:file:bg-purple-700
                  mb-6"
              />

              {selectedFile && (
                <p className="text-slate-300 mb-4">Selected: {selectedFile.name}</p>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full"
              >
                <Upload className="mr-2 h-6 w-6" />
                Upload & Analyze
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
