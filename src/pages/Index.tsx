
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Upload, FileAudio, Play, Pause, BarChart3, Brain, Clock, Users, LogIn, UserPlus } from "lucide-react";
import LiveRecording from "@/components/LiveRecording";
import FileUpload from "@/components/FileUpload";
import AnalysisResults from "@/components/AnalysisResults";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<'live' | 'upload' | null>(null);
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data: any) => {
    setAnalysisData(data);
  };

  const resetToHome = () => {
    setSelectedMode(null);
    setAnalysisData(null);
  };

  if (analysisData) {
    return <AnalysisResults data={analysisData} onReset={resetToHome} />;
  }

  if (selectedMode === 'live') {
    return <LiveRecording onAnalysisComplete={handleAnalysisComplete} onBack={() => setSelectedMode(null)} />;
  }

  if (selectedMode === 'upload') {
    return <FileUpload onAnalysisComplete={handleAnalysisComplete} onBack={() => setSelectedMode(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navbar />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Meeting Analyzer
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transform your meetings into actionable insights with AI-powered analysis. 
            Get summaries, action items, and sentiment analysis in seconds.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <CardTitle className="text-white">Smart Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-center">
                Advanced AI algorithms extract key insights, topics, and sentiment from your meetings
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-white">Save Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-center">
                Get instant summaries and action items instead of manually reviewing hours of recordings
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <CardTitle className="text-white">Team Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-center">
                Understand team dynamics, participation levels, and communication patterns
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="bg-gradient-to-br from-purple-800/30 to-purple-600/30 border-purple-500/50 backdrop-blur-sm cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
            onClick={() => setSelectedMode('live')}
          >
            <CardHeader className="text-center pb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-full w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mic className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-2xl text-white mb-4">Live Recording</CardTitle>
              <CardDescription className="text-purple-200 text-lg">
                Start recording your meeting in real-time and get instant analysis when you're done
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg group-hover:scale-105 transition-all duration-300"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start recording...
              </Button>
              <div className="mt-6 flex justify-center space-x-4 text-sm text-slate-400">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Real-time processing
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Instant results
                </span>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-blue-800/30 to-cyan-600/30 border-blue-500/50 backdrop-blur-sm cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
            onClick={() => setSelectedMode('upload')}
          >
            <CardHeader className="text-center pb-8">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-full w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-2xl text-white mb-4">Upload Audio File</CardTitle>
              <CardDescription className="text-blue-200 text-lg">
                Upload an existing audio recording and let our AI analyze it for you
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg group-hover:scale-105 transition-all duration-300"
              >
                <FileAudio className="mr-2 h-5 w-5" />
                Upload an audio file...
              </Button>
              <div className="mt-6 flex justify-center space-x-4 text-sm text-slate-400">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Multiple formats
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Secure processing
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-400">
          <p className="text-lg">
            Supported formats: MP3, WAV, M4A, OGG • Maximum file size: 100MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
