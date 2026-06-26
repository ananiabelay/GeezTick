import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="text-center space-y-6 max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold">
        Experience Architecture
      </h1>

      <p className="text-gray-500">
        Discover verified events and unlock seamless digital access.
      </p>

      <div className="flex gap-2 border rounded-2xl p-2 bg-white">
        <Input placeholder="Search passes..." />
        <Button>Explore</Button>
      </div>
    </section>
  );
}