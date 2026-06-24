import React from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const settings = await prisma.systemSettings.findFirst();
  
  const address = settings?.address || "Changu Road, Bhaktapur, Nepal";
  const phone = settings?.phone || "+977 1 6614488";
  const email = settings?.email || "info@harvestnepal.org";
  const whatsappDisplay = settings?.whatsappNumber || "+9779800000000";
  const whatsappClean = whatsappDisplay.replace(/[^0-9]/g, "");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Connect With Harvest Nepal
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Have questions about our ministries, child sponsorships, or volunteering? Send us a message or reach us via WhatsApp.
          </p>
        </div>
 
        {/* Contact Layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Contact Information</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 items-start bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Office Address</h3>
                  <p className="text-slate-800 dark:text-slate-200 mt-1 font-semibold text-sm">{address}</p>
                </div>
              </div>
 
              {/* Phone */}
              <div className="flex gap-4 items-start bg-white dark:bg-slate-955 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Phone / Mobile</h3>
                  <a href={`tel:${phone}`} className="text-slate-800 dark:text-slate-200 mt-1 font-semibold text-sm block hover:underline">
                    {phone}
                  </a>
                </div>
              </div>
 
              {/* WhatsApp */}
              <div className="flex gap-4 items-start bg-white dark:bg-slate-955 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">WhatsApp Chat</h3>
                  <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-200 mt-1 font-semibold text-sm block hover:underline">
                    {whatsappDisplay}
                  </a>
                </div>
              </div>
 
              {/* Email */}
              <div className="flex gap-4 items-start bg-white dark:bg-slate-955 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email Address</h3>
                  <a href={`mailto:${email}`} className="text-slate-800 dark:text-slate-200 mt-1 font-semibold text-sm block hover:underline">
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>
 
          {/* Form Side */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-950 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-lg space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Write To Us</span>
              <h3 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">Send Message</h3>
              <p className="text-xs text-slate-400">
                Please fill in the form below and our ministry team will get back to you shortly.
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>
 
      </div>
    </main>
  );
}

