import { Card, CardBody, Button } from "@nextui-org/react"
import TeacherContextCardList from './TeacherContextCardList'
import EditClass from "./EditClass"
import { useState } from "react"
import { classesAPI } from "../utils/classes-api"
import ClassPupilListItem from "./ClassPupilListItem"

export default function ClassDetailView({ pupilClass, setPupilClass, classes, setClasses }) {
    const [showEditClassForm, setShowEditClassForm] = useState(false)

    async function deleteClass() {
        try {
            const response = await classesAPI.delete(pupilClass.id)
            if (response.status === 204) {
                setPupilClass(null)
                const newClasses = classes.filter(currentClass => currentClass.id !== pupilClass.id)
                setClasses(newClasses)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Class details:</h1>
            <Card>
                <CardBody>
                    <p>{pupilClass.name}</p>
                    <p>Year group: {pupilClass.year_group}</p>
                    <p>Teacher: {pupilClass.teacher.first_name} {pupilClass.teacher.last_name}</p>
                    <p>Access key: {pupilClass.access_key}</p>
                    <Button color="warning" size="sm" onClick={() => setShowEditClassForm(true)}>Edit Class</Button>
                    <Button color="danger" size="sm" onClick={deleteClass}>Delete Class</Button>
                    {showEditClassForm &&
                        <EditClass
                            classes={classes}
                            setClasses={setClasses}
                            setShowEditClassForm={setShowEditClassForm}
                            setPupilClass={setPupilClass}
                            pupilClass={pupilClass}
                        />
                    }
                </CardBody>
            </Card>
            <div>
                <h1>Class members:</h1>
                {
                    pupilClass.pupils.length ? pupilClass.pupils.map(pupil => (
                        <ClassPupilListItem 
                            key={pupil.id} 
                            pupil={pupil} 
                            pupilClass={pupilClass} 
                            setPupilClass={setPupilClass}
                        />
                    ))
                        :
                        <p>No pupils have joined this class yet</p>
                }
            </div>
            <div>
                <h1>Assigned Contexts:</h1>
                <TeacherContextCardList contexts={pupilClass.contexts} />
            </div>
        </div>
    )
}
