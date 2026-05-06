export default function TopologyMapPlaceholder({ intelligence }: any) {
  return (
    <div className="w-full h-full bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Live Comm Nodes</h2>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Smart-City Topology</p>
      </div>
      <div className="flex-1 border border-dashed border-slate-700 rounded-lg flex items-center justify-center bg-slate-900/20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-32 h-32 rounded-full border border-cyan-500 animate-ping"></div>
        </div>
        <p className="text-xs font-mono text-slate-500 text-center px-4">
          [ D3.js Topology Graph rendering engine preparing... ]<br/><br/>
          (This will be Phase 2)
        </p>
      </div>
    </div>
  );
}