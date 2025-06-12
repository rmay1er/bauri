import "./App.css";
import { useState } from "react";
import { fetch } from "@tauri-apps/plugin-http";

function App() {
  const [apiUrl, setApiUrl] = useState("http://localhost:3001/api");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    setResponse("");
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.text();
      setResponse(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-auto bg-gradient-to-br from-zinc-600 to-zinc-900 flex flex-col items-center justify-center space-y-12">
      <div className="flex flex-row items-center justify-center space-x-6">
        <img src="/bun.svg" alt="logo" className="w-32 h-32" />
        <img src="/tauri.svg" alt="logo" className="w-32 h-32" />
        <img src="/react.svg" alt="logo" className="w-32 h-32" />
      </div>
      <div className="min-w-sm bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-white text-center">Bauri</h1>
        <div className="space-y-4">
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="Enter API URL"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white`}
          >
            {loading ? "Checking..." : "Check API"}
          </button>
          {error && (
            <div className="text-red-300 bg-red-900/30 p-3 rounded-lg">
              {error}
            </div>
          )}
          {response && (
            <div className="bg-black/30 p-4 rounded-lg overflow-auto max-h-60">
              <pre className="text-white text-sm">{response}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
