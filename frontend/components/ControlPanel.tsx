// import { Dispatch, SetStateAction, useState } from "react";

// interface ControlPanelProps {
//   networkState: string;
//   severity: number;
//   setSeverity: Dispatch<SetStateAction<number>>;
//   triggerDisaster: (type: string, severity: number) => void;
//   resetNetwork: () => void;
//   isConnected: boolean;
// }

// export default function ControlPanel({ 
//   networkState, severity, setSeverity, triggerDisaster, resetNetwork, isConnected 
// }: ControlPanelProps) {
  
//   const isDisaster = networkState === "DISASTER";
//   // Add local state for the selected disaster type
//   const [disasterType, setDisasterType] = useState("cyberattack");

//   return (
//     <div className="flex flex-col h-full bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 shadow-2xl">
      
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight mb-1">
//           NEXUS COMMAND
//         </h1>
//         <p className="text-xs flex items-center gap-2">
//           <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
//           <span className={isConnected ? "text-green-500/80" : "text-red-500/80"}>
//             {isConnected ? "Live Uplink Active" : "Uplink Severed (Check Backend)"}
//           </span>
//         </p>
//       </div>

//       <div className="flex-1 space-y-8">
//         {/* System Status */}
//         <div>
//           <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Status</h2>
//           <div className={`
//             px-4 py-3 rounded-lg border text-sm font-bold tracking-widest text-center transition-all duration-500
//             ${isDisaster 
//               ? 'bg-red-950/40 border-red-500 text-red-400 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
//               : 'bg-blue-950/30 border-blue-500/30 text-blue-400'}
//           `}>
//             {networkState}
//           </div>
//         </div>

//         {/* Disaster Type Selector */}
//         <div>
//           <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Threat Scenario</h2>
//           <select 
//             value={disasterType}
//             onChange={(e) => setDisasterType(e.target.value)}
//             className="w-full bg-[#1E293B] text-slate-200 text-sm border border-slate-700 rounded-lg p-3 outline-none focus:border-indigo-500 cursor-pointer"
//           >
//             <option value="cyberattack">DDoS Cyberattack</option>
//             <option value="flood">Regional Flood (Cell Tower Down)</option>
//             <option value="earthquake">Earthquake (Fiber Cut)</option>
//           </select>
//         </div>

//         {/* Severity Slider */}
//         <div>
//           <div className="flex justify-between mb-2">
//             <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity Target</h2>
//             <span className="text-xs font-bold text-slate-300">Level {severity}</span>
//           </div>
//           <input 
//             type="range" min="1" max="10" 
//             value={severity}
//             onChange={(e) => setSeverity(parseInt(e.target.value))}
//             className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="space-y-3 mt-auto pt-8">
//         <button 
//           onClick={() => triggerDisaster(disasterType, severity)}
//           className="w-full bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-400 font-bold py-3 px-4 rounded-lg transition-all duration-200 uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
//         >
//           🚨 TRIGGER {disasterType.toUpperCase()}
//         </button>
//         <button 
//           onClick={resetNetwork}
//           className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 uppercase tracking-wider text-sm"
//         >
//           ✅ STABILIZE NETWORK
//         </button>
//       </div>
//     </div>
//   );
// }

import { Dispatch, SetStateAction, useState } from "react";
import { DisasterPayload } from "../hooks/useTrafficStream";

interface ControlPanelProps {
  networkState: string;
  severity: number;
  setSeverity: Dispatch<SetStateAction<number>>;
  triggerDisaster: (payload: DisasterPayload) => void;
  resetNetwork: () => void;
  isConnected: boolean;
}

export default function ControlPanel({ 
  networkState, severity, setSeverity, triggerDisaster, resetNetwork, isConnected 
}: ControlPanelProps) {
  
  const isDisaster = networkState === "DISASTER";
  const [disasterType, setDisasterType] = useState("flood");
  const [infraDamage, setInfraDamage] = useState(0);
  const [trafficSurge, setTrafficSurge] = useState(100);
  const [emergencyPriority, setEmergencyPriority] = useState(true);
  const [trafficSource, setTrafficSource] = useState("simulated");

  return (
    <div className="flex flex-col h-full bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 shadow-2xl overflow-y-auto custom-scrollbar">
      
      <div className="mb-6 shrink-0">
        <h1 className="text-xl font-bold text-slate-100 tracking-tight mb-1">USER INPUTS</h1>
        <p className="text-xs text-slate-400">Control disaster/network conditions.</p>
      </div>

      <div className="flex-1 space-y-6">
        
        {/* INPUT 1 - Disaster Type */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase">Input 1 — Disaster Type</label>
          <select 
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
            className="w-full bg-[#1E293B] text-slate-200 text-sm border border-slate-700 rounded p-2 outline-none"
          >
            <option value="normal">Normal</option>
            <option value="flood">Flood</option>
            <option value="earthquake">Earthquake</option>
            <option value="cyclone">Cyclone</option>
            <option value="wildfire">Wildfire</option>
            <option value="terror">Terror Attack</option>
            <option value="panic">Massive Public Panic</option>
          </select>
        </div>

        {/* INPUT 2 - Disaster Severity */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase">Input 2 — Severity</label>
            <span className="text-xs text-slate-400">{severity === 1 ? 'Mild' : severity === 10 ? 'Catastrophic' : `Level ${severity}`}</span>
          </div>
          <input 
            type="range" min="1" max="10" value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        {/* INPUT 3 - Network Infrastructure Damage */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase">Input 3 — Infra Damage</label>
            <span className="text-xs text-slate-400">{infraDamage}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={infraDamage}
            onChange={(e) => setInfraDamage(parseInt(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>

        {/* INPUT 4 - Public Traffic Surge */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase">Input 4 — Traffic Surge</label>
            <span className="text-xs text-slate-400">{trafficSurge}%</span>
          </div>
          <input 
            type="range" min="100" max="500" step="50" value={trafficSurge}
            onChange={(e) => setTrafficSurge(parseInt(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>

        {/* INPUT 5 - Emergency Traffic Priority */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 uppercase">Input 5 — Emergency Priority</label>
            <button 
              onClick={() => setEmergencyPriority(!emergencyPriority)}
              className={`px-3 py-1 text-xs rounded font-bold ${emergencyPriority ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}`}
            >
              {emergencyPriority ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* INPUT 6 - Live Traffic Source */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase">Input 6 — Traffic Source</label>
          <select 
            value={trafficSource}
            onChange={(e) => setTrafficSource(e.target.value)}
            className="w-full bg-[#1E293B] text-slate-200 text-sm border border-slate-700 rounded p-2 outline-none"
          >
            <option value="simulated">Simulated traffic</option>
            <option value="pcap">Real packet capture</option>
            <option value="dataset">Dataset playback</option>
          </select>
        </div>

      </div>

      {/* Execution Buttons */}
      <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 shrink-0">
        <button 
          // Update this onClick function to package all states into the payload
          onClick={() => triggerDisaster({
            type: disasterType,
            severity: severity,
            infraDamage: infraDamage,
            trafficSurge: trafficSurge,
            emergencyPriority: emergencyPriority,
            trafficSource: trafficSource
          })}
          className="w-full bg-red-900/50 border border-red-500 text-red-400 font-bold py-2 rounded transition-colors hover:bg-red-800/50"
        >
          APPLY CONDITIONS
        </button>
        <button 
          onClick={resetNetwork}
          className="w-full bg-slate-800 border border-slate-600 text-slate-300 font-bold py-2 rounded transition-colors hover:bg-slate-700"
        >
          RESET TO NORMAL
        </button>
      </div>
    </div>
  );
}