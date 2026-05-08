// // // // import { useEffect, useRef } from "react";
// // // // import * as d3 from "d3";

// // // // export default function TopologyMap({ intelligence }: any) {
// // // //   const svgRef = useRef<SVGSVGElement>(null);

// // // //   useEffect(() => {
// // // //     if (!svgRef.current || !intelligence) return;

// // // //     const width = 350;
// // // //     const height = 500;

// // // //     const svg = d3.select(svgRef.current)
// // // //       .attr("viewBox", `0 0 ${width} ${height}`);

// // // //     // Clean up previous renders
// // // //     svg.selectAll("*").remove();

// // // //     // 1. Define the Smart City Nodes
// // // //     const nodes = [
// // // //       { id: "HQ", type: "hq", label: "Command HQ" },
// // // //       { id: "H1", type: "hospital", label: "City Hospital" },
// // // //       { id: "H2", type: "hospital", label: "East Clinic" },
// // // //       { id: "T1", type: "tower", label: "Tower Alpha" },
// // // //       { id: "T2", type: "tower", label: "Tower Beta" },
// // // //       { id: "T3", type: "tower", label: "Tower Gamma" },
// // // //       { id: "T4", type: "tower", label: "Tower Delta" },
// // // //       { id: "D1", type: "drone", label: "Rescue Drone 1" },
// // // //       { id: "D2", type: "drone", label: "Rescue Drone 2" },
// // // //       { id: "D3", type: "drone", label: "Survey Drone" },
// // // //     ];

// // // //     // 2. Define the Communication Links
// // // //     const links = [
// // // //       { source: "HQ", target: "T1" }, { source: "HQ", target: "T2" },
// // // //       { source: "T1", target: "H1" }, { source: "T2", target: "H2" },
// // // //       { source: "T1", target: "T3" }, { source: "T2", target: "T4" },
// // // //       { source: "T3", target: "T4" }, { source: "T3", target: "D1" },
// // // //       { source: "T4", target: "D2" }, { source: "H1", target: "D3" },
// // // //       { source: "H2", target: "D3" }, { source: "T1", target: "T2" }
// // // //     ];

// // // //     // 3. Apply Disaster Logic based on your AI 'intelligence' prop
// // // //     const breakdownThreshold = intelligence.breakdown; // 0 to 99
// // // //     const failedNodeCount = intelligence.failedNodes;

// // // //     // Randomly fail nodes if severity is high
// // // //     nodes.forEach((n, i) => {
// // // //       // Protect HQ and Hospitals from total failure early on
// // // //       if (n.type !== 'hq' && n.type !== 'hospital' && i < failedNodeCount + 3) {
// // // //         (n as any).status = "failed";
// // // //       } else {
// // // //         (n as any).status = "online";
// // // //       }
// // // //     });

// // // //     // Degrade links based on breakdown probability
// // // //     links.forEach(l => {
// // // //       const rand = Math.random() * 100;
// // // //       if (rand < breakdownThreshold / 3) {
// // // //         (l as any).status = "critical"; // Red, failing
// // // //       } else if (rand < breakdownThreshold) {
// // // //         (l as any).status = "congested"; // Orange, slow
// // // //       } else {
// // // //         (l as any).status = "stable"; // Cyan, healthy
// // // //       }
// // // //     });

// // // //     // 4. Initialize D3 Physics Simulation
// // // //     const simulation = d3.forceSimulation(nodes as any)
// // // //       .force("link", d3.forceLink(links).id((d: any) => d.id).distance(60))
// // // //       .force("charge", d3.forceManyBody().strength(-250))
// // // //       .force("center", d3.forceCenter(width / 2, height / 2))
// // // //       .force("collide", d3.forceCollide().radius(30));

// // // //     // 5. Draw Links (Lines)
// // // //     const link = svg.append("g")
// // // //       .selectAll("line")
// // // //       .data(links)
// // // //       .enter().append("line")
// // // //       .attr("stroke-width", (d: any) => d.status === "critical" ? 1.5 : 2)
// // // //       .attr("stroke", (d: any) => {
// // // //         if (d.status === "critical") return "#ef4444"; // Red
// // // //         if (d.status === "congested") return "#f59e0b"; // Orange
// // // //         return "#06b6d4"; // Cyan
// // // //       })
// // // //       .attr("stroke-dasharray", (d: any) => d.status === "critical" ? "4,4" : "none")
// // // //       .attr("opacity", (d: any) => d.status === "critical" ? 0.6 : 0.9);

