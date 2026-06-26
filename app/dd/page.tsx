'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

import Header from "../../components/ui/header";
// import  Hero  from "../components/hero";
import EventsGrid, { Event } from "../../components/ui/event";
import { getEvents } from "../../components/ui/datafeed";
import LoadingScreen from "@/components/ui/load";
import AccessDenied from "../../components/ui/denied";

import { useSupabaseUser } from "../../components/ui/su";

export default function ClientHome() {
  const { user, loading } = useSupabaseUser();

  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setEventsLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading || eventsLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AccessDenied />;
  }

  // 🔎 FILTER EVENTS BY TITLE
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 relative">
      
      {/* 🌌 Premium Ambient Layer Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20 mix-blend-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 via-indigo-950 to-transparent z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] pointer-events-none opacity-5 bg-blue-500 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-20 left-[-5%] w-[300px] h-[300px] pointer-events-none opacity-5 bg-indigo-500 rounded-full blur-[100px] z-0" />

      {/* Main Structural Wrapper */}
      <div className="relative z-10 w-full flex flex-col flex-1">
        
        {/* Header container with clean border anchor */}
        <div className="border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
          <Header email={user.email} />
        </div>

        <main className="mx-auto w-full max-w-6xl px-6 pt-12 pb-20 space-y-16 flex-1">
          
          {/* Hero Section Container */}
          <div className="relative bg-slate-900/10 border border-slate-900/80 rounded-3xl p-2 sm:p-4 backdrop-blur-sm overflow-hidden group hover:border-slate-800/60 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            {/* <Hero search={search} setSearch={setSearch} /> */}
          </div>

          {/* Events Segment Layout Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-100 uppercase sm:text-2xl">
                    Discover <span className="text-blue-500">Experiences</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono tracking-wide uppercase mt-1.5 opacity-80">
                    Live verified ticketing pools waiting for allocation.
                  </p>
                </div>

                {/* ✨ NEW: FUTURISTIC ADD EVENT BUTTON FEATURE ✨ */}
                <Link 
                  href="/events/" 
                  className="group/btn relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-widest uppercase px-5 h-11 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.2)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)] active:scale-[0.98] self-start sm:self-center overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                  <span className="text-sm font-sans font-light group-hover/btn:scale-110 transition-transform duration-300">+</span> 
                  Add Event
                </Link>
              </div>
              
              {search && (
                <div className="text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 w-fit self-start sm:self-center">
                  Filtering for: <span className="text-blue-400 font-bold">"{search}"</span>
                </div>
              )}
            </div>

            {/* Rendered Core Items Map */}
            <div className="relative min-h-[300px]">
              {filteredEvents.length > 0 ? (
                /* FIXED: Standardized text token parameters (`!text-slate-100` and `!text-slate-400`) to force total 
                   color consistency inside child components across all viewports.
                */
                <div className="[&_h1]:line-clamp-2 [&_h1]:!text-slate-100 [&_h2]:line-clamp-2 [&_h2]:!text-slate-100 [&_h3]:line-clamp-2 [&_h3]:!text-slate-100 [&_p]:line-clamp-3 [&_p]:!text-slate-400 [&_.card]:h-full [&_.card]:flex [&_.card]:flex-col [&_.card]:justify-between">
                  <EventsGrid events={filteredEvents} />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-900 rounded-3xl bg-slate-900/5 backdrop-blur-sm">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest border border-slate-900 rounded-full px-3 py-1 bg-slate-950">No matching keys found</span>
                  <p className="text-xs text-slate-400 font-light mt-4 max-w-xs leading-relaxed">Adjust your parameter search to locate active event instances inside the system.</p>
                </div>
              )}
            </div>
          </div>

        </main>
      </div>

      {/* ✨ PREMIUM FUTURISTIC FOOTER ✨ */}
      <footer className="relative z-10 w-full mt-24 border-t border-slate-900 bg-slate-950/60 backdrop-blur-lg py-8 px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">

          <p className="text-xs font-mono text-slate-500 tracking-wide">
            &copy; {new Date().getFullYear()} GeezTic Inc. All permissions mapped.
          </p>

          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-900 px-4 py-2 rounded-xl group hover:border-slate-800 transition-colors">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />

            <span className="text-xs font-mono text-slate-400">
              Architected & Developed by{" "}
              <span className="font-bold text-slate-200 tracking-tight relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 group-hover:after:w-full after:transition-all after:duration-300">
                Anania Belay
              </span>
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}
