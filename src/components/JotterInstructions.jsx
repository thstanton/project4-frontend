export default function JotterInstructions({ context }) {
  return (
    <div>
      <h1 className="text-4xl font-bold  mb-3">{context.title}</h1>
      <p className="text-2xl mb-3">{context.instructions}</p>
      <div className="flex mb-3">
        {context.images &&
          context.images.length &&
          context.images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={context.title}
              className="mx-auto w-60"
            />
          ))}
      </div>
    </div>
  );
}
