import React from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { MessageSquare, Quote } from "lucide-react";
import TestimonialForm from "./TestimonialForm";

export const revalidate = 0; // Dynamic rendering

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" }
  });

  const fallbackTestimonials = [
    {
      id: "1",
      authorName: "Sarah Jenkins",
      role: "Short-term Volunteer, USA",
      content: "Spending two weeks with Harvest Ministries Nepal in Bhaktapur opened my eyes. Pastor Satis and Gita represent the true heart of servanthood. Seeing the children study with such joy in the tutoring classes was incredibly beautiful.",
      category: "VOLUNTEER",
      avatarUrl: null
    },
    {
      id: "2",
      authorName: "Bir Bahadur Tamang",
      role: "Sindhupalchok Village Leader",
      content: "When the landslide blocked our clean water stream, we didn't know what to do. Harvest Ministries Nepal didn't just bring words; they brought tools, pipes, and engineers. Today, our whole village has clean drinking water directly from the tap.",
      category: "COMMUNITY",
      avatarUrl: null
    },
    {
      id: "3",
      authorName: "David Davidson",
      role: "Child Sponsor, Canada",
      content: "Sponsoring Binod has been an absolute blessing. The monthly progress reports are very transparent and detailed. Writing letters back and forth has allowed us to connect personally. I highly recommend sponsoring a child through Harvest.",
      category: "SPONSOR",
      avatarUrl: null
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Voices of Impact</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Testimonials & Encouragements
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Read stories of transformation from our volunteers, international sponsors, and local Nepalese village leaders.
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Testimonial Cards List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {displayTestimonials.map((test) => (
                <div 
                  key={test.id}
                  className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 flex flex-col justify-between space-y-6 relative hover:shadow-md transition"
                >
                  <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{test.content}"
                  </p>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-900">
                    <div className="w-11 h-11 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center text-sm font-serif select-none">
                      {test.authorName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-serif">{test.authorName}</h3>
                      <p className="text-xs text-slate-500">{test.role}</p>
                      <span className="inline-block mt-1 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-primary tracking-wider">
                        {test.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Submit Form */}
          <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-lg space-y-6 h-fit">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Encourage Us</span>
              <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Share Your Story</h3>
              <p className="text-xs text-slate-400">
                Are you a sponsor, volunteer, or visitor? Let us know how Harvest Ministries has impacted you.
              </p>
            </div>
            
            <TestimonialForm />
          </div>

        </div>

      </div>
    </main>
  );
}
