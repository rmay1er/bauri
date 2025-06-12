import { Hono } from "hono";
import { serve } from "bun";

const app = new Hono();

app.get("/api", (c) => c.text("Helo from Bun + Hono Backend!"));

const server = serve({
  port: 3001,
  fetch: app.fetch,
});

console.log(`Listening on http://${server.url.host}`);
