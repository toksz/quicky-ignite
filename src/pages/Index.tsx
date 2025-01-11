import { useState } from "react";
import { ScriptInput } from "@/components/ScriptInput";
import { Timeline } from "@/components/Timeline";
import { VideoSettings } from "@/components/VideoSettings";
import { GenerationProgress } from "@/components/GenerationProgress";
import { ApiKeySettings } from "@/components/ApiKeySettings";
import { MediaGallery } from "@/components/MediaGallery";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { extractKeywords } from "@/utils/scriptAnalysis";
import { searchPixabayMedia, searchPexelsMedia } from "@/services/mediaService";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface MediaItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  source: 'pixabay' | 'pexels';
  type: 'image' | 'video';
}

const Index = () => {
  const [script, setScript] = useState("");
  const [duration, setDuration] = useState(30);
  const [format, setFormat] = useState<'portrait' | 'landscape'>('portrait');
  const [selectedModel, setSelectedModel] = useState("Gemini 1.5 Flash");
  const [mediaSource, setMediaSource] = useState<'pixabay' | 'pexels' | 'both'>('both');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'both'>('both');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  
  const [pixabayKey, setPixabayKey] = useState("");
  const [pexelsKey, setPexelsKey] = useState("");
  
  const keywords = script ? extractKeywords(script) : [];
  
  const { data: mediaItems = [], isLoading } = useQuery({
    queryKey: ['media', keywords, mediaSource, mediaType, pixabayKey, pexelsKey],
    queryFn: async () => {
      if (!keywords.length) return [];
      
      const results: MediaItem[] = [];
      const query = keywords.join(' ');
      
      try {
        if (mediaSource === 'pixabay' || mediaSource === 'both') {
          if (mediaType === 'image' || mediaType === 'both') {
            const pixabayImages = await searchPixabayMedia(query, 'image', pixabayKey);
            results.push(...pixabayImages);
          }
          if (mediaType === 'video' || mediaType === 'both') {
            const pixabayVideos = await searchPixabayMedia(query, 'video', pixabayKey);
            results.push(...pixabayVideos);
          }
        }
        
        if (mediaSource === 'pexels' || mediaSource === 'both') {
          if (mediaType === 'image' || mediaType === 'both') {
            const pexelsImages = await searchPexelsMedia(query, 'image', pexelsKey);
            results.push(...pexelsImages);
          }
          if (mediaType === 'video' || mediaType === 'both') {
            const pexelsVideos = await searchPexelsMedia(query, 'video', pexelsKey);
            results.push(...pexelsVideos);
          }
        }
        
        return results;
      } catch (error) {
        console.error('Error fetching media:', error);
        toast.error('Failed to fetch media. Please check your API keys.');
        return [];
      }
    },
    enabled: Boolean(keywords.length && (pixabayKey || pexelsKey))
  });

  const handleMediaSelect = (item: MediaItem) => {
    setSelectedMedia(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const timelineItems = [
    { text: "This is the first part of the video", duration: "~2s" },
    { text: "Here comes the second part", duration: "~3s" },
    { text: "And finally, the conclusion", duration: "~2s" },
  ];
  
  const stages = [
    { 
      name: "Analyzing Script",
      description: "Extracting keywords and context",
      status: keywords.length ? 'completed' as const : 'waiting' as const
    },
    {
      name: "Fetching Media",
      description: "Finding perfect background clips and images",
      status: isLoading ? 'loading' as const : (mediaItems.length ? 'completed' as const : 'waiting' as const)
    },
    {
      name: "Finalizing",
      description: "Preparing downloadable media",
      status: 'waiting' as const
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
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
            <ApiKeySettings
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <h3 className="text-lg font-medium mb-4">Media Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Media Source</label>
                  <ToggleGroup 
                    type="single" 
                    value={mediaSource}
                    onValueChange={(value) => value && setMediaSource(value as typeof mediaSource)}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="pixabay">Pixabay</ToggleGroupItem>
                    <ToggleGroupItem value="pexels">Pexels</ToggleGroupItem>
                    <ToggleGroupItem value="both">Both</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Media Type</label>
                  <ToggleGroup 
                    type="single"
                    value={mediaType}
                    onValueChange={(value) => value && setMediaType(value as typeof mediaType)}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="image">Images</ToggleGroupItem>
                    <ToggleGroupItem value="video">Videos</ToggleGroupItem>
                    <ToggleGroupItem value="both">Both</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
            
            {keywords.length > 0 && (
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                <h3 className="text-lg font-medium mb-2">Extracted Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {mediaItems.length > 0 && (
              <MediaGallery
                items={mediaItems}
                onSelect={handleMediaSelect}
                selectedItems={selectedMedia}
              />
            )}
            
            <Timeline items={timelineItems} />
            <GenerationProgress stages={stages} />
            
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white" 
              size="lg"
              disabled={!selectedMedia.length}
            >
              Generate Video
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;