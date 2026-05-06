// // // import { useEffect, useRef } from "react";
// // // import * as d3 from "d3";
// // // import { Packet } from "../hooks/useTrafficStream";

// // // export default function NetworkGraph({ packets }: { packets: Packet[] }) {
// // //   const svgRef = useRef<SVGSVGElement>(null);

// // //   useEffect(() => {
// // //     if (!svgRef.current || packets.length === null) return;

// // //     // Define the dimensions of our "Radar" screen
// // //     const width = 800;
// // //     const height = 500;
// // //     const margin = 40;

// // //     const svg = d3.select(svgRef.current)
// // //       .attr("viewBox", `0 0 ${width} ${height}`)
// // //       .style("background", "transparent");

// // //     // The PyTorch model outputs coordinates normalized between -1 and 1.
// // //     // We map -1.2 to 1.2 to give the dots some padding from the edges.
// // //     const xScale = d3.scaleLinear().domain([-1.2, 1.2]).range([margin, width - margin]);
// // //     const yScale = d3.scaleLinear().domain([-1.2, 1.2]).range([height - margin, margin]);

// // //     // Color dictionary based on Traffic Category
// // //     const colorMap: Record<string, string> = {
// // //       "Streaming": "#3b82f6",     // Blue
// // //       "Standard Web": "#10b981",  // Green
// // //       "Emergency VoIP": "#ef4444" // Red
// // //     };

// // //     // 1. Draw Radar Grid Lines (only once)
// // //     if (svg.select("g.grid").empty()) {
// // //       const grid = svg.append("g").attr("class", "grid");
// // //       // Add crosshairs
// // //       grid.append("line").attr("x1", width/2).attr("y1", 0).attr("x2", width/2).attr("y2", height).attr("stroke", "#1e293b").attr("stroke-width", 2);
// // //       grid.append("line").attr("x1", 0).attr("y1", height/2).attr("x2", width).attr("y2", height/2).attr("stroke", "#1e293b").attr("stroke-width", 2);
// // //     }

// // //     // 2. Bind the data to SVG Circles
// // //     const nodes = svg.selectAll<SVGCircleElement, Packet>("circle.packet")
// // //       .data(packets, (d) => d.id); // Use the packet ID to track it uniquely!

// // //     // Ensure the AI actually gave us coordinates, otherwise default to 0,0
// // //     const getX = (p: Packet) => xScale(p.coordinates ? p.coordinates[0] : 0);
// // //     const getY = (p: Packet) => yScale(p.coordinates ? p.coordinates[1] : 0);

// // //     // 3. ENTER: When a new packet appears
// // //     nodes.enter()
// // //       .append("circle")
// // //       .attr("class", "packet")
// // //       .attr("r", 0) // Start invisible
// // //       .attr("cx", width / 2) // Start in center
// // //       .attr("cy", height / 2)
// // //       .attr("fill", (d) => colorMap[d.category] || "#ffffff")
// // //       .attr("opacity", 0.8)
// // //       // Transition to their AI-assigned coordinate
// // //       .transition().duration(200)
// // //       .attr("r", (d) => d.packet_size > 1000 ? 6 : 4) // Bigger packets = bigger dots
// // //       .attr("cx", getX)
// // //       .attr("cy", getY);

// // //     // 4. UPDATE: If a packet stays alive but its coordinates change
// // //     nodes.transition().duration(100)
// // //       .attr("cx", getX)
// // //       .attr("cy", getY);

// // //     // 5. EXIT: When a packet drops off the network
// // //     nodes.exit()
// // //       .transition().duration(150)
// // //       .attr("r", 0) // Shrink to nothing
// // //       .attr("opacity", 0)
// // //       .remove();

// // //   }, [packets]); // This hook runs every time the packets array updates!

// // //   return (
// // //     <div className="w-full h-full relative border border-brand-border bg-[#020202] rounded-lg overflow-hidden shadow-inner">
// // //       <svg ref={svgRef} className="w-full h-full"></svg>
      
