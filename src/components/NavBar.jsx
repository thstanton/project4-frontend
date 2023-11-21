import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import { Button } from '@nextui-org/react'

export default function NavBar({ user, setUser }) {
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        setUser(null)
        navigate('/')
    }

    return (
        <div className={ user && user.groups[0] === 1 ? 'bg-yellow' : 'bg-blue' }>
            <nav className='flex items-center justify-between p-4'>
                <div className='text-white text-5xl font-display'><Link to="/" className='text-white'>Jotter</Link></div>
                {user && user.groups[0] === 1 ?
                    // Teacher Nav Bar
                    <div className='space-x-4'>
                        <Link to="/">Classes</Link>
                        <Link to="/contexts">Contexts</Link>
                        Teacher: {user.first_name}
                        <Button onClick={handleLogout} color='danger'>Log Out</Button>
                    </div>
                    : user && user.groups[0] === 2 ?
                        // Pupil Nav Bar
                        <div className='space-x-4'>
                            Pupil: {user.first_name}
                            <Button onClick={handleLogout} color='danger'>Log Out</Button>
                        </div>
                        :
                        // Unlogged In User Nav Bar
                        <div className='space-x-4'>
                            Log in to continue
                        </div>
                }
            </nav>
        </div>
    )
}
