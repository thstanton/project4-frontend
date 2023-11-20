import { Link } from "react-router-dom";

export default function ContextCard({ context }) {
  return (
    <Link to={`/editor/${context.id}`}>
        <div>
            <h4>{ context.title }</h4>
            <h5>Set by: { context.author }</h5>
        </div>
    </Link>
  )
}
