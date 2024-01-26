import { useState } from "react";
import { wordbanksAPI } from "../utils/wordbanks-api";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
        setNewWordsInput("");
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
        <div className="card card-bordered mb-3">
          <div className="card-body">
            <h1 className="font-bold text-lg mb-3">Edit Wordbank:</h1>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered mb-3 w-full"
            />
            <div className="mb-3 flex justify-end gap-2">
              <button className="btn btn-warning" onClick={handleDelete}>
                Delete Wordbank
              </button>
              <button className="btn btn-success" onClick={handleUpdate}>
                Update Wordbank Title
              </button>
            </div>
            <p>Words:</p>
            <div className="mb-3 flex flex-wrap justify-start gap-2">
              {words.length &&
                words.map((word) => (
                  <div
                    className="badge badge-info badge-lg cursor-pointer"
                    key={word.id}
                    onClick={() => handleDeleteWord(word.id)}
                  >
                    <div className="card-body items-center p-2">
                      <h5 className="flex items-center gap-2">
                        {word.word}{" "}
                        <IoIosCloseCircleOutline className="inline" />
                      </h5>
                    </div>
                  </div>
                ))}
            </div>
            <label>
              Add words to the word bank separated by commas and spaces (eg.
              monkey, banana)
            </label>
            <input
              type="textarea"
              value={newWordsInput}
              onChange={(e) => setNewWordsInput(e.target.value)}
              className="textarea textarea-bordered mb-3 w-full"
            />
            <div className="flex justify-end">
              <button className="btn btn-success mb-3" onClick={handleAddWords}>
                Add Words
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
