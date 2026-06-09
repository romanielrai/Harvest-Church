import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { LocalAI } from '@/lib/local-ai';
import React from 'react';
import { Heart, Globe, BookOpen, Users, HelpCircle, Anchor, Calendar, Award } from 'lucide-react';

// Types for fetched data
type Stats = {
  ministries: number;
  projects: number;
  events: number;
  donationsTotal: number;
  volunteers: number;
};

type BlogPost = {
  id: string;
  title: string;
  summary: string;
  createdAt: Date;
};

async function fetchStats(): Promise<Stats> {
  const [ministries, projects, events, donations, volunteers] = await Promise.all([
    prisma.ministry.count(),
    prisma.project.count(),
    prisma.event.count(),
    prisma.donation.aggregate({ _sum: { amount: true } }),
    prisma.volunteer.count(),
  ]);

  return {
    ministries: ministries || 7, // fallback to PDF count if 0
    projects: projects || 3,
    events: events || 2,
    donationsTotal: donations._sum.amount ?? 211500,
    volunteers: volunteers || 12,
  };
}

async function fetchRecentPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: { id: true, title: true, summary: true, createdAt: true },
  });
  return posts.map(p => ({ ...p, createdAt: new Date(p.createdAt) }));
}

export default async function HomePage() {
  const [stats, posts, hero] = await Promise.all([
    fetchStats(),
    fetchRecentPosts(),
    LocalAI.generateBlogDraft(
      'Welcome to Harvest Ministries Nepal',
      'Home Hero',
      'faith, Nepal, community, outreach'
    ),
  ]);

  const heroText = hero.summary;

  const coreMinistries = [
    {
      title: "Sharing Gospel",
      description: "Reaching isolated people through tract distribution, music outreach, and showing the Jesus Movie.",
      icon: Globe,
      color: "bg-red-500/10 text-red-500",
    },
    {
      title: "Training Church Leaders",
      description: "Equipping local pastors and leaders through 1-3 day theological seminars and conferences.",
      icon: Award,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Planting Churches",
      description: "Vision to establish a gospel-centered church in all 77 districts of Nepal (6 branches active).",
      icon: Anchor,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Helping Needy People",
      description: "Delivering critical aid like food, winter clothes, sleepers, mosquito nets, and fresh water pumps.",
      icon: HelpCircle,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Women's Seminars",
      description: "Led by Pastor Gita Karki, empowering female leaders on their role in ministry and family care.",
      icon: Users,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Baptisms",
      description: "Rejoicing in public declarations of faith and pre-baptism discipleship in local river settings.",
      icon: Heart,
      color: "bg-teal-500/10 text-teal-500",
    },
    {
      title: "Bible Stories Tellers",
      description: "A comprehensive 2-year training program teaching 108 Bible stories for chronological oral outreach.",
      icon: BookOpen,
      color: "bg-indigo-500/10 text-indigo-500",
    },
  ];

  return (
    <main className="font-sans min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center min-h-[85vh] bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/hero_background.png')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-6 md:p-12 rounded-2xl max-w-3xl text-center bg-slate-950/40 backdrop-blur-md border border-white/10 mx-4">
          <span className="text-xs uppercase tracking-widest text-secondary font-bold mb-3 block">Est. 2001 | Bhaktapur, Nepal</span>
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white tracking-tight mb-4">
            Harvest Ministries <span className="text-primary">Nepal</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            {heroText}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/95 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:scale-105 transition-all"
            >
              Support Our Mission
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-slate-900/80 hover:bg-slate-950 text-white font-semibold py-3.5 px-8 rounded-full border border-slate-700 hover:scale-105 transition-all"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-950 shadow-md relative z-20 -mt-10 max-w-6xl mx-auto rounded-2xl border border-slate-100 dark:border-slate-800/60 px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-primary font-serif">{stats.ministries}</p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Ministries</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-primary font-serif">{stats.projects}</p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Projects</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-primary font-serif">{stats.events}</p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Events</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-extrabold text-primary font-serif">
              NPR {new Intl.NumberFormat().format(stats.donationsTotal)}
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Donations</p>
          </div>
          <div className="space-y-1 col-span-2 md:col-span-1">
            <p className="text-3xl md:text-4xl font-extrabold text-primary font-serif">{stats.volunteers}</p>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Volunteers</p>
          </div>
        </div>
      </section>

      {/* Founders Profile Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
            <Image
              src="/images/img_page1_2.jpeg"
              alt="Pastor Satis Thapa and Pastor Gita Karki"
              width={600}
              height={500}
              className="object-cover w-full h-[500px] transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white text-center">
              <h3 className="text-xl font-bold font-serif">Pastor Satis Thapa and Pastor Gita Karki (Thapa)</h3>
              <p className="text-sm text-secondary font-semibold uppercase tracking-wider mt-1">Founders of Harvest Ministries Nepal</p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
              Sowing Seeds of Faith, Harvesting Fruit of Eternal Hope
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              "This church began with prayers as a home fellowship of 3 people in a one-room home. I gave it the name **Harvest Church**."
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We are indigenous Christian leaders serving the poorest villages in the far corners of the Himalayan nation of Nepal. Over the last 23+ years, the Lord has expanded this work into a nationwide fellowship, planting 6 branch fellowships, mentoring dozens of local pastors, and drilling water pumps to support marginalized communities.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 py-3 px-6 rounded-full font-semibold transition shadow"
              >
                Read More About Us
              </Link>
              <Link
                href="/contact"
                className="border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 py-3 px-6 rounded-full font-semibold transition"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Activities Section */}
      <section className="py-20 bg-slate-100 dark:bg-slate-950/40 border-y border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white">Our Ministry Activities</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Demonstrating the love of God across Nepal through outreach, church development, education, and humanitarian aid.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreMinistries.map((min, index) => {
              const IconComponent = min.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900/60 p-8 rounded-2xl shadow-md border border-slate-100 dark:border-slate-800/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl inline-block ${min.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">{min.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {min.description}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      href="/ministries"
                      className="text-primary hover:underline font-semibold text-xs inline-flex items-center gap-1"
                    >
                      Learn Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Updates</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white">Latest Ministry News</h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map(post => (
            <article
              key={post.id}
              className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/55 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="p-8">
                <span className="text-xs text-slate-400 font-bold block mb-2">
                  {new Date(post.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <h3 className="text-lg font-bold font-serif mb-3 text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <div className="p-8 pt-0 border-t border-slate-50 dark:border-slate-900">
                <Link
                  href={`/blog`}
                  className="text-primary hover:underline font-bold text-xs"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
