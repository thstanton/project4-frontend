import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TeacherHome from './pages/TeacherHome'
import TeacherContexts from './pages/TeacherContexts'
import ContextView from './pages/ContextView'
import CreateEditContext from './pages/CreateEditContext'
import PupilView from './pages/PupilView'
import JotterView from './pages/JotterView'
import NavBar from './components/NavBar'
import PupilHome from './pages/PupilHome'
import PupilEditor from './pages/PupilEditor'
import './App.css'
import { getToken, getUser } from './utils/auth'


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const loggedInUser = await getUser()
        setUser(loggedInUser)
      } catch (error) {
        throw new Error(error)
      }
    }
    if (getToken()) getLoggedInUser()
  }, [])

  return (
    <main className='App'>
      <NavBar user={user} setUser={setUser} />
      <div className='m-3'>
        {user && user.groups[0] === 1 ?
          // Teacher Routes 
          <Routes>
            <Route path='/' element={<TeacherHome />} />
            <Route path='/contexts' element={<TeacherContexts />} />
            <Route path='/contexts/:id' element={<ContextView />} />
            <Route path='/contexts/create' element={<CreateEditContext />} />
            <Route path='/contexts/:id/edit' element={<CreateEditContext />} />
            <Route path='/contexts/pupil/:id' element={<PupilView />} />
            <Route path='jotter/:id' element={<JotterView />} />
          </Routes>
          : user && user.groups[0] === 2 ?
            // Pupil Routes
            <Routes>
              <Route path='/' element={<PupilHome />} />
              <Route path='/editor/:id' element={<PupilEditor />} />
              <Route path='/jotter/:id' element={<JotterView />} />
            </Routes>
            :
            // Landing Page for Not Logged In users
            <LandingPage user={user} setUser={setUser} />
        }
      </div>
    </main>
  )
}

export default App;
