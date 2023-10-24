import { useEffect, useState } from "react"
import { useGameState } from "./utils/GameContext"
import { useLocation, useOutletContext} from "react-router-dom"
import { useAuth } from "./auth/AuthContext"

export default function Game(){
    const  socket  = useOutletContext()
    const location = useLocation().pathname.split('/')[2]
    const { user } = useAuth()
    const {gameState, joinGame, gameID} = useGameState()
    // console.log(gameState, 'loading')
    // console.log(location)
    // console.log(socket)
    useEffect(()=>{
        console.log(gameState, "First gamestate")
        if(gameState == null){
            console.log('joining')
            joinGame([location, user, socket])
        } else {
            console.log('hit the else')
        }
    },[])

    return (
        <>
            <p>Hello game!</p>
            {gameState != null ? 
            <>
                <p>Hi</p>
                <p>Game: {gameID}</p>
                <p>Player One: {gameState.playerOne.name} has {gameState.playerOne.score} points</p>
                <p>{gameState.playerOne.sid}</p>
                {gameState.playerTwo != null ? 
                <>
                <p>Player Two: {gameState.playerTwo.name} has {gameState.playerTwo.score} points</p>
                <p>{gameState.playerTwo.sid}</p> 
                </>: null
                }
            </>: null }

        </>
    )
}