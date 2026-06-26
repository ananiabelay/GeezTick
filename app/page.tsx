"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const coreFeatures = [
    {
      title: "Encrypted Allocation",
      desc: "Tamper-proof ticketing pools protected via high-fidelity cryptographic ledger keys.",
      tag: "SECURE"
    },
    {
      title: "Realtime Feeds",
      desc: "Live verified event data-stream synchronization powered by instantaneous backend pipelines.",
      tag: "SYNCED"
    },
    {
      title: "Zero Friction",
      desc: "Instant operator deployment models configured straight from your client workstation cookie session.",
      tag: "LATENCY_0"
    }
  ];

  // Simulates a secure binary stream download pipeline
  const handleApkDownload = (e: React.MouseEvent) => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(5);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
            // Spawns direct file asset stream download trigger
            window.location.href = "https://file.kiwi/5b387b51#iwO07qbA5phVzfRQ7ElydA";
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 relative">
      
      {/* 🌌 Premium Kinetic Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-25 mix-blend-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 via-indigo-950 to-transparent z-0 animate-pulse duration-[8000ms]" />
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] pointer-events-none opacity-[0.03] bg-blue-500 rounded-full blur-[140px] z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] pointer-events-none opacity-[0.03] bg-indigo-500 rounded-full blur-[140px] z-0" />

      {/* HEADER ACTION ANCHOR */}
      <header className="relative z-50 border-b border-slate-900/60 bg-slate-950/40 backdrop-blur-md sticky top-0 w-full px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center font-black font-mono text-xs text-white">
              G
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-white">
              Geez<span className="text-blue-500">Tic</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono font-bold text-slate-200 px-4 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
            >
              Initialize Node
            </Link>
          </div>
        </div>
      </header>

      {/* CORE HERO WRAPPER */}
      <main className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-16 pb-24 flex-1 flex flex-col items-center justify-center space-y-20">
        
        {/* HERO TYPOGRAPHY WITH GLOW */}
        <div className="text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-900 px-3 py-1.5 rounded-full mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
              SYSTEM ARCHITECTURE RELEASE v2.0
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-[0.95]">
            The Decentralized <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600">
              Experience Matrix
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
            Deploy ticketing infrastructure, allocate secure live pools, and interface with distributed event instances flawlessly.
          </p>

          {/* SPLIT PRIMARY ACTIONS */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group/btn relative w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-widest uppercase px-8 h-12 rounded-xl transition-all duration-300 shadow-[0_4px_25px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.45)] active:scale-[0.98] overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              Get Started Free &rarr;
            </Link>

            <a
              href="#GeezTic.apk"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-slate-300 font-mono text-xs font-bold tracking-widest uppercase px-8 h-12 rounded-xl transition-all duration-300"
            >
              Get Android APK
            </a>
          </div>
        </div>

        {/* FEATURE SHUTTLE DISPLAY METRIC */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl pt-4">
          {coreFeatures.map((feat, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="relative p-6 bg-slate-900/10 border border-slate-900/80 rounded-2xl backdrop-blur-sm transition-all duration-500 overflow-hidden group hover:border-slate-800/80 hover:bg-slate-900/30"
            >
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent transition-opacity duration-500 ${
                  hoveredFeature === index ? "opacity-100" : "opacity-0"
                }`} 
              />
              <div className="relative z-10 space-y-3">
                <span className="text-[9px] font-mono font-bold tracking-widest text-blue-500 block uppercase">
                  // {feat.tag}
                </span>
                <h3 className="text-sm font-black text-white uppercase tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✨ EXCLUSIVE APK DISTRIBUTION PACKAGING NODE ✨ */}
        <div id="apk-distribution" className="w-full max-w-2xl bg-gradient-to-b from-slate-900/40 to-slate-950/10 border border-slate-900/80 rounded-3xl p-6 sm:p-10 backdrop-blur-sm overflow-hidden relative group hover:border-slate-800/60 transition-all duration-500 space-y-6">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              Native Android <span className="text-blue-500">Standalone Client</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono tracking-wide uppercase opacity-80">
              Bypass centralized application storefronts. Download the raw build container payload directly.
            </p>
          </div>

          {/* MAIN TERMINAL TERMINUS DOWNLOADING CONTAINER */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 relative">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 pb-2 border-b border-slate-900/60">
              <div>FILE: <span className="text-slate-300 font-bold">geeztic-core-v2.0.apk</span></div>
              <div>SIZE: <span className="text-blue-400 font-bold">120 MB</span></div>
            </div>

            {/* DYNAMIC PROGRESS CHANNEL LAYER */}
            {isDownloading && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span className="animate-pulse">STREAMING APK BINARY LAYER...</span>
                  <span className="text-blue-500 font-bold">{downloadProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative border border-slate-900">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-200 ease-out shadow-[0_0_8px_#3b82f6]"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* APK TRIGGER MECHANISM */}
            <button
              onClick={handleApkDownload}
              disabled={isDownloading}
              className="w-full bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 disabled:bg-slate-950 disabled:border-slate-900 h-14 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group/apk active:scale-[0.99]"
            >
              <div className="text-lg text-slate-400 group-hover/apk:text-emerald-400 group-disabled:text-slate-700 transition-colors">
                🤖
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold leading-none">
                  {isDownloading ? "BUFFERING SOURCE PACK" : "SECURE DIRECT DISPATCH"}
                </p>
                <p className="text-xs font-black font-sans text-slate-200 tracking-tight mt-1 group-disabled:text-slate-600">
                  {isDownloading ? "Writing To App Tree Layer..." : "Download Standalone .APK File"}
                </p>
              </div>
            </button>

            {/* METADATA TARGET SHARES */}
            <div className="bg-slate-900/30 border border-slate-900/60 rounded-xl p-3 text-[10px] font-mono text-slate-500 space-y-1">
              <div className="truncate"><span className="text-slate-600">MD5:</span> 8a3f9b2c14e567f10a8d7e6c5b4a3f2e</div>
              <div><span className="text-slate-600">MIN_OS:</span> Android 8.0 (API Level 26) or higher</div>
            </div>
          </div>
        </div>

      </main>

      {/* PREMIUM FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-900 bg-slate-950/60 backdrop-blur-lg py-8 px-6">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="text-xs font-mono text-slate-500 tracking-wide">
            &copy; {new Date().getFullYear()} GeezTic Inc. All permissions mapped.
          </p>

          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-900 px-4 py-2 rounded-xl">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-xs font-mono text-slate-400">
              System Engine Status: <span className="font-bold text-slate-200 uppercase text-[10px]">Optimal</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}