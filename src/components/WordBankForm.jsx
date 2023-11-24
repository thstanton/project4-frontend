import { useState } from 'react'
import { Button } from "@nextui-org/react"
import { wordbanksAPI } from '../utils/wordbanks-api'

export default function WordBankForm({ context, setWordbanks }) {
    const [title, setTitle] = useState('')

    async function handleAddWordBank(e) {
        e.preventDefault()
        const newWordBank = {
            title: title,
            context: context.id
        }
        try {
            const response = await wordbanksAPI.createBank(newWordBank)
            if (response.status === 201) {
                setWordbanks(prevWordbanks => [...prevWordbanks, response.data])
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>Add Word Bank:</h2>
            <form onSubmit={handleAddWordBank}>
                <label>Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
                <Button color="primary" type='submit'>Add Word Bank</Button>
            </form>
        </div>
    )
}
