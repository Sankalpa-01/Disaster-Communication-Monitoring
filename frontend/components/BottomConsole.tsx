export default function BottomConsole({ intelligence }: any) {
  return (
    <div className="w-full h-full flex gap-6">
      {/* Live Alerts Feed */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[10px] text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live Alerts
        </h3>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
          {intelligence.alerts.map((alert: string, i: number) => (
            <div key={i} className="text-xs font-mono text-slate-300 border-l-2 border-red-500/50 pl-2 py-1 bg-red-500/5">
              {alert}
            </div>
          ))}
        </div>
      </div>

      {/* AI Decision Engine */}
      <div className="flex-1 flex flex-col border-l border-slate-800 pl-6">
        <h3 className="text-[10px] text-cyan-400 uppercase tracking-widest mb-3">AI Decision Engine</h3>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
          {intelligence.decisions.map((dec: string, i: number) => (
            <div key={i} className="text-xs font-mono text-slate-400 flex items-start gap-2">
              <span className="text-green-500">✓</span> {dec}
            </div>
          ))}
        </div>
      </div>

      {/* Collapse Timer & Zone Status */}
      <div className="flex-1 flex flex-col border-l border-slate-800 pl-6">
        <div className="bg-red-950/30 border border-red-900/50 rounded p-2 mb-3 text-center">
          <div className="text-[9px] text-red-500/80 uppercase tracking-widest mb-1">Est. Comm Collapse</div>
          <div className="text-lg font-mono text-red-400 font-bold">{intelligence.timer}</div>
        </div>
        <div className="flex-1">
          <table className="w-full text-left text-xs">
            <tbody>
              {intelligence.zones.map((zone: any, i: number) => (
                <tr key={i} className="border-b border-slate-800/50">
                  <td className="py-1.5 text-slate-400 font-mono">{zone.name}</td>
                  <td className={`py-1.5 text-right font-bold ${zone.status === 'Critical' ? 'text-red-500' : zone.status === 'Moderate' ? 'text-yellow-500' : 'text-green-500'}`}>
                    {zone.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}