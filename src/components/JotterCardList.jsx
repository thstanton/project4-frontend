import JotterCard from "./JotterCard"

export default function JotterCardList({ jotters }) {
  return (
    <div>
        {
            jotters.map(jotter => (
                <JotterCard key={ jotter.id } jotter={ jotter } />
            ))
        }
    </div>
  )
}
