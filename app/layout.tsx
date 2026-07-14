import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full-Stack & Cloud Engineer Portfolio",
  description:
    "A premium technical portfolio for a Full-Stack Software Engineer specializing in cloud, systems, Web3, and modern application delivery."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
