

export default function JotterInstructions({ context }) {
  return (
    <div>
        <h1 className="font-bold text-4xl">
          {context.title}
        </h1>
        <p className="text-2xl">
          {context.instructions}
          </p>
        <img 
          src={context.images[0].url}
          alt={context.title}
          className="max-w-sm mx-auto"
        />
    </div>
  )
}
