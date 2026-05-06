// // import { useState, useEffect, useRef, useCallback } from "react";

// // // 1. Define the shapes of our AI-generated data
// // export interface Packet {
// //   id: string;
// //   category: string;
// //   rtt: number;
// //   jitter: number;
// //   packet_size: number;
// //   coordinates: [number, number]; // The X, Y from your PyTorch model!
// // }

// // export interface TrafficStreamState {
// //   networkState: string;
// //   severity: number;
// //   livePackets: Packet[];
// //   isConnected: boolean;
// // }

// // export function useTrafficStream() {
// //   // 2. React State to hold the live data
// //   const [networkState, setNetworkState] = useState<string>("NORMAL");
// //   const [severity, setSeverity] = useState<number>(1);
// //   const [livePackets, setLivePackets] = useState<Packet[]>([]);
// //   const [isConnected, setIsConnected] = useState<boolean>(false);
  
// //   // Ref to hold the WebSocket connection so it doesn't drop during re-renders
// //   const ws = useRef<WebSocket | null>(null);

// //   // 3. Establish the WebSocket Connection
// //   useEffect(() => {
// //     // Connect to the FastAPI backend
// //     ws.current = new WebSocket("ws://localhost:8000/ws/stream");

// //     ws.current.onopen = () => {
// //       console.log("🟢 Connected to Live Traffic Stream");
// //       setIsConnected(true);
// //     };
    
// //     ws.current.onmessage = (event) => {
// //       try {
// //         const data = JSON.parse(event.data);
// //         // Update our React state with the fresh Python data (10x a second)
// //         setNetworkState(data.system_status);
// //         setLivePackets(data.flows);
// //         // We don't overwrite severity here unless you want the backend to force it
// //       } catch (err) {
// //         console.error("Failed to parse WebSocket data:", err);
// //       }
// //     };

// //     ws.current.onclose = () => {
// //       console.log("🔴 Disconnected from stream");
// //       setIsConnected(false);
// //     };

// //     // Cleanup: Close connection if the user leaves the page
// //     return () => {
// //       ws.current?.close();
// //     };
// //   }, []);

// //   // 4. REST API Commands (Wrapped in useCallback for performance)
// //   const triggerDisaster = useCallback(async (disasterType: string, level: number) => {
// //     setSeverity(level); // Update UI immediately
// //     try {
// //       await fetch("http://localhost:8000/api/trigger", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ disaster_type: disasterType, severity: level }),
// //       });
// //     } catch (err) {
// //       console.error("Failed to trigger disaster:", err);
// //     }
// //   }, []);

// //   const resetNetwork = useCallback(async () => {
// //     setSeverity(1);
// //     try {
// //       await fetch("http://localhost:8000/api/reset", {
// //         method: "POST",
// //       });
// //     } catch (err) {
// //       console.error("Failed to reset network:", err);
// //     }
// //   }, []);

// //   // 5. Expose these variables and functions to your UI
// //   return {
// //     networkState,
// //     severity,
// //     livePackets,
// //     isConnected,
// //     triggerDisaster,
// //     resetNetwork,
// //     setSeverity // Allow the UI slider to update this locally before hitting the trigger button
// //   };
// // }

// import { useState, useEffect, useRef, useCallback } from "react";

// export interface Packet {
//   id: string;
//   category: string;
//   rtt: number;
//   jitter: number;
//   packet_size: number;
//   coordinates: [number, number];
// }

// // 1. Add this new interface to define our complex payload
// export interface DisasterPayload {
//   type: string;
//   severity: number;
//   infraDamage: number;
//   trafficSurge: number;
//   emergencyPriority: boolean;
//   trafficSource: string;
// }

// export function useTrafficStream() {
//   const [networkState, setNetworkState] = useState<string>("NORMAL");
//   const [severity, setSeverity] = useState<number>(1);
//   const [livePackets, setLivePackets] = useState<Packet[]>([]);
//   const [isConnected, setIsConnected] = useState<boolean>(false);
//   const ws = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     ws.current = new WebSocket("ws://localhost:8000/ws/stream");

//     ws.current.onopen = () => {
//       console.log("🟢 Connected to Live Traffic Stream");
//       setIsConnected(true);
//     };
    
//     ws.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         setNetworkState(data.system_status);
//         setLivePackets(data.flows);
//       } catch (err) {
//         console.error("Failed to parse WebSocket data:", err);
//       }
//     };

//     ws.current.onclose = () => {
//       setIsConnected(false);
//     };

//     return () => {
//       ws.current?.close();
//     };
//   }, []);

//   // 2. Update the trigger function to accept the full payload
//   const triggerDisaster = useCallback(async (payload: DisasterPayload) => {
//     setSeverity(payload.severity); 
//     try {
//       await fetch("http://localhost:8000/api/trigger", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // 3. Map the frontend camelCase to the backend snake_case
//         body: JSON.stringify({ 
//           disaster_type: payload.type, 
//           severity: payload.severity,
//           infra_damage: payload.infraDamage,
//           traffic_surge: payload.trafficSurge,
//           emergency_priority: payload.emergencyPriority,
//           traffic_source: payload.trafficSource
//         }),
//       });
//     } catch (err) {
//       console.error("Failed to trigger disaster:", err);
//     }
//   }, []);

