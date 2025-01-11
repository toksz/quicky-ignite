import { Video } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border p-4">
      <div className="container mx-auto flex items-center gap-2">
        <Video className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold">Quicky</h1>
        <p className="text-sm text-muted-foreground ml-4">AI YouTube Shorts Generator</p>
      </div>
    </header>
  );
};