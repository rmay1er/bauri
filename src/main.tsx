import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Command, Child } from "@tauri-apps/plugin-shell";
import { listen } from "@tauri-apps/api/event";

function Root() {
  const serverProcess = useRef<Child | null>(null);

  useEffect(() => {
    const startServer = async () => {
      try {
        serverProcess.current = await Command.sidecar("backend/server").spawn();
        console.log(
          "Server started successfully with PID",
          serverProcess.current.pid,
        );
      } catch (e) {
        console.error("Failed to start server:", e);
      }
    };

    startServer();

    const unlisten = listen("close-requested", async () => {
      if (serverProcess.current) {
        try {
          await serverProcess.current.kill();
          console.log("Server process killed");
        } catch (e) {
          console.error("Failed to kill server process:", e);
        }
      }
    });

    return () => {
      if (serverProcess.current) {
        serverProcess.current.kill().catch((e) => {
          console.error("Failed to kill server process on unmount:", e);
        });
      }
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Root />,
);
