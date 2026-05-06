import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter is a clean, highly legible font perfect for dashboards
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disaster Command Center | AI Network Analytics",
  description: "Real-time AI visualization of network traffic during disaster scenarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className={inter.className}>
        {/* We wrap the children in a container that ensures the gradient stretches full screen */}
        <div className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}