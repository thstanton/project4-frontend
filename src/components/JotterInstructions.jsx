

export default function JotterInstructions({ context }) {
  return (
    <div>
        <h1>{context.title}</h1>
        <p>{context.instructions}</p>
        <img src={context.images[0].url} />
    </div>
  )
}