// // // //     // 6. Draw Nodes (Groups containing shapes and labels)
// // // //     const node = svg.append("g")
// // // //       .selectAll("g")
// // // //       .data(nodes)
// // // //       .enter().append("g")
// // // //       .call(d3.drag()
// // // //         .on("start", dragstarted)
// // // //         .on("drag", dragged)
// // // //         .on("end", dragended) as any);

// // // //     // Node Shapes
// // // //     node.append("circle")
// // // //       .attr("r", 14)
// // // //       .attr("fill", (d: any) => d.status === "failed" ? "#7f1d1d" : "#0f172a") // Dark red if failed
// // // //       .attr("stroke", (d: any) => d.status === "failed" ? "#ef4444" : "#38bdf8")
// // // //       .attr("stroke-width", 2);

// // // //     // Add specific icons based on node type
// // // //     node.append("text")
// // // //       .attr("text-anchor", "middle")
// // // //       .attr("dy", 4)
// // // //       .attr("font-size", "12px")
// // // //       .text((d: any) => {
// // // //         if (d.type === "hq") return "🛡️";
// // // //         if (d.type === "hospital") return "🏥";
// // // //         if (d.type === "tower") return "📡";
// // // //         if (d.type === "drone") return "🚁";
// // // //         return "";
// // // //       });

// // // //     // Node Labels
// // // //     node.append("text")
// // // //       .attr("dy", 26)
// // // //       .attr("text-anchor", "middle")
// // // //       .attr("font-size", "9px")
// // // //       .attr("fill", (d: any) => d.status === "failed" ? "#ef4444" : "#94a3b8")
// // // //       .attr("class", "font-mono tracking-wider")
// // // //       .text((d: any) => d.label);

// // // //     // 7. Physics Tick Function (Updates positions every frame)
// // // //     simulation.on("tick", () => {
// // // //       link
// // // //         .attr("x1", (d: any) => d.source.x)
// // // //         .attr("y1", (d: any) => d.source.y)
// // // //         .attr("x2", (d: any) => d.target.x)
// // // //         .attr("y2", (d: any) => d.target.y);

// // // //       node
// // // //         .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
// // // //     });

// // // //     // Drag functions for interactive physics
// // // //     function dragstarted(event: any, d: any) {
// // // //       if (!event.active) simulation.alphaTarget(0.3).restart();
// // // //       d.fx = d.x;
// // // //       d.fy = d.y;
// // // //     }
// // // //     function dragged(event: any, d: any) {
// // // //       d.fx = event.x;
// // // //       d.fy = event.y;
// // // //     }
// // // //     function dragended(event: any, d: any) {
// // // //       if (!event.active) simulation.alphaTarget(0);
// // // //       d.fx = null;
// // // //       d.fy = null;
// // // //     }

// // // //     // Cleanup simulation on unmount to prevent memory leaks
// // // //     return () => {
// // // //       simulation.stop();
// // // //     };
// // // //   }, [intelligence]);

// // // //   return (
// // // //     <div className="w-full h-full bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative">
// // // //       <div className="mb-2 shrink-0 z-10">
// // // //         <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Live Comm Nodes</h2>
// // // //         <p className="text-[10px] text-slate-500 uppercase tracking-widest">Smart-City Topology</p>
// // // //       </div>
      
// // // //       {/* Network Status Legend */}
// // // //       <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 text-[9px] font-mono">
// // // //         <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-cyan-500"></span> Stable</div>
// // // //         <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-orange-500"></span> Congested</div>
// // // //         <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-red-500 border border-dashed border-red-500"></span> Critical</div>
// // // //       </div>

// // // //       <div className="flex-1 -mx-4 -mb-4 relative">
// // // //         <svg ref={svgRef} className="w-full h-full"></svg>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useEffect, useRef } from "react";
// // // import * as d3 from "d3";

// // // export default function TopologyMap({ intelligence }: any) {
// // //   const svgRef = useRef<SVGSVGElement>(null);

// // //   useEffect(() => {
// // //     if (!svgRef.current || !intelligence) return;

// // //     const width = 350;
// // //     const height = 480;

// // //     const svg = d3.select(svgRef.current)
// // //       .attr("viewBox", `0 0 ${width} ${height}`);

// // //     svg.selectAll("*").remove(); // Clean up

