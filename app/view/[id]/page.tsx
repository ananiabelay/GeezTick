"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getEventById } from "../view";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();

  const supabase = createClient();

  const [event, setEvent] = useState<any>(null);
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getEventById(id as string);
      setEvent(data);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: existing } = await supabase
        .from("tickets")
        .select("*")
        .eq("event_id", id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        setTicket(existing);
        setOpen(true);
      }
    }

    load();
  }, [id]);

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="text-xs font-mono tracking-widest uppercase animate-pulse border border-slate-900 rounded-full px-4 py-2 bg-slate-900/40 backdrop-blur-sm">
          Loading system event parameters...
        </div>
      </div>
    );

  const handleTicket = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: existing } = await supabase
      .from("tickets")
      .select("*")
      .eq("event_id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      setTicket(existing);
      setOpen(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          event_id: id,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setTicket(data);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 flex items-center justify-center overflow-x-hidden relative selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* 🌌 Premium Design Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[450px] pointer-events-none opacity-10 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-indigo-950 to-transparent z-0" />

      {/* MAIN CARD */}
      <div className="w-full max-w-2xl bg-slate-900/20 border border-slate-900/80 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden relative z-10 transition-all duration-500 hover:border-slate-800/60 group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        {/* HEADER BAR */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md">
          <button
            onClick={() => router.back()}
            className="text-xs font-mono font-bold text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-1.5"
          >
            <span className="text-sm font-sans">&larr;</span> BACK
          </button>

          <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 font-bold">
            Event Registry View
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight uppercase">
              {event.title}
            </h1>
            <div className="h-[2px] w-12 bg-blue-500 rounded-full" />
          </div>

          <p className="text-sm text-slate-400 font-light leading-relaxed whitespace-pre-line">
            {event.description}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 text-xs font-mono">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-900/80 text-center flex flex-col justify-center items-center gap-1 text-slate-300">
              <span className="text-slate-500 uppercase text-[9px] tracking-widest">Schedule</span>
              <span className="truncate w-full font-medium">📅 {event.date}</span>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-900/80 text-center flex flex-col justify-center items-center gap-1 text-slate-300">
              <span className="text-slate-500 uppercase text-[9px] tracking-widest">Location Matrix</span>
              <span className="truncate w-full font-medium">📍 {event.location}</span>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-900/80 text-center flex flex-col justify-center items-center gap-1 text-slate-300">
              <span className="text-slate-500 uppercase text-[9px] tracking-widest">Allocation Fee</span>
              <span className="truncate w-full font-bold text-blue-400">
                {event.price ? `${event.price} ETB` : "COMPLIMENTARY"}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <Button
            onClick={handleTicket}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-900 disabled:text-slate-600 font-mono text-xs tracking-widest uppercase font-bold text-white h-12 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.15)] active:scale-[0.98]"
          >
            {loading ? "Processing Encryption Payload..." : "Generate Access Ticket"}
          </Button>
        </div>
      </div>

      {/* TICKET DRAWER MODAL */}
      {open && ticket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center relative shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h2 className="text-lg font-black tracking-wider text-emerald-400 uppercase">
                Access Token Granted 🎫
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Present secure QR hash at gate verification node
              </p>
            </div>

            {/* Premium QR Display Framework Container */}
            <div className="flex justify-center mt-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-inner w-fit mx-auto">
              <QRCodeCanvas 
                value={ticket.id} 
                size={180} 
                bgColor="#ffffff"
                fgColor="#020617"
                level="H"
              />
            </div>

            {/* Meta Data Verification Stack */}
            <div className="mt-6 text-xs font-mono bg-slate-950/80 border border-slate-950 rounded-xl p-4 text-slate-300 space-y-2 text-left divider-y divide-slate-900">
              <div className="flex justify-between gap-4"><span className="text-slate-500">EVENT:</span> <span className="font-bold text-white truncate max-w-[200px]">{event.title}</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">TIMING:</span> <span className="text-slate-400">{event.date}</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">LOC:</span> <span className="text-slate-400 truncate max-w-[200px]">{event.location}</span></div>
            </div>

            <Button
              className="w-full mt-6 bg-slate-950 border border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-400 font-mono text-xs tracking-wider uppercase h-11 rounded-xl transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              Minimize Ticket Console
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}