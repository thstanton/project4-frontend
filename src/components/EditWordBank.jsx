import { Button, Card, CardBody, CardFooter } from "@nextui-org/react"
import { useState } from "react"
import { wordbanksAPI } from "../utils/wordbanks-api"


export default function EditWordBank({ wordbank }) {
    const [showWordbank, setShowWordbank] = useState(true)
    const [title, setTitle] = useState(wordbank.title)
    const [words, setWords] = useState(wordbank.words)
    const [newWordsInput, setNewWordsInput] = useState('')

    async function handleUpdate() {
        const updatedWordbank = { ...wordbank, title: title }
        try {
            const response = await wordbanksAPI.singleBank(wordbank.id, 'PUT', updatedWordbank)
            console.log(response.status)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDelete() {
        try {
            const response = await wordbanksAPI.singleBank(wordbank.id, 'DELETE')
            console.log(response)
            setShowWordbank(false)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDeleteWord(id) {
        try {
            const response = await wordbanksAPI.singleWord(id, 'DELETE')
            if (response.status === 204) {
                const updatedWords = words.filter(word => word.id !== id)
                setWords(updatedWords) 
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function handleAddWords() {
        // Input new words as string
        // Convert them to a formatted array
        // Upload them to database
        // Fetch the word list
        const wordArr = newWordsInput.split(', ')
        const formattedWordArr = wordArr.map(word => ({ word: word, word_bank: wordbank.id }))
        console.log(formattedWordArr)
        try {
            const response = await wordbanksAPI.createWordList(formattedWordArr)
            if (response.status === 201) {
                setWords(prevWords => [...prevWords, ...response.data])
            } else {
                console.error(response)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {showWordbank &&
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Button onClick={handleUpdate}>Update Wordbank Title</Button>
                    <Button onClick={handleDelete}>Delete Wordbank</Button>

                    <input type="textarea" value={newWordsInput} onChange={e => setNewWordsInput(e.target.value)} />
                    <Button onClick={handleAddWords}>Add Words</Button>

                    {words.length && words.map(word => (
                        <Card key={word.id}>
                            <CardBody>
                                <h5>{word.word}</h5>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => handleDeleteWord(word.id)}>Delete Word</Button>
                            </CardFooter>
                        </Card>
                    ))
                    }
                </div>
            }
        </>
    )
}
