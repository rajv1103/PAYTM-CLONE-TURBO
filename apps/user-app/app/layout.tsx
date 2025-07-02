// user-app/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";

import { AppbarClient } from "../components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-zinc-900`}>
        <Providers>
          <div className="flex min-h-screen">
           
            <div className="flex-1 flex flex-col">
              <AppbarClient />
              <main className="p-4">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
