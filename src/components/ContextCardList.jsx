import ContextCard from "./ContextCard"

export default function ContextCardList({ contexts }) {
  return (
    <div>
        {
            contexts.map(context => (
                <ContextCard key={ context.id } context={ context } />
            ))
        }
    </div>
  )
}
