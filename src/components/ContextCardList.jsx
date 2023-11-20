

export default function ContextCardList({ contexts }) {
  return (
    <div>
        {
            contexts.map(context => (
                <ContextCard context={ context } />
            ))
        }
    </div>
  )
}
