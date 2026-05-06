export default function StatCard({ 
  title, 
  value, 
  trend = "stable", 
  alert = false 
}: { 
  title: string; 
  value: string | number; 
  trend?: "up" | "down" | "stable";
  alert?: boolean;
}) {
  return (
    <div className={`
      relative overflow-hidden rounded-lg border bg-brand-panel p-4
      ${alert ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-brand-border'}
    `}>
      <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${alert ? 'text-red-400' : 'text-slate-100'}`}>
          {value}
        </span>
      </div>
      
      {/* Decorative background glow */}
      {alert && (
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-red-500/10 blur-xl"></div>
      )}
    </div>
  );
}