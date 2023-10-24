import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { io } from 'socket.io-client';
const PrivateRoutes = ({socket}) => {
    const { user } = useAuth()
    const username = user.username
    socket.emit('update user', username);
    return user ? <Outlet context={socket}/> : <Navigate to='/login'/>
}

export default PrivateRoutes