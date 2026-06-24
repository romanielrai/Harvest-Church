import { prisma } from '@/lib/prisma';
import React from 'react';
import HomepageClient from './HomepageClient';
import { Metadata } from 'next';

// Dynamic SEO metadata based on administrator system settings
export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.systemSettings.findFirst();
  if (!settings) {
    return {
      title: "Harvest Ministries Nepal",
      description: "Spreading the Gospel & Planting Churches across Nepal",
      keywords: "church, nepal, ministry, gospel, relief",
    };
  }
  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
    keywords: settings.seoKeywords,
  };
}

export default async function HomePage() {
  // 1. Fetch or initialize System Settings
  let settings = await prisma.systemSettings.findFirst();
  if (!settings) {
    settings = await prisma.systemSettings.create({
      data: {
        ministryName: "Harvest Ministries Nepal",
        email: "info@harvestnepal.org",
        phone: "+977 1 6610000",
        address: "Bhaktapur, Nepal",
        mission: "To spread the Gospel of Jesus Christ across all 77 districts of Nepal.",
        vision: "To plant fellowships and train leaders across the country.",
        statementOfFaith: "The Bible is the inspired Word of God...",
        history: "Established in 2001 in Bhaktapur...",
        aboutText: "Harvest Church is a vibrant house fellowship...",
        homepageLayout: "hero,mission,story,stats,pastor,team,faq,badges,cta,newsletter",
        seoTitle: "Harvest Ministries Nepal",
        seoDescription: "Spreading the Gospel & Planting Churches across Nepal",
        seoKeywords: "church, nepal, ministry, gospel, relief"
      }
    });
  }

  // 2. Fetch all other content in parallel for optimal performance
  const [
    ministriesCount,
    projectsCount,
    eventsCount,
    donationsSum,
    volunteersCount,
    blogs,
    ministries,
    projects,
    team,
    faqs
  ] = await Promise.all([
    prisma.ministry.count(),
    prisma.project.count(),
    prisma.event.count(),
    prisma.donation.aggregate({ _sum: { amount: true } }),
    prisma.volunteer.count(),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    }),
    prisma.ministry.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    }),
    prisma.faq.findMany({
      orderBy: { createdAt: 'asc' }
    })
  ]);

  // 3. Prepare stats object with fallbacks
  const stats = {
    ministries: ministriesCount || 7,
    projects: projectsCount || 3,
    events: eventsCount || 2,
    donationsTotal: donationsSum._sum.amount ?? 211500,
    volunteers: volunteersCount || 12,
  };

  return (
    <HomepageClient
      settings={settings}
      stats={stats}
      blogs={blogs}
      ministries={ministries}
      projects={projects}
      team={team}
      faqs={faqs}
    />
  );
}
