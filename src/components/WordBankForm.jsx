import { useState } from 'react'
import { Button } from "@nextui-org/react"
import { wordbanksAPI } from '../utils/wordbanks-api'

export default function WordBankForm({ context, setWordbanks }) {
    const [title, setTitle] = useState('')

    async function handleAddWordBank() {
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
            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <Button color="primary" onClick={handleAddWordBank}>Add Word Bank</Button>            
        </div>
    )
}
