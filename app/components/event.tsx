import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Event = {
  id: string;
  title: string;
  description : string;
  date: string;
  location: string;
  price: string;
};

type EventsGridProps = {
  events: Event[];
};

export default function EventsGrid({ events }: EventsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id} className="group border rounded-2xl">
          <CardHeader>
            <div className="text-xs text-gray-500">{event.date}</div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>📍 {event.location}</CardDescription>
          </CardHeader>

          <CardContent>
            Secure access pass with cryptographic validation.
          </CardContent>

          <CardFooter className="flex justify-between">
            <span className="text-xs font-bold">{event.price}</span>
            <Button size="sm" variant="ghost">View →</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}