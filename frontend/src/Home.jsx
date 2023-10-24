import { useAuth } from "./auth/AuthContext";
export default function Home() {
	const { user } = useAuth();
	return (
		<div className="home-container">
			{user ? <p>Hello {user.username}</p> : <p>Hello world!</p>}
		</div>
	);
}