// // //       {/* Legend overlays */}
// // //       <div className="absolute top-4 right-4 bg-brand-panel/80 border border-brand-border p-3 rounded text-xs flex flex-col gap-2 backdrop-blur-sm">
// // //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Streaming</div>
// // //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Standard Web</div>
// // //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div> Emergency VoIP</div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useRef } from "react";
// // import * as d3 from "d3";
// // import { Packet } from "../hooks/useTrafficStream";

// // export default function NetworkGraph({ packets }: { packets: Packet[] }) {
// //   const svgRef = useRef<SVGSVGElement>(null);

// //   useEffect(() => {
// //     if (!svgRef.current || packets.length === 0) return;

// //     const width = 800;
// //     const height = 500;
// //     const margin = 40;

// //     const svg = d3.select(svgRef.current)
// //       .attr("viewBox", `0 0 ${width} ${height}`);

// //     const xScale = d3.scaleLinear().domain([-1.2, 1.2]).range([margin, width - margin]);
// //     const yScale = d3.scaleLinear().domain([-1.2, 1.2]).range([height - margin, margin]);

// //     const colorMap: Record<string, string> = {
// //       "Streaming": "#3b82f6",     // Blue
// //       "Standard Web": "#10b981",  // Green
// //       "Emergency VoIP": "#ef4444" // Red
// //     };

// //     // --- MAGIC HAPPENS HERE: The SVG Fluid/Contour Filter ---
// //     if (svg.select("defs").empty()) {
// //       const defs = svg.append("defs");
// //       const filter = defs.append("filter").attr("id", "gooey-contour");
      
// //       // Blur the dots
// //       filter.append("feGaussianBlur")
// //         .attr("in", "SourceGraphic")
// //         .attr("stdDeviation", "12") // Increase this to make the contours thicker
// //         .attr("result", "blur");
        
// //       // Increase contrast to solidify the blurred edges into sharp contours
// //       filter.append("feColorMatrix")
// //         .attr("in", "blur")
// //         .attr("mode", "matrix")
// //         .attr("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9")
// //         .attr("result", "gooey");
        
// //       // Overlay the original dots slightly for core visibility
// //       filter.append("feBlend")
// //         .attr("in", "SourceGraphic")
// //         .attr("in2", "gooey");
// //     }

// //     // Grid lines for the radar look
// //     if (svg.select("g.grid").empty()) {
// //       const grid = svg.append("g").attr("class", "grid");
// //       grid.append("line").attr("x1", width/2).attr("y1", 0).attr("x2", width/2).attr("y2", height).attr("stroke", "#1e293b").attr("stroke-width", 1);
// //       grid.append("line").attr("x1", 0).attr("y1", height/2).attr("x2", width).attr("y2", height/2).attr("stroke", "#1e293b").attr("stroke-width", 1);
// //     }

// //     // We wrap the dots in a group <g> and apply the contour filter to the whole group
// //     let dotGroup = svg.select<SVGGElement>("g.dot-group");
// //     if (dotGroup.empty()) {
// //       dotGroup = svg.append("g").attr("class", "dot-group").style("filter", "url(#gooey-contour)");
// //     }

// //     // Bind data
// //     const nodes = dotGroup.selectAll<SVGCircleElement, Packet>("circle.packet")
// //       .data(packets, (d) => d.id);

// //     const getX = (p: Packet) => xScale(p.coordinates ? p.coordinates[0] : 0);
// //     const getY = (p: Packet) => yScale(p.coordinates ? p.coordinates[1] : 0);

// //     // Enter
// //     nodes.enter()
// //       .append("circle")
// //       .attr("class", "packet")
// //       .attr("r", 0)
// //       .attr("cx", width / 2)
// //       .attr("cy", height / 2)
// //       .attr("fill", (d) => colorMap[d.category] || "#ffffff")
// //       .transition().duration(350)
// //       .attr("r", (d) => d.packet_size > 1000 ? 15 : 10) // Made dots larger to enhance the contour melting effect
// //       .attr("cx", getX)
// //       .attr("cy", getY);

// //     // Update
// //     nodes.transition().duration(350)
// //       .attr("cx", getX)
// //       .attr("cy", getY);

// //     // Exit
// //     nodes.exit()
// //       .transition().duration(200)
// //       .attr("r", 0)
// //       .remove();

// //   }, [packets]);

