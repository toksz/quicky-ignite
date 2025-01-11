import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";

interface KeywordEditorProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export const KeywordEditor = ({ keywords, onChange }: KeywordEditorProps) => {
  const [newKeyword, setNewKeyword] = useState("");

  const handleAdd = () => {
    if (!newKeyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }
    if (keywords.includes(newKeyword.trim())) {
      toast.error("Keyword already exists");
      return;
    }
    onChange([...keywords, newKeyword.trim()]);
    setNewKeyword("");
  };

  const handleDelete = (keywordToDelete: string) => {
    onChange(keywords.filter(k => k !== keywordToDelete));
  };

  return (
    <div className="space-y-4 bg-zinc-900 p-4 rounded-lg border border-zinc-800">
      <h3 className="text-lg font-medium text-zinc-100">Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center gap-2 bg-zinc-800 text-zinc-100 px-3 py-1 rounded-full"
          >
            <span>{keyword}</span>
            <button
              onClick={() => handleDelete(keyword)}
              className="text-zinc-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Add new keyword..."
          className="bg-zinc-800 border-zinc-700 text-zinc-100"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button
          onClick={handleAdd}
          className="bg-red-600 hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};