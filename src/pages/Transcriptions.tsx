import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileAudio, Search, Clock, Download, Eye, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const Transcriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const liveTranscript = location.state?.transcript;

  const transcriptions = [
    {
      id: 1,
      title: "Q4 Planning Meeting",
      date: "2024-06-10",
      duration: "45:23",
      participants: 5,
      transcript:
        "Team discussed Q4 planning, budget allocation, and new feature development priorities. Key decisions were made regarding resource allocation and timeline adjustments...",
      summary: "Strategic planning session covering market expansion and resource allocation.",
      status: "completed",
    },
    {
      id: 2,
      title: "Product Review Session",
      date: "2024-06-09",
      duration: "32:15",
      participants: 3,
      transcript:
        "Product team reviewed current features, discussed user feedback, and planned upcoming releases. Focus on improving user experience and adding requested functionality...",
      summary: "Product development review with focus on user experience improvements.",
      status: "completed",
    },
    {
      id: 3,
      title: "Weekly Standup",
      date: "2024-06-08",
      duration: "15:42",
      participants: 8,
      transcript:
        "Team shared progress updates, discussed blockers, and aligned on priorities for the week. Several action items were identified for follow-up...",
      summary: "Weekly team synchronization and progress review.",
      status: "completed",
    },
  ];

  const filteredTranscriptions = transcriptions.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedTranscription, setSelectedTranscription] = useState<
    typeof transcriptions[0] | null
  >(null);

  const handleViewTranscription = (transcription: typeof transcriptions[0]) => {
    setSelectedTranscription(transcription);
  };

  if (selectedTranscription || liveTranscript) {
    const displayTranscript = selectedTranscription?.transcript || liveTranscript;
    const displayTitle = selectedTranscription?.title || "Live Meeting Transcript";
    const displaySummary =
      selectedTranscription?.summary || "This is a live-recorded meeting. Summary coming soon...";
    const displayDuration = selectedTranscription?.duration || "";
    const displayDate =
      selectedTranscription?.date || new Date().toISOString().split("T")[0];
    const displayParticipants = selectedTranscription?.participants || "N/A";

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={() => setSelectedTranscription(null)}
            variant="ghost"
            className="mb-6 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            ← Back to Transcriptions
          </Button>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{displayTitle}</CardTitle>
                    <div className="flex items-center space-x-4 text-slate-400 text-sm">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {displayDuration}
                      </span>
                      <span>{displayDate}</span>
                      <span>{displayParticipants} participants</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {/* Summary */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-400">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{displaySummary}</p>
                </CardContent>
              </Card>

              {/* Full Transcript */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400">Full Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900/50 rounded-lg p-6 max-h-96 overflow-y-auto space-y-4">
                    {Array.isArray(displayTranscript) ? (
                      displayTranscript.map((entry: any, idx: number) => (
                        <p key={idx} className="text-slate-300">
                          <span className="font-bold text-white">{entry.speaker}:</span>{" "}
                          {entry.text}
                        </p>
                      ))
                    ) : (
                      <p className="text-slate-300 whitespace-pre-wrap">{displayTranscript}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Your Transcriptions
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Access and manage all your meeting transcriptions and analysis results
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search transcriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Transcriptions List */}
        <div className="max-w-4xl mx-auto">
          {filteredTranscriptions.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <FileAudio className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-300 text-lg mb-2">No transcriptions found</p>
                <p className="text-slate-400">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Start by recording or uploading a meeting"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTranscriptions.map((transcription) => (
                <Card
                  key={transcription.id}
                  className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2">
                          {transcription.title}
                        </CardTitle>
                        <p className="text-slate-300 text-sm mb-3">
                          {transcription.summary}
                        </p>
                        <div className="flex items-center space-x-4 text-slate-400 text-sm">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {transcription.duration}
                          </span>
                          <span>{transcription.date}</span>
                          <span>{transcription.participants} participants</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleViewTranscription(transcription)}
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-white hover:bg-slate-700"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-red-400 hover:bg-slate-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transcriptions;
