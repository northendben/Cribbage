import { createContext, useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";

const GameContext = createContext();

export const GameProvider = ({ socket, children }) => {
	const [loading, setLoading] = useState(false);
	const [gameState, setGameState] = useState(null);
	const [gameID, setGameID] = useState(null);
	const [error, setError] = useState(null);
    socket.on('update game', (gameState) =>{
        console.log('HI FROM THE SOCKET')
        setGameState(gameState)
    })
	const createNewGame = async ([user, socket]) => {
		setLoading(true);
		try {
			const req = await fetch("/api/game/create", {
				method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: user, socket: socket.id})
			});
			const data = await req.json();
			if (req.status === 200) {
				setGameID(data.gameState.id);
				setGameState(data.gameState);
                setLoading(false)
			} else {
				setError(data.message);
			}
            socket.emit('update room', data.gameState.id )
            socket.emit('update game',data.gameState)
		} catch (error) {
			console.log(error);
		}
	};

    const joinGame = async ([id, user, socket]) =>{
        setLoading(true)
        try {
            const req = await fetch("/api/game/join", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id, user: user, socket:socket.id})
            })            
            const data = await req.json()
            if(req.status === 200){
                setGameID(data.gameState.id);
				setGameState(data.gameState);
                setLoading(false)
            } else{
                setError(data.message);
            }
            socket.emit('update room', data.gameState.id )
            socket.emit('update game',data.gameState)
        } catch (error){
            console.log(error)
        }
        setLoading(false)
    }

	const contextData = {
		gameState,
		gameID,
        createNewGame,
        joinGame
	};
	return (
		<GameContext.Provider value={contextData}>
			{loading ? <p>Loading...</p> : children }
		</GameContext.Provider>
	);
};
export const useGameState = () => {
	return useContext(GameContext);
};

export default GameContext;
