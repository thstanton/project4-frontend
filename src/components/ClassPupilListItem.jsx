import { Button } from "@nextui-org/react"
import { classesAPI } from "../utils/classes-api"

export default function ClassPupilListItem({ pupil, pupilClass, setPupilClass }) {
    async function removePupil() {
        try {
            const response = await classesAPI.removePupil(pupilClass.id, pupil.id)
            if (response.status === 202) {
                setPupilClass(prevPupilClass => ({
                    ...prevPupilClass,
                    pupils: prevPupilClass.pupils.filter(currentPupil => currentPupil.id !== pupil.id)
                  }))
            }
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <p>{pupil.first_name} <Button size="sm" color="danger" onClick={removePupil}>Remove from class</Button></p>
  )
}