// // //     // 1. FIXED SMART CITY NODES (fx and fy lock them in place!)
// // //     const nodes = [
// // //       { id: "HQ", type: "hq", label: "Command HQ", fx: 175, fy: 220, status: "stable" },
      
// // //       // Critical Infrastructure (Prioritized)
// // //       { id: "HOSP", type: "hospital", label: "City Hospital", fx: 70, fy: 100, status: "stable" },
// // //       { id: "FIRE", type: "fire", label: "Fire Dept.", fx: 280, fy: 100, status: "stable" },
// // //       { id: "AMB", type: "ambulance", label: "Ambulance Disp.", fx: 280, fy: 220, status: "stable" },
// // //       { id: "POL", type: "police", label: "Police Precinct", fx: 70, fy: 220, status: "stable" },
      
// // //       // Public / Commercial Infrastructure (Fails first)
// // //       { id: "RES", type: "residential", label: "Residential Zone", fx: 70, fy: 350, status: "stable" },
// // //       { id: "ENT", type: "entertainment", label: "Entertainment Dist.", fx: 280, fy: 350, status: "stable" },
// // //       { id: "MED", type: "media", label: "Media Broadcast", fx: 175, fy: 420, status: "stable" },
// // //     ];

// // //     // 2. COMMUNICATION LINKS
// // //     const links = [
// // //       // HQ to Critical
// // //       { source: "HQ", target: "HOSP", status: "stable" }, { source: "HQ", target: "FIRE", status: "stable" },
// // //       { source: "HQ", target: "POL", status: "stable" }, { source: "HQ", target: "AMB", status: "stable" },
// // //       // Inter-agency
// // //       { source: "HOSP", target: "AMB", status: "stable" }, { source: "FIRE", target: "POL", status: "stable" },
// // //       // Public to HQ
// // //       { source: "HQ", target: "MED", status: "stable" }, { source: "HQ", target: "RES", status: "stable" },
// // //       { source: "HQ", target: "ENT", status: "stable" },
// // //       // Public lateral links
// // //       { source: "RES", target: "MED", status: "stable" }, { source: "ENT", target: "MED", status: "stable" }
// // //     ];

// // //     // 3. HARDCODED DISASTER LOGIC (This is what your ML will eventually replace)
// // //     const breakdown = intelligence.breakdown; // 0 to 99 based on your severity slider

// // //     nodes.forEach((n) => {
// // //       // Entertainment and Media fail very quickly to save bandwidth
// // //       if ((n.id === "ENT" || n.id === "MED") && breakdown > 30) n.status = "failed";
// // //       // Residential fails at medium severity
// // //       else if (n.id === "RES" && breakdown > 60) n.status = "failed";
// // //       // Police/Fire get congested at high severity
// // //       else if ((n.id === "POL" || n.id === "FIRE") && breakdown > 75) n.status = "congested";
// // //       // Hospital stays online unless it's a total catastrophe
// // //       else if (n.id === "HOSP" && breakdown > 90) n.status = "critical";
// // //       else n.status = "stable";
// // //     });

// // //     links.forEach((l) => {
// // //       // If either end of a link is failed, the link is dead
// // //       const sourceNode = nodes.find(n => n.id === l.source);
// // //       const targetNode = nodes.find(n => n.id === l.target);
      
// // //       if (sourceNode?.status === "failed" || targetNode?.status === "failed") {
// // //         l.status = "dead";
// // //       } else if (breakdown > 80) {
// // //         l.status = "critical"; // Red, struggling
// // //       } else if (breakdown > 50) {
// // //         l.status = "congested"; // Orange
// // //       } else {
// // //         l.status = "stable"; // Blue
// // //       }
// // //     });

// // //     // 4. Initialize D3 (Physics are disabled because positions are fixed)
// // //     const simulation = d3.forceSimulation(nodes as any)
// // //       .force("link", d3.forceLink(links).id((d: any) => d.id));

// // //     // 5. Draw Links
// // //     const link = svg.append("g").selectAll("line").data(links).enter().append("line")
// // //       .attr("stroke-width", (d: any) => d.status === "dead" ? 1 : 2.5)
// // //       .attr("stroke", (d: any) => {
// // //         if (d.status === "dead") return "#334155"; // Dark grey
// // //         if (d.status === "critical") return "#ef4444"; // Red
// // //         if (d.status === "congested") return "#f59e0b"; // Orange
// // //         return "#06b6d4"; // Cyan
// // //       })
// // //       .attr("stroke-dasharray", (d: any) => d.status === "critical" ? "4,4" : "none")
// // //       .attr("opacity", (d: any) => d.status === "dead" ? 0.3 : 0.9);

