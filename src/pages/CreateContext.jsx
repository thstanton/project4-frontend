import { useState } from 'react'
import { Button } from "@nextui-org/react"
import ContextForm from '../components/ContextForm'
import ImageForm from '../components/ImageForm'
import WordBankForm from '../components/WordBankForm'
import { contextsAPI } from '../utils/contexts-api'
import { useNavigate } from 'react-router-dom'

export default function CreateContext() {
  const navigate = useNavigate()
  const [context, setContext] = useState({
    title: '',
    prompt: '',
    instructions: ''
  })
  const [wordbanks, setWordBanks] = useState([])
  const [images, setImages] = useState([])

  async function handleSubmit() {
    const newContext = {
      ...context,
      wordbanks: wordbanks,
      images: images
    }
    try {
      const response = await contextsAPI.create(newContext)
      if (response.status === 201) {
        console.log('Context created successfully')
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
      <ContextForm
        context={context}
        setContext={setContext}
      />
      <ImageForm
        images={images} 
        setImages={setImages}
      />
      <WordBankForm
        setWordbanks={setWordBanks}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}
