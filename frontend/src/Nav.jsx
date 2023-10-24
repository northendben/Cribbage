import { useAuth } from "./auth/AuthContext";
import { Link } from "react-router-dom";
import './Nav.css'
export default function Nav() {
	const { user, logOutUser } = useAuth();
	return (
		<div className="header">
			<Link to="/">
				Home
			</Link>
			<Link to="/anotherone">
				DJ...
			</Link>
			{user ? (
				<>
					{/* <Link to="/new-game" onClick={()=> window.location.href="/new-game"}>
						New Game
					</Link>
					<Link to="/join-game" onClick={()=> window.location.href="/join-game"}>
						Join Game
					</Link> */}
					<a href="/join-game">Join Game</a>
					<a href="/new-game">New Game</a>
                    <div className="user-action-container">
                    <button onClick={logOutUser}>Logout</button>
                    </div>
				</>
			) : (
				<>
                 <div className="user-action-container">
                    <Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
                 </div>

				</>
			)}
		</div>
	);
}
