import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface ApiKeySettingsProps {
  onModelChange: (model: string) => void;
  selectedModel: string;
}

export const ApiKeySettings = ({ onModelChange, selectedModel }: ApiKeySettingsProps) => {
  const models = [
    "Gemini 1.5 Flash",
    "Gemini 2.0 Flash",
    "Gemini 1.5 Flash-002",
    "Gemini 1.5 Flash-8b",
    "Gemini 1.5 Pro",
    "Gemini 1.5 Pro-002",
    "Gemini exp-1206"
  ];

  const handleSaveKeys = () => {
    toast.success("API keys saved successfully!");
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-100">API Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">Model Selection</label>
            <Select value={selectedModel} onValueChange={onModelChange}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {models.map((model) => (
                  <SelectItem 
                    key={model} 
                    value={model}
                    className="text-zinc-100 hover:bg-zinc-700 focus:bg-zinc-700"
                  >
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">Google API Key</label>
            <Input 
              type="password" 
              placeholder="Enter Google API key"
              className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">Pixabay API Key</label>
            <Input 
              type="password" 
              placeholder="Enter Pixabay API key"
              className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200">Pexels API Key</label>
            <Input 
              type="password" 
              placeholder="Enter Pexels API key"
              className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <Button 
            onClick={handleSaveKeys}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Save API Keys
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};