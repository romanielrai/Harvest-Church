import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/shared/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Harvest Ministries Nepal",
    default: "Harvest Ministries Nepal | Spreading Faith & Hope in Bhaktapur",
  },
  description: "Holistic NGO and church management platform in Bhaktapur, Nepal. Training rural pastors, establishing mountain fellowships, drilling fresh water wells, and sponsoring children.",
  keywords: "Harvest Nepal, Christian NGO Bhaktapur, Church Planting Nepal, Pastor Training, Solukhumbu winter relief",
};

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