// // //     // 6. Draw Nodes
// // //     const node = svg.append("g").selectAll("g").data(nodes).enter().append("g");

// // //     // Outer Glow for critical nodes
// // //     node.append("circle")
// // //       .attr("r", 20)
// // //       .attr("fill", "none")
// // //       .attr("stroke", (d: any) => d.status === "critical" ? "#ef4444" : "none")
// // //       .attr("stroke-width", 2)
// // //       .attr("class", (d: any) => d.status === "critical" ? "animate-ping" : "");

// // //     node.append("circle")
// // //       .attr("r", 16)
// // //       .attr("fill", (d: any) => {
// // //         if (d.status === "failed") return "#450a0a"; // Dark red
// // //         if (d.status === "congested") return "#451a03"; // Dark orange
// // //         return "#0f172a"; // Dark slate
// // //       })
// // //       .attr("stroke", (d: any) => {
// // //         if (d.status === "failed") return "#7f1d1d";
// // //         if (d.status === "critical") return "#ef4444";
// // //         if (d.status === "congested") return "#f59e0b";
// // //         return "#38bdf8";
// // //       })
// // //       .attr("stroke-width", 2.5);

// // //     // Emojis for icons
// // //     node.append("text")
// // //       .attr("text-anchor", "middle")
// // //       .attr("dy", 4)
// // //       .attr("font-size", "14px")
// // //       .text((d: any) => {
// // //         if (d.type === "hq") return "🛡️";
// // //         if (d.type === "hospital") return "🏥";
// // //         if (d.type === "fire") return "🚒";
// // //         if (d.type === "police") return "🚓";
// // //         if (d.type === "ambulance") return "🚑";
// // //         if (d.type === "media") return "📡";
// // //         if (d.type === "entertainment") return "🎭";
// // //         if (d.type === "residential") return "🏠";
// // //         return "";
// // //       })
// // //       .attr("opacity", (d: any) => d.status === "failed" ? 0.4 : 1);

// // //     // Node Labels
// // //     node.append("text")
// // //       .attr("dy", 30)
// // //       .attr("text-anchor", "middle")
// // //       .attr("font-size", "10px")
// // //       .attr("fill", (d: any) => d.status === "failed" ? "#ef4444" : "#94a3b8")
// // //       .attr("class", "font-mono tracking-widest font-bold")
// // //       .text((d: any) => d.label);

// // //     // Map fixed positions
// // //     simulation.on("tick", () => {
// // //       link
// // //         .attr("x1", (d: any) => d.source.x)
// // //         .attr("y1", (d: any) => d.source.y)
// // //         .attr("x2", (d: any) => d.target.x)
// // //         .attr("y2", (d: any) => d.target.y);

// // //       node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
// // //     });

// // //     return () => {
// // //       simulation.stop();
// // //     };
// // //   }, [intelligence]);

// // //   return (
// // //     <div className="w-full h-full bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative">
// // //       <div className="mb-2 shrink-0 z-10">
// // //         <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Live Comm Nodes</h2>
// // //         <p className="text-[10px] text-slate-500 uppercase tracking-widest">Fixed City Topology</p>
// // //       </div>
      
// // //       <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 text-[9px] font-mono">
// // //         <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-cyan-500"></span> Stable</div>
// // //         <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-orange-500"></span> Congested</div>
// // //         <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-red-500 border border-dashed border-red-500"></span> Critical</div>
// // //         <div className="flex items-center gap-1"><span className="w-2 h-0.5 bg-slate-700"></span> Offline</div>
// // //       </div>

// // //       <div className="flex-1 -mx-4 -mb-4 relative">
// // //         <svg ref={svgRef} className="w-full h-full"></svg>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useRef } from "react";
// // import * as d3 from "d3";

// // export default function TopologyMap({ intelligence }: any) {
// //   const svgRef = useRef<SVGSVGElement>(null);

// //   useEffect(() => {
// //     if (!svgRef.current || !intelligence) return;

// //     const width = 350;
// //     const height = 480;

// //     const svg = d3.select(svgRef.current)
// //       .attr("viewBox", `0 0 ${width} ${height}`);

// //     svg.selectAll("*").remove(); // Clean up on re-render

