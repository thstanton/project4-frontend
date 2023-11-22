import { Button } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { contextsAPI } from '../utils/contexts-api'
import ContextCardList from '../components/ContextCardList'

export default function TeacherContexts() {
  const [contexts, setContexts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await contextsAPI.own()
        if (response.status === 200) setContexts(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])
  return (
    <div>
      <div>
        <Link to='/contexts/create'><Button>Create new context</Button></Link>
      </div>
      <div>
        <ContextCardList contexts={contexts} />
      </div>
    </div>
  )
}
