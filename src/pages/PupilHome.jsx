import { useEffect, useState } from 'react'
import { jottersAPI } from '../utils/jotters-api'
import { contextsAPI } from '../utils/contexts-api'
import JotterCardList from '../components/JotterCardList'
import ContextCardList from '../components/ContextCardList'
import PupilUserInfo from '../components/PupilUserInfo'

export default function PupilHome() {
  const [contexts, setContexts] = useState(null)
  const [unfinished, setUnfinished] = useState(null)
  const [finished, setFinished] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const contextsData = await contextsAPI.getAssigned()
        const unfinishedData = await jottersAPI.unfinished()
        const finishedData = await jottersAPI.finished()

        setContexts(contextsData.data)
        setUnfinished(unfinishedData.data)
        setFinished(finishedData.data)

      } catch (err) {

        throw new Error(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='container'>
      <PupilUserInfo />
      <div>
        <h1 className='font-display text-3xl'>To Do List</h1>
        { contexts && <ContextCardList contexts={ contexts } /> }
      </div>
      <div>
        <h1 className='font-display text-3xl'>To Finish</h1>
        { unfinished && <JotterCardList jotters={ unfinished } /> }
      </div>
      <div>
        <h1 className='font-display text-3xl'>My Library</h1>
        { finished && <JotterCardList jotters={ finished } /> }
      </div>
    </div>
  )
}
