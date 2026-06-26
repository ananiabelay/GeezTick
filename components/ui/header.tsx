import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

type Props = {
  email?: string;
};

export default function Header({ email }: Props) {
  return (
    <header className="sticky top-0 z-50 mx-3 mt-3 rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-lg font-black tracking-wider">
          Geez
          <span className="font-semibold text-slate-500">
            Tic
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-slate-500 sm:block">
            {email}
          </span>

          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {email?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}