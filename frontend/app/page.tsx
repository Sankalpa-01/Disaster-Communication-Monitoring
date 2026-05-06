// // "use client";

// // import { useMemo } from "react";
// // import { useTrafficStream } from "../hooks/useTrafficStream";
// // import ControlPanel from "../components/ControlPanel";
// // import NetworkGraph from "../components/NetworkGraph";
// // import StatCard from "../components/StatCard";

// // export default function CommandCenter() {
// //   // 1. Pull all our logic from the custom hook! 
// //   // No messy fetches or WebSocket code clutters this file.
// //   const {
// //     networkState,
// //     severity,
// //     livePackets,
// //     isConnected,
// //     triggerDisaster,
// //     resetNetwork,
// //     setSeverity
// //   } = useTrafficStream();

// //   // 2. Calculate some live math for our top Stat Cards
// //   const stats = useMemo(() => {
// //     if (livePackets.length === 0) return { avgRtt: "0", maxJitter: "0" };
    
// //     const totalRtt = livePackets.reduce((sum, p) => sum + p.rtt, 0);
// //     const maxJit = Math.max(...livePackets.map(p => p.jitter));
    
// //     return {
// //       avgRtt: (totalRtt / livePackets.length).toFixed(1),
// //       maxJitter: maxJit.toFixed(1)
// //     };
// //   }, [livePackets]);

// //   const isDisaster = networkState === "DISASTER";

// //   return (
// //     // The master wrapper uses the dark gradient we defined in globals.css
// //     <main className="flex h-screen w-full p-4 gap-4 overflow-hidden">
      
// //       {/* LEFT PANEL: The Control Panel (Fixed Width) */}
// //       <div className="w-[320px] shrink-0 h-full">
// //         <ControlPanel 
// //           networkState={networkState}
// //           severity={severity}
// //           setSeverity={setSeverity}
// //           triggerDisaster={triggerDisaster}
// //           resetNetwork={resetNetwork}
// //           isConnected={isConnected}
// //         />
// //       </div>

// //       {/* RIGHT PANEL: Stats and Graph */}
// //       <div className="flex-1 flex flex-col h-full gap-4 min-w-0">
        
// //         {/* TOP ROW: Live Statistic Cards */}
// //         <div className="grid grid-cols-3 gap-4 shrink-0">
// //           <StatCard 
// //             title="Active Data Flows" 
// //             value={livePackets.length} 
// //             alert={isDisaster}
// //           />
// //           <StatCard 
// //             title="Avg Network Latency" 
// //             value={`${stats.avgRtt} ms`} 
// //             // Alerts turn red if latency spikes over 100ms
// //             alert={parseFloat(stats.avgRtt) > 100} 
// //           />
// //           <StatCard 
// //             title="Peak Jitter" 
// //             value={`${stats.maxJitter} ms`} 
// //             // Alerts turn red if jitter spikes over 30ms
// //             alert={parseFloat(stats.maxJitter) > 30}
// //           />
// //         </div>

// //         {/* BOTTOM AREA: The Digital Twin AI Visualizer */}
// //         <div className="flex-1 min-h-0 bg-brand-panel border border-brand-border rounded-xl p-4 flex flex-col relative overflow-hidden">
          
// //           <div className="flex justify-between items-center mb-4 shrink-0">
// //             <div>
// //               <h2 className="text-lg font-semibold text-slate-200">AI Spatial Embedding Map</h2>
// //               <p className="text-xs text-slate-500">Live Contrastive Clustering Analysis</p>
// //             </div>
            
// //             {/* Blinking "REC" indicator for a cinematic touch */}
// //             <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full">
// //               <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}></div>
// //               <span className="text-xs font-mono text-slate-400">REC</span>
// //             </div>
// //           </div>

// //           {/* The actual D3.js Graph Component */}
// //           <div className="flex-1 min-h-0 w-full relative rounded-lg overflow-hidden">
// //             <NetworkGraph packets={livePackets} disasterState={networkState} />
// //           </div>

// //         </div>
// //       </div>

// //     </main>
// //   );
// // }

// "use client";

// import { useMemo } from "react";
// import { useTrafficStream } from "../hooks/useTrafficStream";
// import ControlPanel from "../components/ControlPanel";
// import NetworkGraph from "../components/NetworkGraph";
// import TopMetrics from "../components/TopMetrics";
// import BottomConsole from "../components/BottomConsole";
// // We will build this in Phase 2
// import TopologyMap from "../components/TopologyMap";

// export default function CommandCenter() {
//   const {
//     networkState, severity, livePackets, isConnected,
//     triggerDisaster, resetNetwork, setSeverity,
//     // New mocked intelligence data we will add to the hook
//     intelligence
//   } = useTrafficStream();

//   const isDisaster = networkState === "DISASTER";

//   return (
//     // Futuristic scanline/grid background
//     <main className="flex h-screen w-full bg-[#030712] text-slate-300 overflow-hidden font-sans relative">
//       {/* Subtle background grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