// //     type RegionTheme = {
// //       border: string;
// //       bg: string;
// //       text: string;
// //       status: "NORMAL" | "PRIORITY" | "CONGESTED" | "OFFLINE";
// //     };

// //     type Region = {
// //       id: string;
// //       label: string;
// //       icon: string;
// //       x: number;
// //       y: number;
// //       w: number;
// //       h: number;
// //       theme: RegionTheme;
// //     };

// //     // 2. COLOR THEMES
// //     const theme: Record<string, RegionTheme> = {
// //       stable: { border: "#06b6d4", bg: "rgba(6, 182, 212, 0.1)", text: "#06b6d4", status: "NORMAL" }, // Cyan
// //       priority: { border: "#ef4444", bg: "rgba(239, 68, 68, 0.2)", text: "#ef4444", status: "PRIORITY" }, // RED (Important!)
// //       congested: { border: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b", status: "CONGESTED" }, // Orange
// //       dropped: { border: "#334155", bg: "rgba(51, 65, 85, 0.3)", text: "#475569", status: "OFFLINE" } // Grey
// //     };

// //     // 1. DEFINE THE CITY SECTORS (REGIONS)
// //     const regions: Region[] = [
// //       { id: "HOSP", label: "HOSPITAL ZONE", icon: "🏥", x: 15, y: 10, w: 155, h: 105, theme: theme.stable },
// //       { id: "FIRE", label: "FIRE & RESCUE", icon: "🚒", x: 180, y: 10, w: 155, h: 105, theme: theme.stable },
// //       { id: "POL", label: "POLICE DEPT", icon: "🚓", x: 15, y: 125, w: 155, h: 105, theme: theme.stable },
// //       { id: "HQ", label: "COMMAND HQ", icon: "🛡️", x: 180, y: 125, w: 155, h: 105, theme: theme.stable },
// //       { id: "RES", label: "RESIDENTIAL", icon: "🏠", x: 15, y: 240, w: 155, h: 105, theme: theme.stable },
// //       { id: "ENT", label: "ENTERTAINMENT", icon: "🎭", x: 180, y: 240, w: 155, h: 105, theme: theme.stable },
// //       { id: "MED", label: "MEDIA BROADCAST", icon: "📡", x: 15, y: 355, w: 320, h: 105, theme: theme.stable }, // Spans full width
// //     ];

// //     // Helper to draw Sci-Fi chamfered (cut-corner) rectangles
// //     const drawHexRect = (x: number, y: number, w: number, h: number) => {
// //       const c = 12; // corner cut size
// //       return `M ${x+c},${y} L ${x+w},${y} L ${x+w},${y+h-c} L ${x+w-c},${y+h} L ${x},${y+h} L ${x},${y+c} Z`;
// //     };

// //     // 3. APPLY AI DISASTER LOGIC
// //     // We map the colors based on the breakdown metric (0-99).
// //     const severityLevel = intelligence.breakdown;

// //     regions.forEach((r: any) => {
// //       let state = "stable";

// //       if (r.id === "ENT" || r.id === "MED") {
// //         // Entertainment/Media are non-essential. They get dropped first to save bandwidth.
// //         if (severityLevel > 20) state = "congested";
// //         if (severityLevel > 40) state = "dropped";
// //       } else if (r.id === "RES") {
// //         // Residential gets congested, but we try to keep it online.
// //         if (severityLevel > 30) state = "congested";
// //         if (severityLevel > 70) state = "dropped";
// //       } else if (r.id === "HOSP" || r.id === "FIRE" || r.id === "POL" || r.id === "HQ") {
// //         // EMERGENCY ZONES: These become RED (Priority) when disaster strikes!
// //         if (severityLevel > 25) state = "priority";
// //       }

// //       r.theme = theme[state as keyof typeof theme];
// //     });

// //     // 4. DRAW THE REGIONS
// //     const svgRegions = svg.selectAll("g.region")
// //       .data(regions)
// //       .enter()
// //       .append("g")
// //       .attr("class", "region")
// //       // Add a cool hover effect
// //       .on("mouseover", function() { d3.select(this).style("opacity", 0.8); })
// //       .on("mouseout", function() { d3.select(this).style("opacity", 1); });

// //     // Draw the polygonal background
// //     svgRegions.append("path")
// //       .attr("d", d => drawHexRect(d.x, d.y, d.w, d.h))
// //       .attr("fill", d => d.theme.bg)
// //       .attr("stroke", d => d.theme.border)
// //       .attr("stroke-width", 2)
// //       .attr("class", d => d.theme.status === "PRIORITY" ? "animate-pulse" : "transition-colors duration-500");

