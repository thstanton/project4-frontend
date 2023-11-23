import { useNavigate } from "react-router-dom";
import { jottersAPI } from "../utils/jotters-api";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

export default function TeacherContextCard({ context }) {
    const navigate = useNavigate()

    return (
        <Card 
            isPressable 
            onPress={() => navigate(`/contexts/${context.id}`)}
            className="w-52 h-52"
        >
            <CardBody>
                <h4>{ context.title }</h4>
                
            </CardBody>
            <CardFooter>
                { context.assigned_classes.length ?
                    <>
                        <p>Assigned to:</p>
                        { context.assigned_classes.map(pupilClass => (
                            <p key={pupilClass.id}>{pupilClass.name}</p>
                        ))}
                    </>
                    :
                    <p>Not assigned to any classes</p>
                }
            </CardFooter>
        </Card>
  )
}
