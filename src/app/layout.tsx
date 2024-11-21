import React from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";
import Providers from "@/providers/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono h-screen flex flex-col">
        <Providers>
          <Navbar />
          {/* Layout UI */}
          <div className="flex h-full w-full max-h-screen">
            <Sidebar />
            <div className="flex flex-col size-full overflow-y-scroll">
              {children}
            </div>
          </div>
          {/* <footer className="w-full flex justify-center py-6 text-sm">
            <div className="max-w-7xl flex justify-between items-center">
              <p>
                &copy; {new Date().getFullYear()} Moikas LLC. All Rights
                Reserved.
              </p>{" "}
              <p>v 0.1.0</p>
            </div>
          </footer> */}
        </Providers>
      </body>
    </html>
  );
}
