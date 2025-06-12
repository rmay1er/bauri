# Bauri

A Tauri desktop application template with a backend powered by Bun and Hono.
This template demonstrates how to build a Tauri app where the backend server is implemented in Bun (JavaScript runtime),
instead of the default Rust backend. It provides a minimal example of integration
between Bun backend and a React + Tauri frontend.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Setup and Development](#setup-and-development)
5. [Building for Production](#building-for-production)
6. [Project Structure](#project-structure)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

This project uses:

- **Tauri** as the desktop app framework.
- **Bun** as the backend server runtime (replaces Rust backend).
- **Hono** for the backend HTTP framework running on Bun.
- **React** for the frontend UI.
- **Tailwind CSS** for styling.
- **Tauri Plugins** for process management and HTTP requests.

The backend Bun server runs alongside the Tauri process, started automatically on app launch.

---

## Architecture

- `src/backend/server.ts` — Bun backend server using Hono framework serving API routes.
- `src/main.tsx` — React app entry point that also spawns the Bun backend process via Tauri Shell plugin.
- `src/App.tsx` — React frontend with UI to interact with backend API.
- `src-tauri/tauri.conf.json` — Tauri configuration specifying bundling and commands for Bun backend.

---

## Prerequisites

- Node.js (for frontend dependencies and tooling)
- Bun (for running backend server)
- Tauri prerequisites (Rust toolchain, Cargo, system dependencies) — see [Tauri docs](https://tauri.app) for platform specific instructions.

---

## Setup and Development

1. Clone the repository.

2. Install frontend dependencies:

```sh
bun install
```

3. Start the development server:

```sh
bun tauri dev
```

This runs:

- Vite dev server and Bun backend started automatically by Tauri's shell plugin.

---

## Building for Production

To build the app for production:

```sh
bun tauri build
```

This runs:

- TypeScript compilation
- Vite frontend build
- Bun backend build and compiles the Bun server binary
- Bundles everything into a Tauri app

---

## Usage

- Launch the app.
- The Bun backend server starts automatically via Tauri shell sidecar.
- Use the frontend input field to specify your API url (default: `http://localhost:3001/api`).
- Click **Check API** button to fetch data from Bun backend.
- See response or error message in frontend UI.

---

## Contributing

Contributions are welcome. Please open issues or submit PRs for bugs or features.

---

## License

This project is licensed under the MIT License.
