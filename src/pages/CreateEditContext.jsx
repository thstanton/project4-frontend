import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { contextsAPI } from "../utils/contexts-api"
import ContextForm from "../components/ContextForm"
import { Button } from "@nextui-org/react"
import WordBankForm from "../components/WordBankForm"
import EditWordBank from "../components/EditWordBank"

export default function CreateEditContext() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [context, setContext] = useState({
    title: '',
    prompt: '',
    instructions: ''
  })
  const [wordbanks, setWordbanks] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await contextsAPI.single(id, 'GET')
        setContext({
          title: response.data.title,
          prompt: response.data.prompt,
          instructions: response.data.instructions
        })
        setWordbanks(response.data.wordbanks)
        setImages(response.data.images)
      } catch (err) {
        console.error(err)
      }
    }
    
    if (id) fetchData()
  }, [id])

  async function handleCreateOverview() {
    try {
      const response = await contextsAPI.create(context)
      if (response.status === 201) {
        setContext(response.data)
      } else {
        console.error(response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleUpdateOverview() {
    try {
      const response = await contextsAPI.single(id, 'PUT', context)
      if (response.status === 200) {
        setContext(response.data)
      } else {
        console.error(response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteContext() {
    try {
      const response = await contextsAPI.single(id, 'DELETE')
      if (response.status === 204) {
        navigate('/')
      } else {
        console.error(response)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {context &&
        <div>
          <h1>Context Overview:</h1>
          <ContextForm
            context={context}
            setContext={setContext}
          />
          {!context.id ?
            <Button onClick={handleCreateOverview}>Create Overview</Button>
            :
            <>
              <Button onClick={handleUpdateOverview}>Update Overview</Button>
              <Button onClick={handleDeleteContext}>Delete Context</Button>
            </>
          }
        </div>
      }
      {context.id &&
        <>
          <div>
            {/* Word Banks - display current, form to add new */}
            <WordBankForm
              setWordbanks={setWordbanks}
              context={context}
            />
            { 
              wordbanks && wordbanks.length && wordbanks.map(wordbank => (
                <EditWordBank key={wordbank.id} wordbank={wordbank} />
              ))
            }
          </div>
          <div>
            {/* Images */}
          </div>
        </>
      }
    </div>
  )
}
