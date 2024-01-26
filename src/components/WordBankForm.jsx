import { useState } from "react";
import { wordbanksAPI } from "../utils/wordbanks-api";

export default function WordBankForm({ context, setWordbanks }) {
  const [title, setTitle] = useState("");

  async function handleAddWordBank(e) {
    e.preventDefault();
    const newWordBank = {
      title: title,
      context: context.id,
    };
    try {
      const response = await wordbanksAPI.createBank(newWordBank);
      if (response.status === 201) {
        setWordbanks((prevWordbanks) => [...prevWordbanks, response.data]);
        setTitle("")
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card card-bordered mb-3">
      <div className="card-body">
        <h2 className="mb-3 text-lg font-bold">Add Word Bank:</h2>
        <form onSubmit={handleAddWordBank}>
          <label>Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="input input-bordered mb-3 w-full"
            required
          />
          <div className="flex justify-end">
            <button className="btn btn-success" type="submit">
              Add Word Bank
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
