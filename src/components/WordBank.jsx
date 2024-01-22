export default function WordBank({ wordbank, body, setBody, complete }) {
  function handleAddWord(word) {
    setBody(`${body} ${word}`);
  }
  return (
    <div>
      <h1 className="text-2xl">{wordbank.title}</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {wordbank.words.map((word, idx) => (
          <button
            key={idx}
            onClick={() => handleAddWord(word.word)}
            className={"rounded-md bg-blue p-8 text-2xl shadow-lg " + complete ? "btn-disabled" : ""}
          >
            {word.word}
          </button>
        ))}
      </div>
    </div>
  );
}