// //     // Draw Icon
// //     svgRegions.append("text")
// //       .attr("x", d => d.x + d.w / 2)
// //       .attr("y", d => d.y + 40)
// //       .attr("text-anchor", "middle")
// //       .attr("font-size", "24px")
// //       .style("opacity", d => d.theme.status === "OFFLINE" ? 0.3 : 1)
// //       .text(d => d.icon);

// //     // Draw Sector Name
// //     svgRegions.append("text")
// //       .attr("x", d => d.x + d.w / 2)
// //       .attr("y", d => d.y + 70)
// //       .attr("text-anchor", "middle")
// //       .attr("font-size", "11px")
// //       .attr("fill", "#e2e8f0")
// //       .attr("class", "font-mono font-bold tracking-widest")
// //       .text(d => d.label);

// //     // Draw Network Status text
// //     svgRegions.append("text")
// //       .attr("x", d => d.x + d.w / 2)
// //       .attr("y", d => d.y + 90)
// //       .attr("text-anchor", "middle")
// //       .attr("font-size", "10px")
// //       .attr("fill", d => d.theme.text)
// //       .attr("class", "font-mono font-bold tracking-widest")
// //       .text(d => d.theme.status);

// //   }, [intelligence]);

// //   return (
// //     <div className="w-full h-full bg-[#0B1120]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative">
// //       <div className="mb-4 shrink-0 z-10 flex justify-between items-start">
// //         <div>
// //           <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Live Comm Nodes</h2>
// //           <p className="text-[10px] text-slate-500 uppercase tracking-widest">Sector Network Map</p>
// //         </div>
// //       </div>
      
// //       {/* Legend */}
// //       <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 text-[9px] font-mono border border-slate-800 bg-slate-900/80 p-2 rounded">
// //         <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> Normal</div>
// //         <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Congested</div>
// //         <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red] animate-pulse"></span> Priority</div>
// //         <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-600"></span> Dropped</div>
// //       </div>

// //       <div className="flex-1 -mx-4 -mb-4 relative">
// //         <svg ref={svgRef} className="w-full h-full"></svg>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useRef } from "react";
// import * as d3 from "d3";

// export default function TopologyMap({ intelligence }: any) {
//   const svgRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (!svgRef.current || !intelligence) return;
//     const svg = d3.select(svgRef.current).attr("viewBox", "0 0 800 500");
//     svg.selectAll("*").remove();

//     // 1. Interlocking geographic coordinates forming a unified city map
//     const regions = [
//   { id: "Hospital", label: "Hospital Zone", d: "M 100,100 L 300,80 L 350,220 L 150,280 Z", cx: 220, cy: 170 },
//   { id: "Firefighter", label: "Fire & Rescue", d: "M 300,80 L 550,110 L 480,250 L 350,220 Z", cx: 420, cy: 160 },
//   { id: "Ambulance", label: "Ambulance Dispatch", d: "M 350,220 L 480,250 L 450,400 L 320,380 Z", cx: 400, cy: 300 },
//   { id: "Police", label: "Police Dept", d: "M 150,280 L 350,220 L 320,380 L 120,420 Z", cx: 230, cy: 320 },
//   { id: "Social_Media", label: "Residential (Social)", d: "M 480,250 L 700,200 L 750,380 L 550,450 L 450,400 Z", cx: 580, cy: 310 },
//   { id: "Entertainment", label: "Entertainment", d: "M 550,450 L 750,380 L 800,480 L 500,520 Z", cx: 650, cy: 450 },
//   { id: "Public_Hub", label: "Public Broadcast", d: "M 120,420 L 320,380 L 450,400 L 550,450 L 500,520 L 200,500 Z", cx: 330, cy: 450 },
// ];

//     const breakdown = intelligence.breakdown; // 0 to 99

//     // 2. Strict 5-Color Logic Engine
//     const getColor = (id: string, bd: number) => {
//       let state = "healthy"; // Default
      