// //   return (
// //     <div className="w-full h-full relative bg-[#050505] rounded-lg overflow-hidden shadow-inner border border-slate-800">
// //       <svg ref={svgRef} className="w-full h-full"></svg>
      
// //       {/* Legend overlays */}
// //       <div className="absolute top-4 right-4 bg-[#0F172A]/80 border border-slate-700 p-3 rounded text-xs flex flex-col gap-2 backdrop-blur-md text-slate-200">
// //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Normal Streaming</div>
// //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Web Traffic</div>
// //         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_red]"></div> High Priority (VoIP)</div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { contourDensity } from "d3-contour";
// import { Packet } from "../hooks/useTrafficStream";

// export default function NetworkGraph({ packets, disasterState }: { packets: Packet[], disasterState: string }) {
//   const svgRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (!svgRef.current || packets.length === 0) return;

//     const width = 800;
//     const height = 500;
//     const margin = 40;

//     const svg = d3.select(svgRef.current)
//       .attr("viewBox", `0 0 ${width} ${height}`);

//     // Clear previous renders cleanly
//     svg.selectAll("*").remove();

//     // Map AI output bounds (-1 to 1) to screen space
//     const xScale = d3.scaleLinear().domain([-1.2, 1.2]).range([margin, width - margin]);
//     const yScale = d3.scaleLinear().domain([-1.2, 1.2]).range([height - margin, margin]);

//     // 1. Calculate Density Contours (The CFD Effect)
//     // We separate packets by category so we can color their pressure zones differently
//     const categories = ["Streaming", "Standard Web", "Emergency VoIP"];
    
//     // Define our fluid color scales
//     const colorScales = {
//       "Streaming": d3.scaleLinear<string>().domain([0, 0.1]).range(["#050505", "rgba(59, 130, 246, 0.6)"]), // Blue
//       "Standard Web": d3.scaleLinear<string>().domain([0, 0.1]).range(["#050505", "rgba(16, 185, 129, 0.6)"]), // Green
//       "Emergency VoIP": d3.scaleLinear<string>().domain([0, 0.1]).range(["#050505", "rgba(239, 68, 68, 0.8)"]) // Red
//     };

//     categories.forEach(category => {
//       const categoryPackets = packets.filter(p => p.category === category);
//       if (categoryPackets.length === 0) return;

//       // The magic math: computes topographic layers based on point density
//       const densityData = contourDensity<Packet>()
//         .x(d => xScale(d.coordinates ? d.coordinates[0] : 0))
//         .y(d => yScale(d.coordinates ? d.coordinates[1] : 0))
//         .size([width, height])
//         .bandwidth(30) // Controls the 'blur' or spread of the fluid
//         .thresholds(8) // Number of contour layers
//         (categoryPackets);

//       const group = svg.append("g").attr("class", `contour-${category.replace(/\s+/g, '-')}`);

//       // Draw the fluid layers
//       group.selectAll("path")
//         .data(densityData)
//         .enter().append("path")
//         .attr("d", d3.geoPath())
//         .attr("fill", d => colorScales[category as keyof typeof colorScales](d.value))
//         .attr("stroke", d => colorScales[category as keyof typeof colorScales](d.value))
//         .attr("stroke-width", 1)
//         .attr("stroke-linejoin", "round")
//         .style("opacity", 0)
//         .transition().duration(400)
//         .style("opacity", 1);
//     });

//     // 2. Draw Core Nodes (Optional: keeps a small intense dot at the very center of mass)
//     svg.append("g")
//       .selectAll("circle")
//       .data(packets)
//       .enter().append("circle")
//       .attr("cx", d => xScale(d.coordinates ? d.coordinates[0] : 0))
//       .attr("cy", d => yScale(d.coordinates ? d.coordinates[1] : 0))
//       .attr("r", 2)
//       .attr("fill", "#ffffff")
//       .attr("opacity", 0.4);

//   }, [packets, disasterState]);

//   return (
//     <div className="w-full h-full relative bg-[#050505] rounded-lg overflow-hidden shadow-inner border border-slate-800">
//       <svg ref={svgRef} className="w-full h-full"></svg>
      
