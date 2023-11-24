import { Button } from "@nextui-org/react"
import { useState } from "react"
import { classesAPI } from "../utils/classes-api"

export default function CreateClass({ setShowNewClassForm, setClasses }) {
    const [name, setName] = useState()
    const [yearGroup, setYearGroup] = useState()

    async function handleSubmit() {
        const newPupilClass = {
            name: name,
            year_group: yearGroup
        }
        try {
            const response = await classesAPI.new(newPupilClass)
            if (response.status === 201) {
                setClasses(prevClasses => [...prevClasses, response.data])
                setShowNewClassForm(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <label>Class name:</label>
            <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label>Year group:</label>
            <input
                required
                value={yearGroup}
                onChange={e => setYearGroup(e.target.value)}
            />
            <Button color="primary" onClick={handleSubmit}>Submit</Button>
            <Button color="secondary" onClick={() => setShowNewClassForm(false)}>Cancel</Button>
        </div>
    )
}
