import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
export default function WithAuth(){
    const [x, setX] = useState(false)
    useEffect(()=>{
        async function auth(){
            const req = await fetch('/auth',{
                method: 'POST'
            })
            if(req.status===200){
               setX(true)
            } 
            }
        })
    return (
        x == true ? <Outlet/>:<Outlet/>
    )}
