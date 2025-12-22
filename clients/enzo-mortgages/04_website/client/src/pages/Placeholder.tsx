interface PlaceholderProps {
  title?: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>{title || "Placeholder"}</h1>
      <p>This page exists. Content comes later.</p>
    </div>
  );
}
