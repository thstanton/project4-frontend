import { useEffect, useState } from 'react'
import { jottersAPI } from '../utils/jotters-api'
import { useNavigate, useParams } from 'react-router-dom'
import JotterEditor from '../components/JotterEditor'
import WordBanksContainer from '../components/WordBanksContainer'
import JotterInstructions from '../components/JotterInstructions'
import { Button } from "@nextui-org/react"
import Modal from '../components/Modal'

export default function PupilEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [context, setContext] = useState()
  const [body, setBody] = useState()
  const [complete, setComplete] = useState()
  const [wordbanks, setWordbanks] = useState()
  const [showFinishModal, setShowFinishModal] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const finishModalText = 'You will not be able to make more changes. Are you sure?'
  const clearModalText = 'This jotter will be reset. Are you sure?'
  const deleteModalText = 'Your writing will be deleted. Are you sure?'

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
        console.error(err)
      }
    }
    fetchData()
  }, [])

  // Update the jotter on the database
  function updateJotter(isComplete) {
    const jotterBody = {
      body: body,
      complete: isComplete
    }
    return jottersAPI.single(id, 'PUT', jotterBody)
  }

  // Save and return home
  async function handleSave() {
    try {
      const response = await updateJotter(false)
      if (response.status === 200) {
        navigate("/")
      } else {
        console.error('Something went wrong')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Mark jotter as complete, save and return home
  async function handleComplete() {
    setComplete(true)
    try {
      const response = await updateJotter(true)
      if (response.status === 200) {
        navigate("/")
      } else {
        console.error('Something went wrong')
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Reset the body to the initial prompt, save
  async function handleStartAgain() {
    setBody(context.prompt)
    setShowClearModal(false)
    try {
      const response = await updateJotter(false)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete the jotter, return to pupil home page
  async function handleDelete() {
    try {
      const response = await jottersAPI.single(id, 'DELETE')
      if (response.status === 204) {
        navigate("/")
      } else {
        console.error('Something went wrong')
      }
    } catch (err) {
      console.error(err)
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
            <JotterEditor 
              body={body} 
              setBody={setBody} 
              complete={complete} 
            />
          </div>
          <div className='flex flex-row justify-stretch'>
              <WordBanksContainer 
                wordbanks={wordbanks} 
                body={body} 
                setBody={setBody} 
                complete={complete}
              />
          </div>
          <div className='flex flex-row gap-1.5'>
              <h1 className='text-2xl font-bold'>Controls:</h1>
              <Button 
                onClick={handleSave} 
                isDisabled={complete}
                color="primary"
              >
                Save
              </Button>
              <Button 
                onClick={() => setShowFinishModal(true)} 
                isDisabled={complete}
                color='success'
              >
                Finish
              </Button>
              <Button 
                onClick={() => setShowClearModal(true)} 
                isDisabled={complete}
                color='warning'
              >
                Start Again
              </Button>
              <Button 
                onClick={() => setShowDeleteModal(true)} 
                isDisabled={complete}
                color='danger'
              >
                Delete
              </Button>
            </div>
            { showFinishModal &&
              <Modal
                cardText={finishModalText}
                confirmAction={handleComplete}
                cancelAction={setShowFinishModal}
              />
            }
            { showClearModal && 
              <Modal
                cardText={clearModalText}
                confirmAction={handleStartAgain}
                cancelAction={setShowClearModal}
              />
            }
            { showDeleteModal && 
              <Modal
                cardText={deleteModalText}
                confirmAction={handleDelete}
                cancelAction={setShowDeleteModal}
              />
            }
        </>
      }
    </div>
  )
}
