import { useState, useEffect, useRef, useCallback } from "react";

// 1. Define the shapes of our AI-generated data
export interface Packet {
  id: string;
  category: string;
  rtt: number;
  jitter: number;
  packet_size: number;
  coordinates: [number, number]; // The X, Y from your PyTorch model!
}

export interface TrafficStreamState {
  networkState: string;
  severity: number;
  livePackets: Packet[];
  isConnected: boolean;
}

export function useTrafficStream() {
  // 2. React State to hold the live data
  const [networkState, setNetworkState] = useState<string>("NORMAL");
  const [severity, setSeverity] = useState<number>(1);
  const [livePackets, setLivePackets] = useState<Packet[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  // Ref to hold the WebSocket connection so it doesn't drop during re-renders
  const ws = useRef<WebSocket | null>(null);

  // 3. Establish the WebSocket Connection
  useEffect(() => {
    // Connect to the FastAPI backend
    ws.current = new WebSocket("ws://localhost:8000/ws/stream");

    ws.current.onopen = () => {
      console.log("🟢 Connected to Live Traffic Stream");
      setIsConnected(true);
    };
    
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Update our React state with the fresh Python data (10x a second)
        setNetworkState(data.system_status);
        setLivePackets(data.flows);
        // We don't overwrite severity here unless you want the backend to force it
      } catch (err) {
        console.error("Failed to parse WebSocket data:", err);
      }
    };

    ws.current.onclose = () => {
      console.log("🔴 Disconnected from stream");
      setIsConnected(false);
    };

    // Cleanup: Close connection if the user leaves the page
    return () => {
      ws.current?.close();
    };
  }, []);

  // 4. REST API Commands (Wrapped in useCallback for performance)
  const triggerDisaster = useCallback(async (disasterType: string, level: number) => {
    setSeverity(level); // Update UI immediately
    try {
      await fetch("http://localhost:8000/api/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disaster_type: disasterType, severity: level }),
      });
    } catch (err) {
      console.error("Failed to trigger disaster:", err);
    }
  }, []);

  const resetNetwork = useCallback(async () => {
    setSeverity(1);
    try {
      await fetch("http://localhost:8000/api/reset", {
        method: "POST",
      });
    } catch (err) {
      console.error("Failed to reset network:", err);
    }
  }, []);

  // 5. Expose these variables and functions to your UI
  return {
    networkState,
    severity,
    livePackets,
    isConnected,
    triggerDisaster,
    resetNetwork,
    setSeverity // Allow the UI slider to update this locally before hitting the trigger button
  };
}