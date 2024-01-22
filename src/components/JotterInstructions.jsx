export default function JotterInstructions({ context }) {
  return (
    <div>
      <h1 className="text-4xl font-bold">{context.title}</h1>
      <p className="text-2xl">{context.instructions}</p>
      {context.images &&
        context.images.length &&
        context.images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={context.title}
            className="mx-auto max-w-sm"
          />
        ))}
    </div>
  );
}
