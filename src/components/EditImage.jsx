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
        <div className="card card-bordered card-side mb-3">
          <figure className="">
            <img src={image.url} alt="" className="w-60 h-60 object-cover"/>
          </figure>
          <div className="card-body">
            <h1 className="font-bold text-lg">Edit Image:</h1>
            <label>Image URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="textarea textarea-bordered mb-3"
            />
            <div className="mb-3 flex justify-end gap-2">
              <button className="btn btn-warning" onClick={handleDelete}>
                Delete Image
              </button>
              <button className="btn btn-success" onClick={handleUpdate}>
                Update Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
