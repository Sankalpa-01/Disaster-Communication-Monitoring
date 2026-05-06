"use client";

import { useMemo } from "react";
import { useTrafficStream } from "../hooks/useTrafficStream";
import ControlPanel from "../components/ControlPanel";
import NetworkGraph from "../components/NetworkGraph";
import StatCard from "../components/StatCard";

export default function CommandCenter() {
  // 1. Pull all our logic from the custom hook! 
  // No messy fetches or WebSocket code clutters this file.
  const {
    networkState,
    severity,
    livePackets,
    isConnected,
    triggerDisaster,
    resetNetwork,
    setSeverity
  } = useTrafficStream();

  // 2. Calculate some live math for our top Stat Cards
  const stats = useMemo(() => {
    if (livePackets.length === 0) return { avgRtt: "0", maxJitter: "0" };
    
    const totalRtt = livePackets.reduce((sum, p) => sum + p.rtt, 0);
    const maxJit = Math.max(...livePackets.map(p => p.jitter));
    
    return {
      avgRtt: (totalRtt / livePackets.length).toFixed(1),
      maxJitter: maxJit.toFixed(1)
    };
  }, [livePackets]);

  const isDisaster = networkState === "DISASTER";

  return (
    // The master wrapper uses the dark gradient we defined in globals.css
    <main className="flex h-screen w-full p-4 gap-4 overflow-hidden">
      
      {/* LEFT PANEL: The Control Panel (Fixed Width) */}
      <div className="w-[320px] shrink-0 h-full">
        <ControlPanel 
          networkState={networkState}
          severity={severity}
          setSeverity={setSeverity}
          triggerDisaster={triggerDisaster}
          resetNetwork={resetNetwork}
          isConnected={isConnected}
        />
      </div>

      {/* RIGHT PANEL: Stats and Graph */}
      <div className="flex-1 flex flex-col h-full gap-4 min-w-0">
        
        {/* TOP ROW: Live Statistic Cards */}
        <div className="grid grid-cols-3 gap-4 shrink-0">
          <StatCard 
            title="Active Data Flows" 
            value={livePackets.length} 
            alert={isDisaster}
          />
          <StatCard 
            title="Avg Network Latency" 
            value={`${stats.avgRtt} ms`} 
            // Alerts turn red if latency spikes over 100ms
            alert={parseFloat(stats.avgRtt) > 100} 
          />
          <StatCard 
            title="Peak Jitter" 
            value={`${stats.maxJitter} ms`} 
            // Alerts turn red if jitter spikes over 30ms
            alert={parseFloat(stats.maxJitter) > 30}
          />
        </div>

        {/* BOTTOM AREA: The Digital Twin AI Visualizer */}
        <div className="flex-1 min-h-0 bg-brand-panel border border-brand-border rounded-xl p-4 flex flex-col relative overflow-hidden">
          
          <div className="flex justify-between items-center mb-4 shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-slate-200">AI Spatial Embedding Map</h2>
              <p className="text-xs text-slate-500">Live Contrastive Clustering Analysis</p>
            </div>
            
            {/* Blinking "REC" indicator for a cinematic touch */}
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></div>
              <span className="text-xs font-mono text-slate-400">REC</span>
            </div>
          </div>

          {/* The actual D3.js Graph Component */}
          <div className="flex-1 min-h-0 w-full relative rounded-lg overflow-hidden">
            <NetworkGraph packets={livePackets} />
          </div>

        </div>
      </div>

    </main>
  );
}