import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { contextsAPI } from "../utils/contexts-api"
import ContextForm from "../components/ContextForm"
import { Button } from "@nextui-org/react"

export default function EditContext() {
    const { id } = useParams()
    const [context, setContext] = useState()
    const [wordbanks, setWordbanks] = useState()
    const [images, setImages] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await contextsAPI.single(id, 'GET')

                if (response.status === 200) {
                    const data = response.data
                    setContext({
                        title: data.title,
                        instructions: data.instructions,
                        prompt: data.prompt
                    })
                    setImages(data.images)
                    setWordbanks(data.context.wordbanks)
                } else {
                    console.error(response)
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [id])

    async function handleUpdateOverview() {
        try {
            const response = await contextsAPI.single(id, 'PUT', context)
            if (response.status === 200) {
                console.log('updated sucessfully')
            } else {
                console.error(response)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div>
                <h1>Edit Overview:</h1>
                {context &&
                    <>
                        <ContextForm
                            context={context}
                            setContext={setContext}
                        />
                        <Button onClick={handleUpdateOverview}>Update Overview</Button>
                    </>
                }
            </div>
        </div>
    )
}
