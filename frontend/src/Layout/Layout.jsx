import React from 'react'
import Nav from '../Nav'
import './layout.css'

export default function Layout({children}){
    return (
        <div className="main-container">
            <Nav/>
            {children}
        </div>
    )
}