//       {/* Legend overlays */}
//       <div className="absolute top-4 right-4 bg-[#0F172A]/80 border border-slate-700 p-3 rounded text-xs flex flex-col gap-2 backdrop-blur-md text-slate-200">
//         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500/60 border border-blue-500"></div> Normal Traffic Zone</div>
//         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500/60 border border-green-500"></div> Web Traffic Zone</div>
//         <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500/80 border border-red-500 shadow-[0_0_8px_red]"></div> Emergency Overload Zone</div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { contourDensity } from "d3-contour";
import { Packet } from "../hooks/useTrafficStream";

export default function NetworkGraph({ packets, disasterState }: { packets: Packet[], disasterState: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || packets.length === 0) return;

    const width = 800;
    const height = 500;
    const margin = 40;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Clear previous renders cleanly
    svg.selectAll("*").remove();

    // Map AI output bounds (-1 to 1) to screen space
    const xScale = d3.scaleLinear().domain([-1.2, 1.2]).range([margin, width - margin]);
    const yScale = d3.scaleLinear().domain([-1.2, 1.2]).range([height - margin, margin]);

    const categories = ["Streaming", "Standard Web", "Emergency VoIP"];

    categories.forEach(category => {
      const categoryPackets = packets.filter(p => p.category === category);
      if (categoryPackets.length < 3) return; // Need at least 3 points to draw a contour

      // 1. Calculate Density Contours (The CFD Effect)
      const densityData = contourDensity<Packet>()
        .x(d => xScale(d.coordinates ? d.coordinates[0] : 0))
        .y(d => yScale(d.coordinates ? d.coordinates[1] : 0))
        .size([width, height])
        .bandwidth(35) // Controls the 'blur' or spread of the fluid
        .thresholds(10) // Number of contour layers
        (categoryPackets);

      // 2. DYNAMIC SCALING: Find the highest density peak so colors always show up
      const maxDensity = d3.max(densityData, d => d.value) || 0.01;

      // 3. Create the specific color fluid map based on the category
      let colorScale: d3.ScaleLinear<string, string>;
      if (category === "Streaming") {
        colorScale = d3.scaleLinear<string>().domain([0, maxDensity]).range(["#050505", "rgba(59, 130, 246, 0.7)"]); // Blue
      } else if (category === "Standard Web") {
        colorScale = d3.scaleLinear<string>().domain([0, maxDensity]).range(["#050505", "rgba(16, 185, 129, 0.7)"]); // Green
      } else {
        colorScale = d3.scaleLinear<string>().domain([0, maxDensity]).range(["#050505", "rgba(239, 68, 68, 0.8)"]); // Red
      }

      const group = svg.append("g").attr("class", `contour-${category.replace(/\s+/g, '-')}`);

      // Draw the fluid layers
      group.selectAll("path")
        .data(densityData)
        .enter().append("path")
        .attr("d", d3.geoPath())
        .attr("fill", d => colorScale(d.value))
        .attr("stroke", d => colorScale(d.value))
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .style("opacity", 0)
        .transition().duration(400)
        .style("opacity", 1);
    });

    // 2. Draw Core Nodes inside the fluid
    svg.append("g")
      .selectAll("circle")
      .data(packets)
      .enter().append("circle")
      .attr("cx", d => xScale(d.coordinates ? d.coordinates[0] : 0))
      .attr("cy", d => yScale(d.coordinates ? d.coordinates[1] : 0))
      .attr("r", 2)
      .attr("fill", "#ffffff")
      .attr("opacity", 0.4);

  }, [packets, disasterState]);

  return (
    <div className="w-full h-full relative bg-[#050505] rounded-lg overflow-hidden shadow-inner border border-slate-800">
      <svg ref={svgRef} className="w-full h-full"></svg>
      
      {/* Legend overlays */}
      <div className="absolute top-4 right-4 bg-[#0F172A]/80 border border-slate-700 p-3 rounded text-xs flex flex-col gap-2 backdrop-blur-md text-slate-200">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500/60 border border-blue-500"></div> Normal Traffic Zone</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500/60 border border-green-500"></div> Web Traffic Zone</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500/80 border border-red-500 shadow-[0_0_8px_red]"></div> Emergency Overload Zone</div>
      </div>
    </div>
  );
}