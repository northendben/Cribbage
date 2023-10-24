import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./auth/AuthContext"
export default function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const {user, registerUser} = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            console.log('it works how you think it works')
            navigate('/', { replace: true})
        }
    },[])

    function handleChange (e){
        if(e.target.id == 'password'){
            setPassword(e.target.value)
        } else if (e.target.id == "username"){
            setUsername(e.target.value)
        } else if (e.target.id == 'email'){
            setEmail(e.target.value)
        }
    }
    async function submitLogin () {
        const userInfo = {
            'username': username,
            'password': password,
            'email': email
        }
        registerUser(userInfo)    
    }
    return (
         <div className="login-container">
         <label htmlFor="username">Username</label>
         <input onChange={handleChange} type="text" name="username" id="username" value={username} />
         <label htmlFor="password">Password</label>
         <input onChange={handleChange} type="password" name="password" id="password" value={password} />
         <label htmlFor="email">Email</label>
         <input onChange={handleChange} type="email" name="email" id="email" value={email} />
         <button onClick={submitLogin} id="submit">Login</button>
     </div> 
    )
}