//       {/* LEFT PANEL: User Controls (Fixed Width 320px) */}
//       <div className="w-[320px] shrink-0 h-full p-3 z-10 flex flex-col">
//         <ControlPanel 
//           networkState={networkState} severity={severity} setSeverity={setSeverity}
//           triggerDisaster={triggerDisaster} resetNetwork={resetNetwork} isConnected={isConnected}
//         />
//       </div>

//       {/* CENTER COLUMN: Metrics, Heatmap, Console */}
//       <div className="flex-1 flex flex-col h-full p-3 pl-0 gap-3 min-w-0 z-10">
        
//         {/* TOP ROW: 8 Metric Cards */}
//         <div className="shrink-0">
//           <TopMetrics packets={livePackets} intelligence={intelligence} isDisaster={isDisaster} />
//         </div>

//         {/* MIDDLE: AI Spatial Embedding Map */}
//         <div className="flex-1 min-h-0 bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex flex-col relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
//           <div className="flex justify-between items-center mb-2 shrink-0">
//             <div>
//               <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">AI Spatial Embedding Map</h2>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">Live Contrastive Clustering Analysis</p>
//             </div>
//             <div className="flex items-center gap-2 px-2 py-1 bg-black/50 border border-slate-800 rounded">
//               <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-cyan-500 animate-pulse' : 'bg-red-500'}`}></div>
//               <span className="text-[10px] font-mono text-cyan-500/80 tracking-widest">UPLINK ACTIVE</span>
//             </div>
//           </div>
//           <div className="flex-1 min-h-0 w-full relative rounded border border-slate-800/50 overflow-hidden">
//             <NetworkGraph packets={livePackets} disasterState={networkState} />
//           </div>
//         </div>

//         {/* BOTTOM: AI Decision Console */}
//         <div className="h-[220px] shrink-0 bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
//           <BottomConsole intelligence={intelligence} />
//         </div>

//       </div>

//       {/* RIGHT PANEL: Smart City Topology (Fixed Width 350px) */}
//       <div className="w-[350px] shrink-0 h-full p-3 pl-0 z-10 flex flex-col">
//         <TopologyMap intelligence={intelligence} />
//       </div>

//     </main>
//   );
// }

"use client";

import { useMemo } from "react";
import { useTrafficStream } from "../hooks/useTrafficStream";
import ControlPanel from "../components/ControlPanel";
import NetworkGraph from "../components/NetworkGraph";
import TopMetrics from "../components/TopMetrics";
import BottomConsole from "../components/BottomConsole";
import TopologyMap from "../components/TopologyMap";

export default function CommandCenter() {
  const {
    networkState, severity, livePackets, isConnected,
    triggerDisaster, resetNetwork, setSeverity,
    intelligence
  } = useTrafficStream();

  const isDisaster = networkState === "DISASTER";

  return (
    // Futuristic scanline/grid background
    <main className="flex h-screen w-full bg-[#030712] text-slate-300 overflow-hidden font-sans relative">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

      {/* LEFT PANEL: User Controls (Fixed Width 320px) */}
      <div className="w-[320px] shrink-0 h-full p-3 z-10 flex flex-col">
        <ControlPanel 
          networkState={networkState} severity={severity} setSeverity={setSeverity}
          triggerDisaster={triggerDisaster} resetNetwork={resetNetwork} isConnected={isConnected}
        />
      </div>

      {/* CENTER COLUMN: Metrics, Geographical Map, Console */}
      <div className="flex-1 flex flex-col h-full p-3 pl-0 gap-3 min-w-0 z-10">
        
        {/* TOP ROW: 8 Metric Cards */}
        <div className="shrink-0">
          <TopMetrics packets={livePackets} intelligence={intelligence} isDisaster={isDisaster} />
        </div>

        {/* MIDDLE: The Unified Geographical Map */}
        <div className="flex-1 min-h-0 bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex flex-col relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <TopologyMap intelligence={intelligence} />
        </div>

        {/* BOTTOM: AI Decision Console */}
        <div className="h-[220px] shrink-0 bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <BottomConsole intelligence={intelligence} />
        </div>

      </div>

      {/* RIGHT PANEL: AI Contour Map (Fixed Width 350px) */}
      <div className="w-[350px] shrink-0 h-full p-3 pl-0 z-10 flex flex-col">
        <div className="w-full h-full bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          <div className="mb-2 shrink-0 z-10 flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">AI Embeddings</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Fluid Contour Clusters</p>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-black/50 border border-slate-800 rounded">
              <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-cyan-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-[10px] font-mono text-cyan-500/80 tracking-widest">UPLINK</span>
            </div>
          </div>
          
          <div className="flex-1 -mx-4 -mb-4 relative">
            <NetworkGraph packets={livePackets} disasterState={networkState} />
          </div>

        </div>
      </div>

    </main>
  );
}