import { useEffect, useState } from "react"
import { classesAPI } from '../utils/classes-api'
import { Tabs, Tab, Table, TableHeader, TableBody, TableColumn, TableCell, TableRow, Card, CardBody, Button } from '@nextui-org/react'
import TeacherContextCardList from "../components/TeacherContextCardList"

export default function TeacherHome() {
  const [classes, setClasses] = useState([])

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

  return (
    <div>
      <div><Button>Create new class</Button></div>
      <div>
        <h1>My Classes:</h1>
        { classes && 
          <Tabs items={classes}>
            {(item) => (
              <Tab key={item.id} title={item.name}>
                <div>
                  <h1>Class details:</h1>
                  <Card>
                    <CardBody>
                      <p>{item.name}</p>
                      <p>Year group: {item.year_group}</p>
                      <p>Teacher: {item.teacher.first_name} {item.teacher.last_name}</p>
                      <p>Access key: {item.access_key}</p>
                    </CardBody>
                  </Card>
                  <div>
                    <h1>Class members:</h1>
                    <Table>
                      <TableHeader>
                        <TableColumn>First Name:</TableColumn>
                        <TableColumn></TableColumn>
                      </TableHeader>
                      <TableBody items={item.pupils}>
                        {(item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.first_name}</TableCell>
                            <TableCell><Button>Remove from class</Button></TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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
