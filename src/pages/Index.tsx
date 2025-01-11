import { useState } from "react";
import { Header } from "@/components/Header";
import { ScriptInput } from "@/components/ScriptInput";
import { Timeline } from "@/components/Timeline";
import { VideoSettings } from "@/components/VideoSettings";
import { GenerationProgress } from "@/components/GenerationProgress";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [script, setScript] = useState("");
  const [duration, setDuration] = useState(30);
  const [format, setFormat] = useState<'portrait' | 'landscape'>('portrait');
  
  // Example timeline items
  const timelineItems = [
    { text: "This is the first part of the video", duration: "~2s" },
    { text: "Here comes the second part", duration: "~3s" },
    { text: "And finally, the conclusion", duration: "~2s" },
  ];
  
  // Example generation stages
  const stages = [
    { 
      name: "Fetching Media",
      description: "Finding perfect background clips and images",
      status: 'completed' as const
    },
    {
      name: "Processing Media",
      description: "Trimming to perfect length",
      status: 'loading' as const
    },
    {
      name: "Finalizing",
      description: "Preparing downloadable media",
      status: 'waiting' as const
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ScriptInput value={script} onChange={setScript} />
            <VideoSettings
              duration={duration}
              onDurationChange={setDuration}
              format={format}
              onFormatChange={setFormat}
            />
          </div>
          
          <div className="space-y-6">
            <Timeline items={timelineItems} />
            <GenerationProgress stages={stages} />
            
            <Button className="w-full" size="lg">
              Generate Video
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;