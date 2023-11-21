import { useEffect, useState } from 'react'
import { jottersAPI } from '../utils/jotters-api'
import { useNavigate, useParams } from 'react-router-dom'
import JotterEditor from '../components/JotterEditor'
import WordBanksContainer from '../components/WordBanksContainer'
import JotterInstructions from '../components/JotterInstructions'
import { Button } from "@nextui-org/react"

export default function PupilEditor() {
  const { id } = useParams()
  const [context, setContext] = useState()
  const [body, setBody] = useState()
  const [complete, setComplete] = useState()
  const [wordbanks, setWordbanks] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await jottersAPI.single(id, 'GET')
        const data = response.data

        if (data) {
          setContext(data.context)
          setComplete(data.complete)
          setWordbanks(data.context.wordbanks)

          data.body ? setBody(data.body) : setBody(data.context.prompt)
        }
      } catch (err) {
        throw new Error(err)
      }
    }
    fetchData()
  }, [])

  // Update the jotter on the database, return to pupil home page
  async function handleSave() {
    const jotterBody = {
      body: body,
      complete: complete
    }
    try {
      const response = await jottersAPI.single(id, 'PUT', jotterBody)
      console.log(response)
    } catch (err) {
      throw new Error(err)
    }
  }

  // Mark jotter as complete, then call handleSave()
  async function handleComplete() {
    setComplete(true)
    handleSave()
  }

  // Reset the body to the initial prompt
  async function handleStartAgain() {
    setBody(context.prompt)
    handleSave()
  }

  // Delete the jotter, return to pupil home page
  async function handleDelete() {
    try {
      const response = await jottersAPI.single(id, 'DELETE')
      console.log(response)
      navigate("/")
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <div>
      { context && body && wordbanks && 
        <>
          <div>
            <JotterInstructions context={context} />
          </div>
          <div>
            <JotterEditor body={body} setBody={setBody} />
          </div>
          <div>
            <WordBanksContainer wordbanks={wordbanks} body={body} setBody={setBody} />
          </div>
          <div>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleComplete}>Finish</Button>
            <Button onClick={handleStartAgain}>Start Again</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </>
      }
    </div>
  )
}
