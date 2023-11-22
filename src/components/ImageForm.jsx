import { useState } from 'react'
import { Button } from '@nextui-org/react'

export default function ImageForm({ images, setImages }) {
    const [newImageURL, setNewImageURL] = useState('')

    function handleAddImage() {
        const newImageObj = {
            url: newImageURL
        }
        setImages(prevImages => [...prevImages, newImageObj])
        setNewImageURL('')
    }
  return (
    <div>
        <h2>Add Images:</h2>
        <label>URL:</label>
        <input
          type="text"
          value={newImageURL}
          onChange={e => setNewImageURL(e.target.value)}
        />
        <Button 
            onClick={handleAddImage} 
            isDisabled={images && images.length >= 3}
        >
            Add Image
        </Button>
        { images && images.length >= 3 && <p>Maximum number of images reached</p> }
    </div>
  )
}
