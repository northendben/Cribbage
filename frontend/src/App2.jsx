import { Routes, Route, Link, Navigate, Router } from "react-router-dom";
import "./App.css";
import LoginForm from "./LoginForm";
import PrivateRoutes from "./PrivateRoutes";
import { AuthProvider } from "./auth/AuthContext";
import Register from "./Register";
import Home from "./Home";
import NewGame from "./NewGame";
import Game from "./Game";
import { GameProvider } from "./utils/GameContext";
import { io } from "socket.io-client";
import JoinGame from "./JoinGame";
const url = 'http://localhost:5000'
const socket = io(url,{
    auth: {
        username: null
    }
});

function App() {

	return (
		<AuthProvider>
			{/* <SocketProvider> */}
			<GameProvider socket={socket}>
				{/* <Nav/> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/anotherone" element={<p>DJ KHALED</p>} />
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<Register />} />
					<Route element={<PrivateRoutes socket={socket} />}>
						<Route path="/new-game" element={<NewGame />} />
						<Route path="/game/:id" element={<Game />} />
						<Route path="/join-game" element={<JoinGame/>} />
					</Route>
				</Routes>
			</GameProvider>
			{/* </SocketProvider> */}
		</AuthProvider>
	);
}

export default App;
