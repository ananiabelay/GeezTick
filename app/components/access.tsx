import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function AccessDenied() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F8FAFC] px-4 text-center">
      <Card className="w-full max-w-sm bg-white border border-[#E2E8F0] shadow-xl p-6 rounded-2xl">
        <CardTitle className="text-xl font-bold text-red-600">
          Access Denied
        </CardTitle>
        <CardDescription className="text-[#64748B] mt-2 text-sm">
          Authentication required to view your secure passes.
        </CardDescription>
        <Button
          className="mt-6 w-full bg-[#0F172A] text-white hover:bg-[#1E293B]"
          onClick={() => window.location.href = '/signup'}
        >
          Go to Signup
        </Button>
      </Card>
    </div>
  );
}