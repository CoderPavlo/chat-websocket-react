# WebSocket Chat with Rooms

## Project Description

This project implements a chat application where users can create or join existing rooms to exchange messages in real time. Users can choose a name and avatar before entering a room and then chat with other users in that room.

### Features:
- Users can create a room or join an existing one.
- Display the list of online users in the room.
- Real-time text message exchange between users.
- Support for multiple independent rooms.
- Display users in the chat.

## Technology Stack

### Frontend (located in `client` folder)
- **React** (with TypeScript) — for building the user interface.
- **WebSocket** — for real-time communication between client and server.

### Backend (located in `server` folder)
- **Node.js** (with TypeScript) — server for handling WebSocket connections.
- **Socket.io** — library for WebSocket communication in Node.js.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/CoderPavlo/chat-websocket-react.git
cd chat-websocket-react
```
### 2. Install dependencies

#### For the server:

```bash
cd server
npm install
```
#### For the client:

```bash
cd ../client
npm install
```

### 3. Running the server and client

#### Server:

```bash
cd server
npm run dev
```

##### By default, the server will run on port 4000.



#### Client:

```bash
cd ../client
npm start
```

##### The client will run by default on port 3000. 

## Project Structure

### Server (in the `server` folder):
- `src/server.ts` — main server file for setting up WebSocket using Socket.io. and logic for managing rooms (creating, joining, and tracking active users).

### Client (in the `client` folder):
- `src/components` — React components for the user interface, including room creation, avatar selection, and chat display.
- `src/context` — context for managing user state and current room connection, configuration for the WebSocket client.

## Working with the Project

### Creating a Room:
1. Users choose a name and avatar.
2. On the main page, the user can create a new room by clicking the "Create Room" button.
3. Other users can join the room from the list of available rooms.

### Chatting:
1. After joining a room, users can see the list of online users and the chat area.
2. Messages are sent in real-time using WebSocket.

## License

This project is licensed under the MIT License.





