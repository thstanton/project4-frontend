import { redirect, useNavigate } from "react-router-dom";
import { jottersAPI } from "../utils/jotters-api";
import { Card, CardBody } from "@nextui-org/react";

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
                return navigate(`/editor/${response.id}`)
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    return (
        <Card isPressable onPress={ handleJotterCreate }>
            <CardBody>
                <h4>{ context.title }</h4>
                <h5>Set by: { context.author }</h5>
            </CardBody>
        </Card>
  )
}
