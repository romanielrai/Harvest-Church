import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/shared/AuthProvider";
import { prisma } from "@/lib/prisma";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.systemSettings.findFirst();
  return {
    title: {
      template: `%s | ${settings?.ministryName || "Harvest Ministries Nepal"}`,
      default: settings?.seoTitle || "Harvest Ministries Nepal | Spreading Faith & Hope in Bhaktapur",
    },
    description: settings?.seoDescription || "Holistic NGO and church management platform in Bhaktapur, Nepal. Training rural pastors, establishing mountain fellowships, drilling fresh water wells, and sponsoring children.",
    keywords: settings?.seoKeywords || "Harvest Nepal, Christian NGO Bhaktapur, Church Planting Nepal, Pastor Training, Solukhumbu winter relief",
    icons: {
      icon: settings?.logoUrl || "/favicon.ico",
    }
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} h-full flex flex-col`} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
