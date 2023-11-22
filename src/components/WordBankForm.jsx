import { useState } from 'react'
import { Button } from "@nextui-org/react"

export default function WordBankForm({ setWordbanks }) {
    const [title, setTitle] = useState('')
    const [wordsInput, setWordsInput] = useState('')
    const [words, setWords] = useState([])

    function handleWordsEntry(e) {
        setWordsInput(e.target.value)
        const wordsArr = e.target.value.split(', ')
        setWords(wordsArr)
    }

    function handleAddWordBank() {
        const wordObjArr = words.map(word => ({ word: word }))
        const newWordBank = {
            title: title,
            words: wordObjArr
        }
        setWordbanks(prevWordbanks => [...prevWordbanks, newWordBank])
        setTitle('')
        setWordsInput('')
        setWords([])
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
            <label>Words (separate with commas):</label>
            <input
                type="textarea"
                onChange={handleWordsEntry}
                value={wordsInput}
            />
            <Button onClick={handleAddWordBank}>Add Word Bank</Button>
        </div>
    )
}
