import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useGameState } from "./utils/GameContext"
import { useAuth } from "./auth/AuthContext"

export default function JoinGame(){
    const { gameState, gameID, joinGame } = useGameState()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [gameToJoin, setGameToJoin] = useState('')
    const socket = useOutletContext()

    function handleChange (e){
        setGameToJoin(e.target.value)
    }

    function handleJoin () {
        joinGame([gameToJoin, user, socket])
    }
    useEffect(()=>{
        if(gameID){
            navigate(`/game/${gameID}`)
        }
    }, [])

    return (
        <>
        <label htmlFor="gameid">Enter Game ID</label>
        <input type="text" name="gameid" id="gameid" value={gameToJoin} onChange={handleChange} />
        <button id="joinGame" onClick={handleJoin}>Join Game</button>
        </>
    )
}
