import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  email?: string;
};

export default function Header({ email }: Props) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-black tracking-wider">
        Geez<span className="text-gray-500 font-semibold">Tic</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-xs text-gray-500">{email}</span>
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            {email?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}