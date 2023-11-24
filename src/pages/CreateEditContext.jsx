import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { contextsAPI } from "../utils/contexts-api"
import ContextForm from "../components/ContextForm"
import { Button } from "@nextui-org/react"
import WordBankForm from "../components/WordBankForm"
import EditWordBank from "../components/EditWordBank"
import ImageForm from "../components/ImageForm"
import EditImage from "../components/EditImage"

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
          id: response.data.id,
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

  async function handleCreateOverview(e) {
    e.preventDefault()
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
        navigate('/contexts')
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
            handleCreateOverview={handleCreateOverview}
          />
          {context.id &&
            <>
              <Button color="warning" onClick={handleUpdateOverview}>Update Overview</Button>
              <Button color="danger" onClick={handleDeleteContext}>Delete Context</Button>
            </>
          }
        </div>
      }
      {context.id &&
        <>
          <div>
            {/* Word Banks - display current, form to add new */}
            <h1>Word Banks:</h1>
            { 
              wordbanks && wordbanks.length && wordbanks.map(wordbank => (
                <EditWordBank key={wordbank.id} wordbank={wordbank} />
              ))
            }
            <WordBankForm
              setWordbanks={setWordbanks}
              context={context}
            />
          </div>
          <div>
            {/* Images */}
            {
              images && images.length && images.map(image => (
                <EditImage 
                  key={image.id} 
                  image={image}
                  images={images}
                  setImages={setImages}  
                  context={context} 
                />
              ))
            }
            <h1>Images:</h1>
            <ImageForm
              images={images} 
              setImages={setImages}  
              context={context}
            />
          </div>
        </>
      }
    </div>
  )
}
