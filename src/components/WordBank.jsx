

export default function WordBank({ wordbank, body, setBody }) {
    function handleAddWord(word) {
        setBody(`${body} ${word}`)
    }
    return (
        <div>
            <h1>{wordbank.title}</h1>
            {wordbank.words.map((word, idx) => (
                <div key={idx} onClick={() => handleAddWord(word.word)}>{word.word}</div>
            ))}
        </div>
    )
}
