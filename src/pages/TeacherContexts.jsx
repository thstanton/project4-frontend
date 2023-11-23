import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { contextsAPI } from '../utils/contexts-api'
import TeacherContextCardList from '../components/TeacherContextCardList'

export default function TeacherContexts() {
  const [contexts, setContexts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await contextsAPI.own()
        if (response.status === 200) {
          setContexts(response.data)
          setDataLoaded(true)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div>
        <Link to='/contexts/create' color='success'><Button>Create new context</Button></Link>
      </div>
      <div>
        { dataLoaded ? 
          <TeacherContextCardList contexts={contexts} />
        :
          <p>Loading...</p>
        }
        
      </div>
    </div>
  )
}
