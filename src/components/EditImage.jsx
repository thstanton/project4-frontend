import { useState } from "react";
import { wordbanksAPI } from "../utils/wordbanks-api";

export default function EditImage({ image, images, setImages }) {
  const [showImage, setShowImage] = useState(true);
  const [url, setUrl] = useState(image.url);

  async function handleUpdate() {
    const updatedImage = { ...image, url: url };
    try {
      const response = await wordbanksAPI.singleImage(
        image.id,
        "PUT",
        updatedImage,
      );
      const updatedIndex = images.findIndex((i) => i.id === response.data.id);
      if (response.status === 200) {
        const newImages = [...images];
        newImages[updatedIndex] = response.data;
        setImages(newImages);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete() {
    try {
      const response = await wordbanksAPI.singleImage(image.id, "DELETE");
      if (response.status === 204) setShowImage(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {showImage && (
        <div>
          <div className="card">
            <div className="card-body">
              <img src={image.url} alt="" />
            </div>
          </div>
          <label>Image URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="btn" onClick={handleUpdate}>
            Update Image
          </button>
          <button className="btn" onClick={handleDelete}>
            Delete Image
          </button>
        </div>
      )}
    </>
  );
}
