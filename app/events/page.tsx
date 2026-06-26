"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export default function AddEventPage() {
  const router = useRouter();
  const supabase = createClient();

  // Form Fields State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(""); 
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // Success Modal States
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dateTime || !location) {
      alert("Please fill in all mandatory registry keys.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Authorization failed. Valid operator token not found in secure cookies.");
        setLoading(false);
        return;
      }

      const numericPrice = price ? parseFloat(price) : null;

      const formattedDateString = new Date(dateTime).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            title,
            description,
            date: formattedDateString,
            location,
            price: numericPrice,
          },
        ])
        .select("id")
        .single();

      if (error) throw error;

      // Capture explicit payload ID to trigger the animated success card overlay
      if (data?.id) {
        setCreatedEventId(data.id);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      console.error("Failed to commit event to registry:", error);
      alert(error.message || "Pipeline write failure.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = async (text: string, type: "id" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "id") {
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error("Failed to write to clipboard data channel", err);
    }
  };

  const handleModalClose = () => {
    setCreatedEventId(null);
    router.push("/");
    router.refresh();
  };

  const inviteUrl = `http:///view/${createdEventId}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 flex items-center justify-center overflow-x-hidden relative selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* 🌌 Premium Design Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-indigo-950 to-transparent z-0" />

      {/* FORM CARD CONTAINER */}
      <div className="w-full max-w-2xl bg-slate-900/20 border border-slate-900/80 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden relative z-10 transition-all duration-500 hover:border-slate-800/60 group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        {/* HEADER NAVIGATION BAR */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs font-mono font-bold text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-1.5"
          >
            <span className="text-sm font-sans">&larr;</span> CANCEL
          </button>

          <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold">
            Create Event Node
          </span>
        </div>

        {/* INTERACTIVE FORM BODY */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              Deploy <span className="text-blue-500">Experience</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wide opacity-80">
              Initialize a raw ticket assignment block onto the matrix grid.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            
            {/* TITLE INPUT */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Event Title *</label>
              <input
                type="text"
                placeholder="e.g., Midnight Cryptographic Rave"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 bg-slate-950/50 border border-slate-900 rounded-xl px-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-sans"
                required
              />
            </div>

            {/* DESCRIPTION INPUT */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Description</label>
              <textarea
                placeholder="Provide a comprehensive manifest outline for this entry point instance..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-slate-950/50 border border-slate-900 rounded-xl p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-sans resize-none leading-relaxed"
              />
            </div>

            {/* METADATA FORM PARAMETERS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* DATE & TIME BLOCK WITH SPECIFICITY */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Timeline & Time *</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full h-11 bg-slate-950/50 border border-slate-900 rounded-xl px-4 text-sm font-mono text-slate-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all scheme-dark cursor-pointer"
                  required
                />
              </div>

              {/* LOCATION BLOCK */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Location Matrix *</label>
                <input
                  type="text"
                  placeholder="e.g., Millennium Hall"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 bg-slate-950/50 border border-slate-900 rounded-xl px-4 text-sm font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                  required
                />
              </div>

              {/* FEE BLOCK (PRICE) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">Allocation Fee (ETB)</label>
                <input
                  type="number"
                  placeholder="Leave empty for Free"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full h-11 bg-slate-950/50 border border-slate-900 rounded-xl px-4 text-sm font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
                />
              </div>

            </div>
          </div>

          {/* COMMIT EXECUTION BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-600 font-mono text-xs tracking-widest uppercase font-bold text-white h-12 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.15)] active:scale-[0.98]"
          >
            {loading ? "Broadcasting Payload to Supabase..." : "Publish Event Into System"}
          </Button>

        </form>
      </div>

      {/* ✨ PREMIUM SUCCESS POPUP MODAL WITH HIGH-END ANIMATION ✨ */}
      {createdEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center relative shadow-2xl animate-in zoom-in-95 cubic-bezier(0.34, 1.56, 0.64, 1) duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            {/* Glowing Ambient Spot inside Modal */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Success Micro-Badge Accent */}
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 text-xl animate-bounce">
              ✓
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-black tracking-wider text-emerald-400 uppercase">
                Registry Commit Success 🚀
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Event allocation parameters initialized cleanly.
              </p>
            </div>

            {/* INTERACTIVE DATA SLOTS BLOCK */}
            <div className="mt-8 space-y-4 text-left">
              
              {/* TARGET BLOCK 1: EVENT HASH ID */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Use This EVENT ID to register to scanning app</span>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-900 p-1.5 pl-4 rounded-xl">
                  <code className="text-xs font-mono text-slate-300 select-all truncate flex-1 tracking-tight">
                    {createdEventId}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyText(createdEventId, "id")}
                    className="h-8 px-4 font-mono text-[10px] font-bold tracking-wider uppercase rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 min-w-[75px] text-center"
                  >
                    {copiedId ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* TARGET BLOCK 2: DYNAMIC INVITATION INVITE URL */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Dynamic Allocation Invite Link</span>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-900 p-1.5 pl-4 rounded-xl">
                  <code className="text-xs font-mono text-blue-400/90 select-all truncate flex-1 tracking-tight">
                    {inviteUrl}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyText(inviteUrl, "link")}
                    className="h-8 px-4 font-mono text-[10px] font-bold tracking-wider uppercase rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 min-w-[75px] text-center"
                  >
                    {copiedLink ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

            </div>

            {/* EXIT WORKFLOW BUTTON */}
            <Button
              className="w-full mt-8 bg-slate-950 border border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-400 font-mono text-xs tracking-wider uppercase h-12 rounded-xl transition-all duration-300 active:scale-[0.99]"
              onClick={handleModalClose}
            >
              Return to Workspace Grid
            </Button>

          </div>
        </div>
      )}

    </div>
  );
}