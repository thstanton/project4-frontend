import { useState } from "react";
import { wordbanksAPI } from "../utils/wordbanks-api";

export default function EditWordBank({ wordbank }) {
  const [showWordbank, setShowWordbank] = useState(true);
  const [title, setTitle] = useState(wordbank.title);
  const [words, setWords] = useState(wordbank.words);
  const [newWordsInput, setNewWordsInput] = useState("");

  async function handleUpdate() {
    const updatedWordbank = { ...wordbank, title: title };
    try {
      await wordbanksAPI.singleBank(wordbank.id, "PUT", updatedWordbank);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      const response = await wordbanksAPI.singleBank(wordbank.id, "DELETE");
      if (response.status === 204) setShowWordbank(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteWord(id) {
    try {
      const response = await wordbanksAPI.singleWord(id, "DELETE");
      if (response.status === 204) {
        const updatedWords = words.filter((word) => word.id !== id);
        setWords(updatedWords);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddWords() {
    // Input new words as string
    // Convert them to a formatted array
    // Upload them to database
    // Fetch the word list
    const wordArr = newWordsInput.split(", ");
    const formattedWordArr = wordArr.map((word) => ({
      word: word,
      word_bank: wordbank.id,
    }));
    console.log(formattedWordArr);
    try {
      const response = await wordbanksAPI.createWordList(formattedWordArr);
      if (response.status === 201) {
        setWords((prevWords) => [...prevWords, ...response.data]);
      } else {
        console.error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {showWordbank && (
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn" onClick={handleUpdate}>
            Update Wordbank Title
          </button>
          <button className="btn" onClick={handleDelete}>
            Delete Wordbank
          </button>
          <label>
            Add words to the word bank separated by commas and spaces (eg.
            monkey, banana)
          </label>
          <input
            type="textarea"
            value={newWordsInput}
            onChange={(e) => setNewWordsInput(e.target.value)}
          />
          <button className="btn" onClick={handleAddWords}>
            Add Words
          </button>

          {words.length &&
            words.map((word) => (
              <div className="card" key={word.id}>
                <div className="card-body">
                  <h5>{word.word}</h5>
                </div>
                <div className="card-actions">
                  <button
                    className="btn"
                    onClick={() => handleDeleteWord(word.id)}
                  >
                    Delete Word
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
