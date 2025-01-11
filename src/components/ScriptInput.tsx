import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScriptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ScriptInput = ({ value, onChange }: ScriptInputProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Script</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your video script here..."
          className="min-h-[200px] resize-none"
        />
      </CardContent>
    </Card>
  );
};