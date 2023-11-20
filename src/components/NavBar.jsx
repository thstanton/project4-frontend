import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../utils/auth'

export default function NavBar({ user, setUser }) {
    function handleLogout() {
        logout()
        setUser(null)
    }

    return (
        <nav>
            <h1><Link to="/">JOTTER</Link></h1>
            { user && user.groups[0] === 1 ?
            // Teacher Nav Bar
                <>
                    <Link to="/">Classes</Link>
                    <Link to="/contexts">Contexts</Link>
                    { user.first_name }
                    <button onClick={handleLogout}>Log Out</button>
                </>
            : user && user.groups[0] === 2 ?
            // Pupil Nav Bar
                <>
                    { user.first_name }
                    <button onClick={handleLogout}>Log Out</button>
                </>
            :
            // Unlogged In User Nav Bar
                <>
                </>
            }
        </nav>
    )
}
