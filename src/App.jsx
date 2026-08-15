import { useEffect, useState } from "react";

function App() {
  const [aircraft, setAircraft] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://barbarossa.enzob.xyz/ws"
    );

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAircraft(data.aircraft || []);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onerror = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <main className="flight-board">
      <div className={`status ${connected ? "connected" : "disconnected"}`}>
        <span className="status-dot" />
        <span>
          {connected ? "connected" : "disconnected"}
        </span>
      </div>

      <div className="flights">
        {aircraft.map((flight) => (
          <div className="flight" key={flight.callsign}>
            <div className="callsign">
              {flight.callsign}
            </div>

            <div className="route">
              {flight.origin} - {flight.destination}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;