import React from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Landmark, Droplets, Snowflake } from "lucide-react";

export const revalidate = 0; // Fetch dynamic data on every request

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  // Fallback to static mock if DB returns empty
  const fallbackProjects = [
    {
      id: "1",
      title: "Bhaktapur Faith Center Construction",
      slug: "bhaktapur-faith-center",
      description: "Building a multi-purpose church building and training center in Bhaktapur. This center will house our theological seminars, youth activities, and serve as a shelter during local emergencies.",
      budget: 4500000,
      progress: 68,
      beneficiaries: 800,
      status: "ONGOING",
      coverImage: "/images/img_page3_7.jpeg", // Using church plant images
    },
    {
      id: "2",
      title: "Mountain Fresh Water Wells",
      slug: "mountain-fresh-water-wells",
      description: "Drilling clean tube wells in remote villages. These wells prevent water-borne illnesses and save women and children hours of rigorous mountain climbing each day.",
      budget: 1200000,
      progress: 100,
      beneficiaries: 1500,
      status: "COMPLETED",
      coverImage: "/images/img_page4_5.jpeg", // Using water pump images
    },
    {
      id: "3",
      title: "Winter Relief",
      slug: "winter-relief",
      description: "Distributing thick winter blankets, heavy jackets, and heaters to high-altitude communities facing freezing weather.",
      budget: 800000,
      progress: 0,
      beneficiaries: 350,
      status: "UPCOMING",
      coverImage: "/images/img_page4_1.jpeg", // Using clothing relief images
    }
  ];

  const displayProjects = projects.length > 0 ? projects.map(p => ({
    ...p,
    coverImage: p.title.includes("Construction") 
      ? "/images/img_page3_7.jpeg" 
      : p.title.includes("Wells") 
        ? "/images/img_page4_5.jpeg" 
        : "/images/img_page4_1.jpeg"
  })) : fallbackProjects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400";
      case "ONGOING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400";
    }
  };

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes("water") || title.toLowerCase().includes("wells")) {
      return <Droplets className="w-5 h-5 text-blue-500" />;
    }
    if (title.toLowerCase().includes("winter") || title.toLowerCase().includes("relief")) {
      return <Snowflake className="w-5 h-5 text-teal-500" />;
    }
    return <Landmark className="w-5 h-5 text-amber-500" />;
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Community Impact</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Our Development & Relief Projects
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Harvest Ministries Nepal actively works in remote and poor villages to establish clean water, secure shelter, and provide emergency relief supplies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Area */}
              <div className="h-56 relative w-full overflow-hidden group">
                <Image
                  src={proj.coverImage}
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(proj.status)}`}>
                    {proj.status}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getProjectIcon(proj.title)}
                    <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white line-clamp-1">
                      {proj.title}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">
                    {proj.description}
                  </p>
                </div>

                {/* Progress & Stats */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-900">
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Fundraising / Progress</span>
                      <span className="text-primary font-bold">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-150 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full transition-all duration-500" 
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Beneficiaries & Budget */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl text-center">
                      <p className="text-slate-400">Beneficiaries</p>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5 font-bold text-sm">
                        {new Intl.NumberFormat().format(proj.beneficiaries)}+ people
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl text-center">
                      <p className="text-slate-400">Target Budget</p>
                      <p className="text-slate-800 dark:text-slate-200 mt-0.5 font-bold text-sm">
                        NRs {new Intl.NumberFormat().format(proj.budget)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
