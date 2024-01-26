import WordBank from "./WordBank";

export default function WordBanksContainer({
  wordbanks,
  body,
  setBody,
  complete,
}) {
  return (
    <div className="mb-3">
      <h1 className="text-3xl font-bold mb-3">Word Banks</h1>
      <div className="flex flex-row gap-3">
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
  );
}
