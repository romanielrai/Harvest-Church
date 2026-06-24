import React from "react";
import { prisma } from "@/lib/prisma";
import GalleryClient from "./GalleryClient";
import { Metadata } from "next";

export const revalidate = 0; // Fetch fresh data on every request

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.systemSettings.findFirst();
  return {
    title: `Photo Gallery | ${settings?.ministryName || "Harvest Ministries Nepal"}`,
    description: "Browse photos illustrating our church planting, leadership training, women's seminars, river baptisms, and disaster relief work across Nepal.",
  };
}

export default async function GalleryPage() {
  const dbMedia = await prisma.mediaFile.findMany({
    where: { type: "IMAGE" },
    orderBy: { createdAt: "desc" }
  });

  return <GalleryClient dbMedia={dbMedia} />;
}
