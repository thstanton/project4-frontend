import ContextCard from "./ContextCard"

export default function ContextCardList({ contexts }) {
  return (
    <div className="flex flex-row flex-wrap gap-6">
        {
            contexts.map(context => (
                <ContextCard key={ context.id } context={ context } />
            ))
        }
    </div>
  )
}
