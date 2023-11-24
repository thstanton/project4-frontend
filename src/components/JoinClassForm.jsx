import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { getUser } from '../utils/auth'
import { classesAPI } from '../utils/classes-api'

export default function JoinClassForm({ setShowJoinClass, setUser }) {
    const [accessKey, setAccessKey] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const key = { key: accessKey }
        try {
            const response = await classesAPI.join(key)
            
            if (response.status === 201) {
                const updatedUser = await getUser()
                setUser(updatedUser)
                setShowJoinClass(false)
            }
                  
        } catch (err) {
            console.error(err)
            setErrorMessage('Something went wrong, please try again.')
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>Join class:</h1>
            <label>Enter the key given to you by your teacher:</label>
            <input type="text" value={accessKey} onChange={e => setAccessKey(e.target.value)} required/>
            <Button type="submit">Submit</Button>
        </form>
        { errorMessage && <p>{errorMessage}</p> }
    </div>
  )
}
