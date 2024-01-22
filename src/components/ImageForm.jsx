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
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Add Image:</h2>
      <form onSubmit={handleAddImage}>
        <label>URL:</label>
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          required
        />
        <button className="btn" type="submit">
          Add Image
        </button>
      </form>
    </div>
  );
}