//   const resetNetwork = useCallback(async () => {
//     setSeverity(1);
//     try {
//       await fetch("http://localhost:8000/api/reset", { method: "POST" });
//     } catch (err) {
//       console.error("Failed to reset network:", err);
//     }
//   }, []);

//   const intelligence = {
//     resilience: Math.max(12, 98 - (severity * 8)),
//     breakdown: Math.min(99, severity * 9),
//     survivability: severity > 7 ? "CRITICAL" : severity > 4 ? "MODERATE" : "STABLE",
//     emergencyChannels: severity > 1 ? severity * 3 : 2,
//     failedNodes: severity > 3 ? severity * 2 - 4 : 0,
//     confidence: Math.max(45, 95 - (severity * 4)),
//     timer: severity > 6 ? `0${10-severity}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} REMAINING` : "STABLE",
//     alerts: severity > 5 
//       ? ["⚠ Congestion rising in East Zone", "🚨 Tower failure predicted", "⚠️ Packet loss exceeding 15%"] 
//       : severity > 2 
//       ? ["🚑 Emergency traffic detected", "📡 Load balancing engaged"] 
//       : ["✅ Network operating normally"],
//     decisions: severity > 4 
//       ? ["✓ Streaming traffic throttled", "✓ Emergency channels stabilized", "✓ AI rerouting activated"] 
//       : ["✓ Normal routing active", "✓ QoS policies enforced"],
//     zones: [
//       { name: "Hospital Zone", status: severity > 8 ? "Moderate" : "Stable" },
//       { name: "Residential Area", status: severity > 5 ? "Critical" : severity > 2 ? "Moderate" : "Stable" },
//       { name: "Drone Comm", status: severity > 6 ? "Critical" : "Stable" },
//     ]
//   };

//   return {
//     networkState,
//     severity,
//     livePackets,
//     isConnected,
//     triggerDisaster,
//     resetNetwork,
//     setSeverity,
//     intelligence
//   };
// }

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export interface Packet { id: string; category: string; rtt: number; jitter: number; packet_size: number; coordinates: [number, number]; }
export interface DisasterPayload { type: string; severity: number; infraDamage: number; trafficSurge: number; emergencyPriority: boolean; trafficSource: string; }

export function useTrafficStream() {
  const [networkState, setNetworkState] = useState<string>("NORMAL");
  // Slider state
  const [severity, setSeverity] = useState<number>(1);
  // The actual simulation state (only updates on button click)
  const [appliedSeverity, setAppliedSeverity] = useState<number>(1);
  const [livePackets, setLivePackets] = useState<Packet[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/stream");
    ws.current.onopen = () => setIsConnected(true);
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNetworkState(data.system_status);
        setLivePackets(data.flows);
      } catch (err) {}
    };
    ws.current.onclose = () => setIsConnected(false);
    return () => ws.current?.close();
  }, []);

  const triggerDisaster = useCallback(async (payload: DisasterPayload) => {
    // 1. Lock in the new severity only when the button is clicked!
    setAppliedSeverity(payload.severity); 
    setNetworkState("DISASTER");
    
    try {
      await fetch("http://localhost:8000/api/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disaster_type: payload.type, severity: payload.severity }),
      });
    } catch (err) { console.error(err); }
  }, []);

  const resetNetwork = useCallback(async () => {
    setSeverity(1);
    setAppliedSeverity(1);
    setNetworkState("NORMAL");
    try { await fetch("http://localhost:8000/api/reset", { method: "POST" }); } catch (err) {}
  }, []);

  // AI Logic is now bound to APPLIED severity, not the slider directly
  const intelligence = useMemo(() => {
    return {
      resilience: Math.max(12, 98 - (appliedSeverity * 8)),
      breakdown: Math.min(99, appliedSeverity * 10),
      survivability: appliedSeverity > 7 ? "CRITICAL" : appliedSeverity > 4 ? "MODERATE" : "STABLE",
      emergencyChannels: appliedSeverity > 1 ? appliedSeverity * 3 : 2,
      failedNodes: appliedSeverity > 3 ? appliedSeverity * 2 - 4 : 0,
      confidence: Math.max(45, 95 - (appliedSeverity * 4)),
      timer: appliedSeverity > 6 ? `0${10-appliedSeverity}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} REMAINING` : "STABLE",
      alerts: appliedSeverity > 5 ? ["⚠ Congestion rising in East Zone", "🚨 Tower failure predicted"] : appliedSeverity > 2 ? ["🚑 Emergency traffic detected"] : ["✅ Network operating normally"],
      decisions: appliedSeverity > 4 ? ["✓ Streaming traffic throttled", "✓ AI rerouting activated"] : ["✓ Normal routing active"],
      zones: [
        { name: "Hospital Zone", status: appliedSeverity > 8 ? "Moderate" : "Stable" },
        { name: "Residential Area", status: appliedSeverity > 5 ? "Critical" : appliedSeverity > 2 ? "Moderate" : "Stable" },
        { name: "Drone Comm", status: appliedSeverity > 6 ? "Critical" : "Stable" },
      ]
    };
  }, [appliedSeverity]);

  return { networkState, severity, livePackets, isConnected, triggerDisaster, resetNetwork, setSeverity, intelligence };
}