import { Card, CardBody } from "@nextui-org/react"
import { Link } from "react-router-dom"

export default function JotterCard({ jotter }) {
  return (
    <Link to={`/editor/${jotter.id}`}>
      <Card>
        <CardBody>
          <h4>{jotter.context.title}</h4>
        </CardBody>
      </Card>
    </Link>
  )
}


