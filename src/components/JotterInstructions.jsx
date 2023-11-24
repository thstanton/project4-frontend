

export default function JotterInstructions({ context }) {
  return (
    <div>
      <h1 className="font-bold text-4xl">
        {context.title}
      </h1>
      <p className="text-2xl">
        {context.instructions}
      </p>
      {context.images && context.images.length && context.images.map(image => (
        <img
          key={image.id}
          src={image.url}
          alt={context.title}
          className="max-w-sm mx-auto"
        />
      ))
      }
    </div>
  )
}
