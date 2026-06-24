"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X, Heart, Shield } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Ministries", href: "/ministries" },
  { name: "Projects", href: "/projects" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({ settings }: { settings?: any }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 glassmorphism shadow-sm w-full transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand area */}
          <Link href="/" className="flex items-center gap-2.5">
            {settings?.logoUrl ? (
              <div className="relative w-10 h-10">
                <Image
                  src={settings.logoUrl}
                  alt={settings.ministryName || "Harvest Ministries Nepal"}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
            ) : null}
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold font-serif text-primary tracking-tight leading-tight">
                {settings?.ministryName || "Harvest Ministries"}
              </span>
              <span className="text-xs font-semibold text-secondary uppercase tracking-widest leading-none">
                Nepal
              </span>
            </div>
          </Link>


          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-150 relative py-1 ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Call-to-actions, theme, session controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-muted text-foreground border border-border hover:bg-accent hover:scale-105 active:scale-95 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-primary" />
              Admin
            </Link>

            <Link
              href="/donate"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-primary hover:bg-primary/95 hover:scale-105 active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              Donate
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex lg:hidden items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-muted text-foreground cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-card text-card-foreground animate-fadeIn w-full">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-[1px] bg-border my-3" />

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-semibold hover:bg-muted text-foreground"
            >
              <Shield className="w-4 h-4 text-primary" />
              Admin Panel
            </Link>

            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-base font-bold text-white bg-primary hover:bg-primary/95 text-center transition-all shadow-sm"
            >
              <Heart className="w-4 h-4 fill-white" />
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
