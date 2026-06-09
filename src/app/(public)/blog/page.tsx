import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, User, ArrowRight } from "lucide-react";

export const revalidate = 0; // Dynamic rendering

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  const fallbackPosts = [
    {
      id: "1",
      title: "Sindhupalchok Rural Outreach: Reaching the Unreached",
      slug: "sindhupalchok-rural-outreach-2026",
      summary: "Our gospel team recently climbed five hours to reach a remote mountain village in Sindhupalchok, sharing the message of faith and love.",
      createdAt: new Date("2026-05-15"),
      authorName: "Pastor Satis Thapa",
      category: { name: "Ministry News" },
      coverImage: "/images/img_page2_1.jpeg"
    },
    {
      id: "2",
      title: "Bhaktapur Center Roof Completed!",
      slug: "bhaktapur-center-roof-completed",
      summary: "Thank you sponsors! The roof structure of the Bhaktapur Faith Center has been completed successfully ahead of the monsoon.",
      createdAt: new Date("2026-04-20"),
      authorName: "Pastor Gita Karki",
      category: { name: "Ministry News" },
      coverImage: "/images/img_page3_8.jpeg"
    }
  ];

  const displayPosts = posts.length > 0 ? posts.map(p => ({
    ...p,
    coverImage: p.title.includes("Sindhupalchok") 
      ? "/images/img_page2_1.jpeg" 
      : "/images/img_page3_8.jpeg"
  })) : fallbackPosts;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Ministry News</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Latest Outreach Updates & Stories
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Stay informed with our updates from the field, testimonials of faith, and building project milestones.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {displayPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              {/* Header Image */}
              <div className="h-64 relative w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg shadow-sm">
                    {post.category.name}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.authorName}</span>
                  </div>

                  <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-900">
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="text-primary hover:underline font-bold text-sm inline-flex items-center gap-1"
                  >
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
