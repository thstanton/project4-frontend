import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { contextsAPI } from '../utils/contexts-api'
import WordBanksContainer from '../components/WordBanksContainer'
import JotterInstructions from '../components/JotterInstructions'
import ContextClasses from '../components/ContextClasses'
import ContextJotterList from '../components/ContextJotterList'

export default function ContextView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [context, setContext] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await contextsAPI.single(id, 'GET')
        if (response.status === 200) {
          setContext(response.data)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [id])

  return (
    <div>
      { context && 
        <div className='container'>
          <div>
            <Button color="warning" onClick={() => navigate(`/contexts/${id}/edit`)}>Edit Context</Button>
            <JotterInstructions context={context} />
          </div>
          <div className='flex flex-row justify-stretch'>
            <WordBanksContainer 
              wordbanks={context.wordbanks} 
              complete={true}
            />
          </div>
          <div>
            <ContextClasses
              id={context.id} 
              classes={context.assigned_classes} 
              setContext={setContext} 
            />
          </div>
          <div>
            <ContextJotterList id={context.id} />
          </div>
        </div>
      }
    </div>
  )
}
