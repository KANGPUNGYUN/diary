import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Control } from "./Control";

export const metadata: Metadata = {
  title: "My Diary",
  description: "How was your day?",
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
          <Link href="/">HOME</Link>
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
