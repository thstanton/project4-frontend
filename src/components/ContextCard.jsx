import { redirect } from "react-router-dom";
import { jottersAPI } from "../utils/jotters-api";
import { Card, CardBody } from "@nextui-org/react";

export default function ContextCard({ context }) {
    async function handleJotterCreate() {
        const body = {
            context: context.id
        }
        try {
            const response = await jottersAPI.create(body)
            if (response.status === 201) {
                return redirect(`/editor/${context.id}`)
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
