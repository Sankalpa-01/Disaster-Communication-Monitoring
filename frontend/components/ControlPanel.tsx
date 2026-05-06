// import { Dispatch, SetStateAction } from "react";

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

//   return (
//     <div className="flex flex-col h-full bg-brand-panel border border-brand-border rounded-xl p-6">
      
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight mb-1">
//           NEXUS COMMAND
//         </h1>
//         <p className="text-xs text-slate-500 flex items-center gap-2">
//           <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
//           {isConnected ? "Live Uplink Active" : "Uplink Severed"}
//         </p>
//       </div>

//       <div className="flex-1 space-y-8">
//         {/* State Indicator */}
//         <div>
//           <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Status</h2>
//           <div className={`
//             px-4 py-3 rounded-lg border text-sm font-bold tracking-widest text-center transition-all duration-500
//             ${isDisaster 
//               ? 'bg-red-950/40 border-red-500/50 text-red-400 animate-pulse-fast shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
//               : 'bg-blue-950/30 border-blue-500/30 text-blue-400'}
//           `}>
//             {networkState}
//           </div>
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
//           onClick={() => triggerDisaster("flood", severity)}
//           className="w-full bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-400 font-bold py-3 px-4 rounded-lg transition-all duration-200 uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
//         >
//           🚨 Trigger Flood
//         </button>
//         <button 
//           onClick={resetNetwork}
//           className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 uppercase tracking-wider text-sm"
//         >
//           ✅ Stabilize
//         </button>
//       </div>
//     </div>
//   );
// }

import { Dispatch, SetStateAction, useState } from "react";

interface ControlPanelProps {
  networkState: string;
  severity: number;
  setSeverity: Dispatch<SetStateAction<number>>;
  triggerDisaster: (type: string, severity: number) => void;
  resetNetwork: () => void;
  isConnected: boolean;
}

export default function ControlPanel({ 
  networkState, severity, setSeverity, triggerDisaster, resetNetwork, isConnected 
}: ControlPanelProps) {
  
  const isDisaster = networkState === "DISASTER";
  // Add local state for the selected disaster type
  const [disasterType, setDisasterType] = useState("cyberattack");

  return (
    <div className="flex flex-col h-full bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 shadow-2xl">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight mb-1">
          NEXUS COMMAND
        </h1>
        <p className="text-xs flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className={isConnected ? "text-green-500/80" : "text-red-500/80"}>
            {isConnected ? "Live Uplink Active" : "Uplink Severed (Check Backend)"}
          </span>
        </p>
      </div>

      <div className="flex-1 space-y-8">
        {/* System Status */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Status</h2>
          <div className={`
            px-4 py-3 rounded-lg border text-sm font-bold tracking-widest text-center transition-all duration-500
            ${isDisaster 
              ? 'bg-red-950/40 border-red-500 text-red-400 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
              : 'bg-blue-950/30 border-blue-500/30 text-blue-400'}
          `}>
            {networkState}
          </div>
        </div>

        {/* Disaster Type Selector */}
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Threat Scenario</h2>
          <select 
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
            className="w-full bg-[#1E293B] text-slate-200 text-sm border border-slate-700 rounded-lg p-3 outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="cyberattack">DDoS Cyberattack</option>
            <option value="flood">Regional Flood (Cell Tower Down)</option>
            <option value="earthquake">Earthquake (Fiber Cut)</option>
          </select>
        </div>

        {/* Severity Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity Target</h2>
            <span className="text-xs font-bold text-slate-300">Level {severity}</span>
          </div>
          <input 
            type="range" min="1" max="10" 
            value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-auto pt-8">
        <button 
          onClick={() => triggerDisaster(disasterType, severity)}
          className="w-full bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-400 font-bold py-3 px-4 rounded-lg transition-all duration-200 uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
        >
          🚨 TRIGGER {disasterType.toUpperCase()}
        </button>
        <button 
          onClick={resetNetwork}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 px-4 rounded-lg transition-all duration-200 uppercase tracking-wider text-sm"
        >
          ✅ STABILIZE NETWORK
        </button>
      </div>
    </div>
  );
}