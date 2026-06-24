import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0; // Dynamic rendering

export default async function BlogPostDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
    include: { category: true }
  });

  const fallbackPosts: Record<string, any> = {
    "1": {
      title: "Sindhupalchok Rural Outreach: Reaching the Unreached",
      summary: "Our gospel team recently climbed five hours to reach a remote mountain village in Sindhupalchok, sharing the message of faith and love.",
      content: "<p>Our mobile evangelism teams recently returned from an intensive five-day outreach in the remote heights of Sindhupalchok. Due to rough terrain and lack of paved roads, our team traveled by foot, carrying heavy backpacks containing scriptures, basic health supplies, and food packets.</p><p>We held simple open-air meetings where we shared chronological stories of the Bible. Over eighty villagers attended our evening story circle. We are deeply grateful to God for protecting the team and opening doors in Sindhupalchok. Plans are underway to establish a regular home fellowship in this village next month.</p>",
      createdAt: new Date("2026-05-15"),
      authorName: "Pastor Satis Thapa",
      category: { name: "Ministry News" },
      coverImage: "/images/img_page2_1.jpeg"
    },
    "2": {
      title: "Bhaktapur Center Roof Completed!",
      summary: "Thank you sponsors! The roof structure of the Bhaktapur Faith Center has been completed successfully ahead of the monsoon.",
      content: "<p>We are thrilled to share that through your generous contributions, we have successfully poured the concrete roof slab for the second floor of the Bhaktapur multi-purpose center. This milestone is crucial as the monsoon rains will begin shortly, and having the structural roof in place allows our indoor plaster and electrical teams to work uninterrupted.</p><p>When finished, this three-story center will serve as a central training hall, administrative offices, and a safe community shelter. We ask for your continued prayers for the finishing budget and volunteer safety.</p>",
      createdAt: new Date("2026-04-20"),
      authorName: "Pastor Gita Karki",
      category: { name: "Ministry News" },
      coverImage: "/images/img_page3_8.jpeg"
    }
  };

  const displayPost = post ? {
    ...post,
    coverImage: post.coverImage || (post.title.includes("Sindhupalchok") 
      ? "/images/img_page2_1.jpeg" 
      : "/images/img_page3_8.jpeg")
  } : fallbackPosts[params.id];

  if (!displayPost || (post && !post.published)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>

        {/* Article Container */}
        <article className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow overflow-hidden">
          {/* Cover Image */}
          <div className="h-96 relative w-full">
            <Image
              src={displayPost.coverImage}
              alt={displayPost.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-6 left-8">
              <span className="bg-primary text-white text-xs font-bold uppercase px-3 py-1.5 rounded-xl shadow-md">
                {displayPost.category.name}
              </span>
            </div>
          </div>

          {/* Article Header */}
          <div className="p-8 md:p-12 space-y-4 pb-6">
            <div className="flex gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(displayPost.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {displayPost.authorName}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
              {displayPost.title}
            </h1>
          </div>

          {/* Article Body */}
          <div 
            className="p-8 md:p-12 pt-0 prose dark:prose-invert max-w-none text-slate-650 dark:text-slate-350 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: displayPost.content }}
          />
        </article>

      </div>
    </main>
  );
}
