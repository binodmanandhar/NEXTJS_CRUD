import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next js Crud",
  description: "Curd operation with Appwrite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-semibold text-slate-700 text-white"
              >
                Logo
              </Link>
              <Link
                href={"/create"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create new job post
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
