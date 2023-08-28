import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Control } from "./Control";

export const metadata: Metadata = {
  title: "Home | 하루쓰기",
  description: "How was your day?",
  icons: [
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      type: "image/png",
      sizes: "16x16",
    },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180" },
  ],
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
    cache: "no-cache",
  });
  const topics = await response.json();

  return (
    <html>
      <body>
        <h1>
          <Link href="/">하루쓰기</Link>
        </h1>
        <ol>
          {topics.map((topic: any) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
