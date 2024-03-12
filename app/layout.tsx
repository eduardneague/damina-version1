import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import SideNav from "@/components/SideNav";
import PageWrapper from "@/components/PageWrapper";
import MarginWidthWrapper from "@/components/MarginWidthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Damina Glina Software",
  description: "Damina Solutions SRL Software, created by Neague Eduard Ionut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
        <div className = "flex">
          <SideNav/>
          <main className = "flex-1 text-sm md:text-base">
            <MarginWidthWrapper>
              <Header/>
              <HeaderMobile/>
              <PageWrapper>
                {children}
              </PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
