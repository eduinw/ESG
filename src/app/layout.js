import "./globals.css";
import { Inter } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI-Compliance Platform",
  description: "ESG Compliance Automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
          <div className="layout">
            <Sidebar />
            <main className="main-content">{children}</main>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
