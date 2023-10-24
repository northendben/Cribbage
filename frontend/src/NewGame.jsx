import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useGameState } from "./utils/GameContext";

export default function NewGame (){
    const { gameState, gameID, createNewGame } = useGameState()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const socket = useOutletContext()

    function handleGame (){
        createNewGame([user,socket])
    }
    
    useEffect(()=>{
        if(gameID){
            navigate(`/game/${gameID}`)
        }
    }, [gameState])
    return (
        <>
        {error ? <p>Something went wrong. Please refresh and try again.</p>:   <button onClick={handleGame} id="NewGameButton">Start New Game</button> }
        </>
    )
}