//       // Low Priority Zones break easily
//       if (id === "MED" || id === "ENT") {
//         if (bd > 10) state = "moderate";
//         if (bd > 30) state = "high_stress";
//         if (bd > 50) state = "critical";
//         if (bd > 70) state = "imminent";
//       } 
//       // Medium Priority Zone
//       else if (id === "RES") {
//         if (bd > 20) state = "moderate";
//         if (bd > 50) state = "high_stress";
//         if (bd > 70) state = "critical";
//         if (bd > 85) state = "imminent";
//       } 
//       // High Priority Zones (Hospital, HQ, Police) stay green longer
//       else {
//         if (bd > 40) state = "moderate";
//         if (bd > 60) state = "high_stress";
//         if (bd > 80) state = "critical";
//         if (bd > 95) state = "imminent";
//       }

//       // Map state to EXACT colors requested
//       switch (state) {
//         case "healthy": return { fill: "#22c55e", stroke: "#166534", class: "", label: "HEALTHY" };       // Green
//         case "moderate": return { fill: "#eab308", stroke: "#854d0e", class: "", label: "MODERATE" };      // Yellow
//         case "high_stress": return { fill: "#f97316", stroke: "#9a3412", class: "", label: "HIGH STRESS" };// Orange
//         case "critical": return { fill: "#ef4444", stroke: "#991b1b", class: "", label: "CRITICAL" };      // Red
//         case "imminent": return { fill: "#ef4444", stroke: "#991b1b", class: "animate-pulse", label: "BREAKDOWN" }; // Flashing Red
//         default: return { fill: "#22c55e", stroke: "#166534", class: "", label: "HEALTHY" };
//       }
//     };

//     // 3. Draw the Map
//     const mapGroup = svg.append("g").attr("transform", "translate(0, -20) scale(0.95)");

//     const regionNodes = mapGroup.selectAll("g.region").data(regions).enter().append("g").attr("class", "region");

//     regionNodes.append("path")
//       .attr("d", d => d.d)
//       .attr("fill", d => {
//         const colorData = getColor(d.id, breakdown);
//         // We use opacity over a dark background to make it look like a glowing sci-fi map
//         return colorData.fill + "40"; // Adding hex opacity
//       })
//       .attr("stroke", d => getColor(d.id, breakdown).fill)
//       .attr("stroke-width", 3)
//       .attr("stroke-linejoin", "round")
//       .attr("class", d => getColor(d.id, breakdown).class + " transition-colors duration-700");

//     // Add labels
//     regionNodes.append("text").attr("x", d => d.cx).attr("y", d => d.cy - 10).attr("text-anchor", "middle")
//       .attr("font-size", "14px").attr("fill", "#f8fafc").attr("class", "font-mono font-bold tracking-widest")
//       .text(d => d.label);
      
//     // Add dynamic status text
//     regionNodes.append("text").attr("x", d => d.cx).attr("y", d => d.cy + 10).attr("text-anchor", "middle")
//       .attr("font-size", "12px").attr("fill", d => getColor(d.id, breakdown).fill).attr("class", "font-mono font-bold tracking-widest")
//       .text(d => getColor(d.id, breakdown).label);

//   }, [intelligence]);

