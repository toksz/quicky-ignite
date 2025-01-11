import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";

interface VideoSettingsProps {
  duration: number;
  onDurationChange: (duration: number) => void;
  format: 'portrait' | 'landscape';
  onFormatChange: (format: 'portrait' | 'landscape') => void;
}

export const VideoSettings = ({
  duration,
  onDurationChange,
  format,
  onFormatChange,
}: VideoSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <div className="flex gap-2">
            <Button 
              variant={duration === 30 ? "default" : "outline"}
              onClick={() => onDurationChange(30)}
            >
              30 Seconds
            </Button>
            <Button
              variant={duration === 60 ? "default" : "outline"}
              onClick={() => onDurationChange(60)}
            >
              60 Seconds
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="number"
              value={duration}
              onChange={(e) => onDurationChange(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">seconds</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Video Format</label>
          <div className="flex gap-2">
            <Toggle
              pressed={format === 'portrait'}
              onPressedChange={() => onFormatChange('portrait')}
            >
              Portrait (9:16)
            </Toggle>
            <Toggle
              pressed={format === 'landscape'}
              onPressedChange={() => onFormatChange('landscape')}
            >
              Landscape (16:9)
            </Toggle>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {format === 'portrait' ? 'Perfect for Shorts & TikTok' : 'Standard YouTube format'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};