import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type HeroProps = {
  search: string;
  setSearch: (value: string) => void;
};
const Hero: React.FC<HeroProps> = ({ search, setSearch }) => {
  return (
    <section className="mx-auto max-w-2xl space-y-6 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
        Experience Architecture
      </h1>

      <p className="text-slate-500">
        Discover verified events and unlock seamless
        digital access.
      </p>

      <div className="flex gap-2 rounded-2xl border bg-white p-2 shadow-sm">
        <Input
          placeholder="Search passes..."
           value={search}
        onChange={(e) => setSearch(e.target.value)}
          className="border-0 shadow-none"
        />

        <Button>
          Explore
        </Button>
      </div>
    </section>
  );
}

export default Hero;
