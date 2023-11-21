import { useNavigate } from "react-router-dom";
import { jottersAPI } from "../utils/jotters-api";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

export default function ContextCard({ context }) {
    const navigate = useNavigate()

    async function handleJotterCreate() {
        const body = {
            context: context.id
        }
        try {
            const response = await jottersAPI.create(body)
            console.log(response)
            if (response.status === 201) {
                return navigate(`/editor/${response.data.id}`)
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    return (
        <Card 
            isPressable 
            onPress={ handleJotterCreate }
            className="w-52 h-52"
        >
            <CardBody>
                <h4>{ context.title }</h4>
                
            </CardBody>
            <CardFooter>
                <h5>Set by: { context.author }</h5>
            </CardFooter>
        </Card>
  )
}
