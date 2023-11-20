import { useState } from 'react'
import { login } from '../utils/auth'


export default function PupilLogin({ setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const credentials = {
            username: username,
            password: password
        }
        try {
            const user = await login(credentials)
            console.log(user)
            setUser(user)
        } catch {
            setError('Log In Failed - Try Again')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <p className="error-message">&nbsp;{error}</p>
        </>
    )
}