//   return (
//     <div className="w-full h-full relative">
//       <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 text-[10px] font-mono bg-[#0B1120]/90 p-3 rounded-lg border border-slate-800 shadow-xl">
//         <div className="text-slate-400 mb-1 border-b border-slate-700 pb-1">AI ZONE STATUS</div>
//         <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#22c55e]"></span> Healthy</div>
//         <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#eab308]"></span> Moderate Stress</div>
//         <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#f97316]"></span> High Stress</div>
//         <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#ef4444]"></span> Critical</div>
//         <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#ef4444] animate-pulse"></span> Imminent Breakdown</div>
//       </div>
//       <svg ref={svgRef} className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"></svg>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function TopologyMap({ intelligence }: any) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !intelligence) return;
    const svg = d3.select(svgRef.current).attr("viewBox", "0 0 800 500");
    svg.selectAll("*").remove();

    // 1. Interlocking geographic coordinates forming a unified city map
    // IDs now match the ML Dataset "Predicted_Traffic_Class"
    const regions = [
      { id: "Hospital", label: "Hospital Zone", d: "M 100,100 L 300,80 L 350,220 L 150,280 Z", cx: 220, cy: 170 },
      { id: "Firefighter", label: "Fire & Rescue", d: "M 300,80 L 550,110 L 480,250 L 350,220 Z", cx: 420, cy: 160 },
      { id: "Ambulance", label: "Ambulance Dispatch", d: "M 350,220 L 480,250 L 450,400 L 320,380 Z", cx: 400, cy: 300 },
      { id: "Police", label: "Police Dept", d: "M 150,280 L 350,220 L 320,380 L 120,420 Z", cx: 230, cy: 320 },
      { id: "Social_Media", label: "Residential (Social)", d: "M 480,250 L 700,200 L 750,380 L 550,450 L 450,400 Z", cx: 580, cy: 310 },
      { id: "Entertainment", label: "Entertainment", d: "M 550,450 L 750,380 L 800,480 L 500,520 Z", cx: 650, cy: 450 },
      { id: "Public_Hub", label: "Public Broadcast", d: "M 120,420 L 320,380 L 450,400 L 550,450 L 500,520 L 200,500 Z", cx: 330, cy: 450 },
    ];

    const breakdown = intelligence.breakdown; // 0 to 99

    // 2. Strict 5-Color Logic Engine (Updated to match new IDs)
    const getColor = (id: string, bd: number) => {
      let state = "healthy"; // Default
      
      // Low Priority Zones break easily
      if (id === "Entertainment" || id === "Social_Media") {
        if (bd > 10) state = "moderate";
        if (bd > 30) state = "high_stress";
        if (bd > 50) state = "critical";
        if (bd > 70) state = "imminent";
      } 
      // Medium Priority Zone (Using Public_Hub as the fallback medium priority)
      else if (id === "Public_Hub") {
        if (bd > 20) state = "moderate";
        if (bd > 50) state = "high_stress";
        if (bd > 70) state = "critical";
        if (bd > 85) state = "imminent";
      } 
      // High Priority Zones (Hospital, Ambulance, Police, Firefighter) stay green longer
      else {
        if (bd > 40) state = "moderate";
        if (bd > 60) state = "high_stress";
        if (bd > 80) state = "critical";
        if (bd > 95) state = "imminent";
      }

      // Map state to EXACT colors requested
      switch (state) {
        case "healthy": return { fill: "#22c55e", stroke: "#166534", class: "", label: "HEALTHY" };       // Green
        case "moderate": return { fill: "#eab308", stroke: "#854d0e", class: "", label: "MODERATE" };      // Yellow
        case "high_stress": return { fill: "#f97316", stroke: "#9a3412", class: "", label: "HIGH STRESS" };// Orange
        case "critical": return { fill: "#ef4444", stroke: "#991b1b", class: "", label: "CRITICAL" };      // Red
        case "imminent": return { fill: "#ef4444", stroke: "#991b1b", class: "animate-pulse", label: "BREAKDOWN" }; // Flashing Red
        default: return { fill: "#22c55e", stroke: "#166534", class: "", label: "HEALTHY" };
      }
    };

    // 3. Draw the Map
    const mapGroup = svg.append("g").attr("transform", "translate(0, -20) scale(0.95)");

    const regionNodes = mapGroup.selectAll("g.region").data(regions).enter().append("g").attr("class", "region");

    regionNodes.append("path")
      .attr("d", d => d.d)
      .attr("fill", d => {
        const colorData = getColor(d.id, breakdown);
        // We use opacity over a dark background to make it look like a glowing sci-fi map
        return colorData.fill + "40"; // Adding hex opacity
      })
      .attr("stroke", d => getColor(d.id, breakdown).fill)
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("class", d => getColor(d.id, breakdown).class + " transition-colors duration-700");

    // Add labels
    regionNodes.append("text").attr("x", d => d.cx).attr("y", d => d.cy - 10).attr("text-anchor", "middle")
      .attr("font-size", "14px").attr("fill", "#f8fafc").attr("class", "font-mono font-bold tracking-widest")
      .text(d => d.label);
      
    // Add dynamic status text
    regionNodes.append("text").attr("x", d => d.cx).attr("y", d => d.cy + 10).attr("text-anchor", "middle")
      .attr("font-size", "12px").attr("fill", d => getColor(d.id, breakdown).fill).attr("class", "font-mono font-bold tracking-widest")
      .text(d => getColor(d.id, breakdown).label);

  }, [intelligence]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 text-[10px] font-mono bg-[#0B1120]/90 p-3 rounded-lg border border-slate-800 shadow-xl">
        <div className="text-slate-400 mb-1 border-b border-slate-700 pb-1">AI ZONE STATUS</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#22c55e]"></span> Healthy</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#eab308]"></span> Moderate Stress</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#f97316]"></span> High Stress</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#ef4444]"></span> Critical</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#ef4444] animate-pulse"></span> Imminent Breakdown</div>
      </div>
      <svg ref={svgRef} className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"></svg>
    </div>
  );
}