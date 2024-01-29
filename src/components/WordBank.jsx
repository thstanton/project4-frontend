export default function WordBank({ wordbank, body, setBody, complete }) {
  function handleAddWord(word) {
    setBody(`${body} ${word}`);
  }
  return (
    <div className="rounded-lg border-2 p-6">
      <h1 className="mb-3 text-2xl">{wordbank.title}</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {wordbank.words.map((word, idx) => (
          <button
            key={idx}
            onClick={() => handleAddWord(word.word)}
            className={"rounded-md bg-blue-400 p-4 text-2xl drop-shadow-md "}
          >
            {word.word}
          </button>
        ))}
      </div>
    </div>
  );
}
