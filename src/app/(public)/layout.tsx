import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.systemSettings.findFirst();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={settings} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}

