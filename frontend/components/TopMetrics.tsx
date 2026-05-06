export default function TopMetrics({ packets, intelligence, isDisaster }: any) {
  // Calculate basic stats
  const avgRtt = packets.length ? (packets.reduce((a:any, b:any) => a + b.rtt, 0) / packets.length).toFixed(1) : "0";
  
  const MetricCard = ({ title, value, colorClass = "text-slate-100", pulse = false }: any) => (
    <div className="bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 p-3 rounded-lg flex flex-col justify-center relative overflow-hidden group">
      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1 z-10">{title}</div>
      <div className={`text-xl font-mono font-bold z-10 ${colorClass} ${pulse ? 'animate-pulse' : ''}`}>{value}</div>
      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-0"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
      <MetricCard title="Active Flows" value={packets.length} />
      <MetricCard title="Avg Latency" value={`${avgRtt}ms`} colorClass={parseFloat(avgRtt) > 100 ? "text-orange-400" : "text-cyan-400"} />
      <MetricCard title="Resilience Score" value={`${intelligence.resilience}%`} colorClass={intelligence.resilience > 70 ? "text-green-400" : "text-red-500"} pulse={isDisaster} />
      <MetricCard title="Breakdown Prob" value={`${intelligence.breakdown}%`} colorClass={intelligence.breakdown > 50 ? "text-red-500" : "text-slate-100"} />
      <MetricCard title="Survivability" value={intelligence.survivability} colorClass={intelligence.survivability === "CRITICAL" ? "text-red-500" : "text-yellow-400"} pulse={isDisaster} />
      <MetricCard title="Emergency Ch." value={intelligence.emergencyChannels} colorClass="text-cyan-400" />
      <MetricCard title="Failed Nodes" value={intelligence.failedNodes} colorClass={intelligence.failedNodes > 0 ? "text-red-500" : "text-slate-100"} />
      <MetricCard title="AI Confidence" value={`${intelligence.confidence}%`} colorClass="text-indigo-400" />
    </div>
  );
}