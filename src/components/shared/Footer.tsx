"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Facebook = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer({ settings }: { settings?: any }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000); // Reset alert after 5s
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Organization Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              {settings?.logoUrl ? (
                <div className="relative w-8 h-8">
                  <Image
                    src={settings.logoUrl}
                    alt={settings.ministryName || "Harvest Ministries Nepal"}
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
              ) : null}
              <div className="flex flex-col">
                <span className="text-lg font-bold font-serif text-white tracking-tight">
                  {settings?.ministryName || "Harvest Ministries"}
                </span>
                <span className="text-xs font-semibold text-secondary uppercase tracking-widest leading-none">
                  Nepal
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {settings?.aboutText || "Establishing indigenous fellowships, equipping rural pastors, and delivering critical community relief to mountain villages in Nepal since 2008."}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={settings?.facebookUrl || "https://facebook.com/harvestnepal"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={settings?.twitterUrl || "https://twitter.com/harvestnepal"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={settings?.instagramUrl || "https://instagram.com/harvestnepal"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-400">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors text-slate-400">
                  Our History & Values
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white hover:underline transition-colors text-slate-400">
                  Dynamic Ministries
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white hover:underline transition-colors text-slate-400">
                  Ongoing Relief Projects
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white hover:underline transition-colors text-slate-400">
                  Church Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white hover:underline transition-colors text-slate-400">
                  Media & Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{settings?.address || "Changu Road, Bhaktapur, Nepal"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{settings?.phone || "+977 1 6614488"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>{settings?.email || "info@harvestnepal.org"}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">
              Receive monthly spiritual updates and impact progress reports from Sindhupalchok directly in your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary pr-12 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 p-2 rounded-md bg-primary hover:bg-primary/95 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-green-400 font-semibold mt-3 animate-fadeIn">
                🎉 Thank you for subscribing to our updates!
              </p>
            )}
          </div>
        </div>

        {/* Bottom copyright and legal line */}
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings?.ministryName || "Harvest Ministries Nepal"}. All Rights Reserved. Registered NGO in Bhaktapur, Nepal.</p>
          <div className="flex space-x-6">
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>

  );
}
