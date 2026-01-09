import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Website",
  description: "Branded+Flow client website template",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

