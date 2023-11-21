import WordBank from "./WordBank"

export default function WordBanksContainer({ wordbanks, body, setBody, complete }) {
  return (
    <div>
      <h1 className="font-bold text-3xl">
        Word Banks
      </h1>
      <div className="flex flex-row">
        {wordbanks.map((wordbank, idx) => (
          <WordBank
            key={idx}
            wordbank={wordbank}
            body={body}
            setBody={setBody}
            complete={complete}
          />
        ))}
      </div>
    </div>
  )
}
