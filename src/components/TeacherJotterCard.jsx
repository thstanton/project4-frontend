import { Card, CardBody } from '@nextui-org/react'
import { useNavigate } from "react-router-dom"

export default function TeacherJotterCard({ jotter }) {
    const navigate = useNavigate()

    return (
        <Card isPressable onPress={() => navigate(`/jotter/${jotter.id}`)}>
            <CardBody>
                {jotter.author.first_name}
                {
                    jotter.author.pupil_classes.map(pupilClass => (
                        <>
                            <p>{pupilClass.name}</p>
                            <p>{pupilClass.year_group}</p>
                        </>
                    ))
                }
            </CardBody>
        </Card>
    )
}
