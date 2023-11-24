import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { jottersAPI } from '../utils/jotters-api'

export default function JotterView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [jotter, setJotter] = useState({
    id: '',
    author: {
      id: '',
      username: "",
      first_name: "",
      pupil_classes: [],
      groups: []
    },
    context: {
      id: '',
      title: "",
      prompt: "",
      instructions: "",
      author: "",
      wordbanks: [],
      images: []
    },
    body: "",
    complete: ""
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await jottersAPI.single(id, 'GET')

        if (response.status === 200) {
          setJotter(response.data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [id])

  async function handleUpdate() {
    const updated = {
      ...jotter,
      complete: false
    }
    try {
      const response = await jottersAPI.single(id, 'PUT', updated)
      if (response.status === 200) {
        setJotter(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      { jotter.id ?
      <div>
        <div>
          <h1>{jotter.author.first_name}'s Jotter</h1>
          <h2>{jotter.context.title}</h2>
          <p>{jotter.context.instructions}</p>
        </div>
        <div>
          <p>{jotter.body}</p>
        </div>
        <div>
          <Button 
            onClick={handleUpdate}
            disabled={!jotter.complete}
            color="primary"
          >
            Send back to {jotter.author.first_name}
          </Button>
          <Button 
            onClick={() => navigate(-1)}
            color="default"
          >
            Back
          </Button>
        </div>
      </div>
      :
      <p>Loading...</p>
      }
    </div>
  )
}
