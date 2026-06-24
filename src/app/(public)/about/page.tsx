import { prisma } from '@/lib/prisma';
import React from 'react';
import AboutClient from './AboutClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.systemSettings.findFirst();
  if (!settings) {
    return {
      title: "About Us | Harvest Ministries Nepal",
      description: "Learn more about our church planting, pastoral training, and local community outreach in Nepal.",
    };
  }
  return {
    title: `About Us | ${settings.seoTitle}`,
    description: settings.seoDescription,
    keywords: settings.seoKeywords,
  };
}

export default async function AboutPage() {
  const [team, faqs, settings] = await Promise.all([
    prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    }),
    prisma.faq.findMany({
      orderBy: { createdAt: 'asc' }
    }),
    prisma.systemSettings.findFirst()
  ]);

  return <AboutClient team={team} faqs={faqs} settings={settings} />;
}

