import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
};

type Props = {
  events: Event[];
};

export default function EventsGrid({
  events,
}: Props) {
  if (!events.length) {
    return (
      <div className="py-10 text-center text-slate-500">
        No events available.
      </div>
    );
  }
  const router = useRouter();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card
          key={event.id}
          className="rounded-2xl"
        >
          <CardHeader>
            <div className="text-xs text-slate-500">
              {event.date}
            </div>

            <CardTitle>
              {event.title}
            </CardTitle>

            <CardDescription>
              📍 {event.location}
            </CardDescription>
          </CardHeader>

          <CardContent>
            Secure access pass with cryptographic
            validation and fast-lane admission.
          </CardContent>

          <CardFooter className="flex justify-between">
            <span className="text-xs font-bold">
              {event.price}
            </span>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => router.push(`/view/${event.id}`)}
            >
              View →
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}