# Live Cursor Tracker

A real-time collaborative cursor tracking application that allows multiple users to see each other's cursor movements in a shared room. Built with React.js and Express.js, this project demonstrates WebSocket communication and smooth cursor interpolation techniques.

## Features

- **Real-time Cursor Tracking**: See all connected users' cursors moving in real-time
- **Smooth Movement**: Implements 50ms throttling and linear interpolation for fluid cursor animations
- **User Identification**: Each user joins with a unique username and distinct color
- **Single Shared Room**: All users connect to the same collaborative space
- **WebSocket Communication**: Low-latency bidirectional communication for instant updates

## Tech Stack

### Frontend
- **React.js**: Component-based UI library
- **WebSocket Client**: Real-time communication with the server

### Backend
- **Express.js**: Web application framework for Node.js
- **WebSocket (ws)**: WebSocket server implementation

## How It Works

1. **Connection**: Users enter a username and connect to the shared room
2. **Color Assignment**: Each user is assigned a distinct color for their cursor(10 colors)
3. **Throttling**: Mouse movements are throttled to 50ms intervals to reduce network traffic
4. **Interpolation**: Linear interpolation smoothens cursor movements between position updates
5. **Broadcasting**: The server broadcasts cursor positions to all connected clients via WebSockets




## Installation

Clone the repo and run these commands
```
  cd backend
  npm install 
```

  ```
    cd frontend
    npm install 
```
## Deployment

To deploy this project run this command on both frontend and backend 

```bash
  npm run dev
```

