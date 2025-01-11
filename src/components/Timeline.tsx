import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  text: string;
  duration: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Script Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="timeline-item">
            <p className="pr-16">{item.text}</p>
            <span className="timeline-duration">{item.duration}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};