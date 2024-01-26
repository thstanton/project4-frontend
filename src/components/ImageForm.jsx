import { useState } from "react";
import { wordbanksAPI } from "../utils/wordbanks-api";

export default function ImageForm({ context, setImages, images }) {
  const [url, setUrl] = useState("");

  async function handleAddImage(e) {
    e.preventDefault();

    const newImage = {
      url: url,
      context: context.id,
    };
    try {
      const response = await wordbanksAPI.createImage(newImage);
      if (response.status === 201) {
        setImages((prevImages) => [...prevImages, response.data]);
        setUrl("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card card-bordered">
      <div className="card-body">
        <h2 className="text-lg font-bold">Add Image:</h2>
        <form onSubmit={handleAddImage}>
          <label>URL:</label>
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            className="input input-bordered mb-3 w-full"
            required
          />
          <div className="flex justify-end">
            <button className="btn btn-success" type="submit">
              Add Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
