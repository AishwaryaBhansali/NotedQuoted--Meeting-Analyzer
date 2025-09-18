
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Clock, 
  Users, 
  Brain, 
  CheckCircle, 
  TrendingUp,
  FileText,
  Target,
  MessageSquare
} from "lucide-react";

interface AnalysisResultsProps {
  data: {
    duration: string;
    summary: string;
    keyPoints: string[];
    actionItems: { task: string; assignee: string; deadline: string }[];
    sentiment: string;
    participants: number;
    fileName?: string;
    fileSize?: string;
    transcriptAvailable?: boolean;
  };
  onReset: () => void;
}

const AnalysisResults = ({ data, onReset }: AnalysisResultsProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
      case 'optimistic':
        return 'bg-green-500';
      case 'negative':
        return 'bg-red-500';
      case 'neutral':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onReset}
            variant="ghost" 
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Analysis
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Duration</p>
                  <p className="text-2xl font-bold text-white">{data.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Participants</p>
                  <p className="text-2xl font-bold text-white">{data.participants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className={`${getSentimentColor(data.sentiment)} p-3 rounded-full`}>
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Sentiment</p>
                  <p className="text-2xl font-bold text-white">{data.sentiment}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Action Items</p>
                  <p className="text-2xl font-bold text-white">{data.actionItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Summary */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-400" />
                Meeting Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 leading-relaxed">{data.summary}</p>
              
              {data.transcriptAvailable && (
                <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-slate-300">Full transcript available</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-white hover:bg-slate-600"
                    >
                      View Transcript
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Key Points */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-blue-400" />
                Key Discussion Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-300">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                Action Items & Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.actionItems.map((item, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-2">{item.task}</h4>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {item.assignee}
                          </Badge>
                          <span className="text-slate-400 text-sm flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            Due: {item.deadline}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-white hover:bg-slate-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Info (if from upload) */}
        {data.fileName && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-white text-lg">File Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Filename</p>
                  <p className="text-white font-medium">{data.fileName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">File Size</p>
                  <p className="text-white font-medium">{data.fileSize}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Processing Time</p>
                  <p className="text-white font-medium">2.3 seconds</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;
