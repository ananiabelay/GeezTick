'use client';

import { Button } from "@/components/ui/button";

export default function AccessDenied() {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-white p-6 text-center shadow-lg">
        <h2 className="text-xl font-bold text-red-600">
          Access Denied
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Authentication required to view your secure passes.
        </p>

        <Button
          className="mt-6 w-full"
          onClick={() => (window.location.href = "/signup")}
        >
          Go to Signup
        </Button>
      </div>
    </div>
  );
}