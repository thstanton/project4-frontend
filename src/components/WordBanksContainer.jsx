import WordBank from "./WordBank"

export default function WordBanksContainer({ wordbanks, body, setBody }) {
  return (
    <>
    { wordbanks.map(wordbank => (
        <WordBank wordbank={wordbank} body={body} setBody={setBody} />
    ))}
    </>
  )
}
