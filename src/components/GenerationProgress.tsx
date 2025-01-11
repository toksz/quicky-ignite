import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";

interface Stage {
  name: string;
  description: string;
  status: 'waiting' | 'loading' | 'completed';
}

interface GenerationProgressProps {
  stages: Stage[];
}

export const GenerationProgress = ({ stages }: GenerationProgressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generation Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center gap-3">
            {stage.status === 'waiting' && (
              <div className="w-5 h-5 rounded-full border-2 border-muted" />
            )}
            {stage.status === 'loading' && (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            )}
            {stage.status === 'completed' && (
              <Check className="w-5 h-5 text-primary" />
            )}
            <div>
              <p className="font-medium">{stage.name}</p>
              <p className="text-sm text-muted-foreground">{stage.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};