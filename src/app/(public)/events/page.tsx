import React from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Calendar, MapPin, Tag, Users } from "lucide-react";
import RegisterForm from "./RegisterForm";

export const revalidate = 0; // Dynamic rendering

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { registrations: true }
  });

  const fallbackEvents = [
    {
      id: "1",
      title: "Indigenous Pastors Conference 2026",
      slug: "indigenous-pastors-conference-2026",
      description: "A three-day spiritual retreat and theological training conference for rural pastors. The registration fee is fully sponsored, providing food, lodging, and books for all participants.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days out
      location: "Harvest Center, Bhaktapur",
      category: "Pastor Training",
      image: "/images/img_page3_3.jpeg",
      registrations: []
    },
    {
      id: "2",
      title: "Youth Summer Fellowship Camp",
      slug: "youth-summer-fellowship-camp",
      description: "An interactive, high-energy camp for teens featuring worship sessions, team building, biblically-grounded discussions, and competitive games in scenic Pokhara.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // 60 days out
      location: "Lake Side Lodge, Pokhara",
      category: "Youth Ministry",
      image: "/images/img_page2_6.jpeg",
      registrations: []
    }
  ];

  const displayEvents = events.length > 0 ? events.map(e => ({
    ...e,
    image: e.title.includes("Pastors") 
      ? "/images/img_page3_3.jpeg" 
      : "/images/img_page2_6.jpeg"
  })) : fallbackEvents;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Fellowship Calendar</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Upcoming Gatherings & Seminars
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Join us for our upcoming leadership training sessions, youth camps, and local community prayer conferences.
          </p>
        </div>

        {/* Events Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Events Grid */}
          <div className="lg:col-span-2 space-y-8">
            {displayEvents.map((evt) => (
              <div 
                key={evt.id}
                className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800/60 hover:shadow-xl transition-all duration-300 grid md:grid-cols-5"
              >
                {/* Image side */}
                <div className="h-56 md:h-full md:col-span-2 relative">
                  <Image
                    src={evt.image}
                    alt={evt.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white font-bold py-1.5 px-3 rounded-xl text-xs uppercase shadow">
                    {evt.category}
                  </div>
                </div>

                {/* Details side */}
                <div className="p-8 md:col-span-3 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                      {evt.title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold pt-4 border-t border-slate-100 dark:border-slate-900">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        {new Date(evt.date).toLocaleDateString("en-US", { 
                          month: "short", 
                          day: "numeric", 
                          year: "numeric" 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span className="line-clamp-1">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Sidebar */}
          <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-lg space-y-6 h-fit">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Register Now</span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Save Your Seat</h3>
              <p className="text-xs text-slate-400">
                Register to attend any of our scheduled sessions in Bhaktapur or Pokhara.
              </p>
            </div>
            
            <RegisterForm events={displayEvents.map(e => ({ id: e.id, title: e.title }))} />
          </div>
        </div>

      </div>
    </main>
  );
}
