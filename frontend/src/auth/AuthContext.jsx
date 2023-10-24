import { createContext, useState, useEffect, useContext } from "react";
import Layout from "../Layout/Layout";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
    const [error, setError] = useState(false)

	useEffect(() => {
		checkUserStatus();
	}, []);

	const loginUser = async (userInfo) => {
		setLoading(true);
		try {
			const req = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username: userInfo.username,
					password: userInfo.password
				})
			});
			if (req.status === 200) {
				const data = await req.json()
                console.log(data)
				setUser({username: data.User });
			} else {
				setUser(false);
			}
		} catch (error) {
			console.log(error);
		}
        setLoading(false);
	};

	const checkUserStatus = async () => {
		try {
			const req = await fetch("/api/auth", {
				method: "POST"
			});
			if (req.status === 200) {
                const data = await req.json()
                console.log(data)
				setUser({username: data.User });
			} else {
				setUser(false);
			}
		} catch (error) {
			setError(true)
		}
		setLoading(false);
	};

	const logOutUser = async () => {
		setLoading(true);
		try {
			const req = await fetch("/api/logout", {
				method: "POST",
				headers: {
					"Content-Type": "appplication/json"
				}
			});
			if (req.status === 200) {
				setUser(false);
			}
		} catch (error) {
			setError(true)
		}
        setLoading(false);
	};

    const registerUser = async (userInfo) =>{
        setLoading(true)
        try {
            const req = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userInfo.username,
                    password: userInfo.password,
                    email: userInfo.email
                })
            })
            if(req.status === 200){
                const data = await req.json()
				console.log(data)
				setUser({username: data.User });
            }
        } catch (error){
            setError(true)
        }
        setLoading(false)
    }

	const contextData = {
		user,
		loginUser,
		logOutUser,
        registerUser,
        error
	};
	return (
		<AuthContext.Provider value={contextData}>
			{loading ? <p>Loading...</p> : <Layout>{children}</Layout>}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
export default AuthContext;
