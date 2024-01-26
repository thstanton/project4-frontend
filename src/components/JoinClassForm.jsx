import { useState } from "react";
import { getUser } from "../utils/auth";
import { classesAPI } from "../utils/classes-api";

export default function JoinClassForm({ setShowJoinClass, setUser }) {
  const [accessKey, setAccessKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const key = { key: accessKey };
    try {
      const response = await classesAPI.join(key);

      if (response.status === 201) {
        const updatedUser = await getUser();
        setUser(updatedUser);
        setShowJoinClass(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong, please try again.");
    }
  }
  return (
    <div className="card card-bordered">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-3 text-lg font-bold">Join class:</h1>
          <label>Enter the key given to you by your teacher:</label>
          <input
            type="text"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            className="input input-bordered mb-3 w-full"
            required
          />
          <div className="flex justify-end">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}
