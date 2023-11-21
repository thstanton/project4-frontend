import { Button } from "@nextui-org/react"

export default function WordBank({ wordbank, body, setBody, complete }) {
    function handleAddWord(word) {
        setBody(`${body} ${word}`)
    }
    return (
        <div>
            <h1 className="text-2xl">{wordbank.title}</h1>
            <div className="flex flex-row flex-wrap gap-4">
                {wordbank.words.map((word, idx) => (
                    <Button
                        key={idx}
                        onClick={() => handleAddWord(word.word)}
                        isDisabled={complete}
                        className="
                            bg-blue 
                            rounded-md 
                            text-2xl 
                            p-8
                            shadow-lg
                            "
                    >
                        {word.word}
                    </Button>
                ))}
            </div>
        </div>
    )
}
