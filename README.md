# StreamFusion
StreamFusion is a web application that combines elements of Twitch and YouTube, focused on showcasing advanced media technologies. It's a platform where users can:

1. Watch live streams from various platforms
2. Search and watch recorded videos
3. Discover new content through a featured section
4. Experience seamless transitions between live and recorded content

## Getting Started
This project was built with [create-vite-app](https://vite.dev/guide/) under the React + TypeScript template that provides a minimal setup to get React working in Vite with HMR and some ESLint rules. This project uses the latest version, React v19.

### Available Scripts
If you wish to run this locally, here are the available scripts.
```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build locally
npm run preview
```

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query
- **Styling**: SASS
- **UI Components**: Custom components with Lucide React icons

### Backend Integration
- **APIs**:
  - Twitch API for live streaming content
  - YouTube API for video content integration
  - Custom media handling endpoints

### Libraries
- **Media Technologies**:
  - Video.js (v8.22.0) - Base video player framework
  - HLS.js (v1.6.2) - HTTP Live Streaming support
  - Shaka Player (v4.14.9) - Adaptive streaming capabilities
  - VideoJS HTTP Streaming (v3.17.0) - Enhanced streaming support
- **State Management**:
  - Redux Toolkit (v2.7.0) - Global state management
  - React Redux (v9.2.0) - React bindings for Redux
  - TanStack React Query (v5.74.4) - Server state management
- **Development Tools**:
  - TypeScript (v5.7.2) - Static typing
  - ESLint (v9.22.0) - Code linting
  - SASS (v1.87.0) - Advanced CSS preprocessing# streamFusion
