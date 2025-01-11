import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

interface MediaItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  source: 'pixabay' | 'pexels';
  type: 'image' | 'video';
}

interface MediaGalleryProps {
  items: MediaItem[];
  onSelect: (item: MediaItem) => void;
  selectedItems: MediaItem[];
}

export const MediaGallery = ({ items, onSelect, selectedItems }: MediaGalleryProps) => {
  const images = items.filter(item => item.type === 'image');
  const videos = items.filter(item => item.type === 'video');

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="w-full bg-zinc-800">
            <TabsTrigger value="images" className="w-1/2">Images</TabsTrigger>
            <TabsTrigger value="videos" className="w-1/2">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="images">
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {images.map((item) => (
                  <div
                    key={item.id}
                    className="relative group cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg transition-all duration-200 group-hover:opacity-75"
                    />
                    {selectedItems.some(selected => selected.id === item.id) && (
                      <div className="absolute top-2 right-2 bg-red-600 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-1 rounded">
                      {item.source}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="videos">
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {videos.map((item) => (
                  <div
                    key={item.id}
                    className="relative group cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg transition-all duration-200 group-hover:opacity-75"
                    />
                    {selectedItems.some(selected => selected.id === item.id) && (
                      <div className="absolute top-2 right-2 bg-red-600 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-1 rounded">
                      {item.source}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};