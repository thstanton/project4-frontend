import { useEffect, useState } from "react"
import { classesAPI } from '../utils/classes-api'
import { Tabs, Tab, Card, CardBody, Button } from '@nextui-org/react'
import TeacherContextCardList from "../components/TeacherContextCardList"
import CreateClass from "../components/CreateClass"
import EditClass from "../components/EditClass"

export default function TeacherHome() {
  const [classes, setClasses] = useState([])
  const [showNewClassForm, setShowNewClassForm] = useState(false)
  const [showEditClassForm, setShowEditClassForm] = useState(false)

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await classesAPI.own()
            if (response.status === 200) setClasses(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    fetchData()
  }, [])

  async function handleRemovePupil(id) {
    
  }

  return (
    <div>
      <div>
        <Button color="success" onClick={() => setShowNewClassForm(true)}>Create new class</Button>
        { showNewClassForm &&
          <CreateClass 
            setClasses={setClasses} 
            setShowNewClassForm={setShowNewClassForm}
            />
        }
      </div>
      <div>
        <h1>My Classes:</h1>
        { classes && 
          <Tabs size="lg" items={classes}>
            {(item) => (
              <Tab key={item.id} title={item.name} aria-label={item.name}>
                <div>
                  <h1>Class details:</h1>
                  <Card>
                    <CardBody>
                      <p>{item.name}</p>
                      <p>Year group: {item.year_group}</p>
                      <p>Teacher: {item.teacher.first_name} {item.teacher.last_name}</p>
                      <p>Access key: {item.access_key}</p>
                      <Button color="warning" size="sm" onClick={() => setShowEditClassForm(true)}>Edit Class</Button>
                      { showEditClassForm &&
                        <EditClass
                          classes={classes} 
                          setClasses={setClasses} 
                          setShowEditClassForm={setShowEditClassForm}
                          pupilClass={item}
                        />
                      }
                    </CardBody>
                  </Card>
                  <div>
                    <h1>Class members:</h1>
                    {
                      item.pupils.length ? item.pupils.map(pupil => (
                        <p key={pupil.id}>{pupil.first_name} <Button size="sm" color="danger">Remove from class</Button></p>
                      )) 
                      : 
                      <p>No pupils have joined this class yet</p>
                    }
                  </div>
                  <div>
                    <h1>Assigned Contexts:</h1>
                    <TeacherContextCardList contexts={item.contexts} />
                  </div>
                </div>
              </Tab>
            )}
          </Tabs>
        }
      </div>
    </div>
  )
}
