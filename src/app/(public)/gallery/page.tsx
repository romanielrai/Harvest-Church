"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

type GalleryItem = {
  src: string;
  category: string;
  alt: string;
};

// Generate list of 82 images mapped to correct categories based on PDF page extractions
const generateGalleryItems = (): GalleryItem[] => {
  const items: GalleryItem[] = [];

  // Page 1: Founders
  items.push({ src: "/images/img_page1_2.jpeg", category: "Founders", alt: "Pastor Satis Thapa and Pastor Gita Karki" });

  // Page 2: Sharing Gospel (13 images)
  for (let i = 1; i <= 13; i++) {
    items.push({
      src: `/images/img_page2_${i}.jpeg`,
      category: "Outreach",
      alt: `Gospel sharing activity & outreach in local fellowship - Image ${i}`
    });
  }

  // Page 3: Leader Seminars & Church Plants (11 images)
  for (let i = 1; i <= 6; i++) {
    items.push({
      src: `/images/img_page3_${i}.jpeg`,
      category: "Seminars",
      alt: `Indigenous Pastors conference & leadership seminar - Image ${i}`
    });
  }
  for (let i = 7; i <= 11; i++) {
    items.push({
      src: `/images/img_page3_${i}.jpeg`,
      category: "Churches",
      alt: `Harvest sister church plant fellowship - Image ${i}`
    });
  }

  // Page 4: Relief Aid (19 images)
  for (let i = 1; i <= 19; i++) {
    items.push({
      src: `/images/img_page4_${i}.jpeg`,
      category: "Relief",
      alt: `Delivering food bags, winter clothes, and water pump drilling - Image ${i}`
    });
  }

  // Page 5: Women's Training (9 images)
  for (let i = 1; i <= 9; i++) {
    items.push({
      src: `/images/img_page5_${i}.jpeg`,
      category: "Women",
      alt: `Pastor Gita Karki teaching at women's leadership training - Image ${i}`
    });
  }

  // Page 6: Baptisms (15 images)
  for (let i = 1; i <= 15; i++) {
    items.push({
      src: `/images/img_page6_${i}.jpeg`,
      category: "Baptisms",
      alt: `Baptism celebration in mountain river - Image ${i}`
    });
  }

  // Page 7: Bible Storytelling (13 images)
  for (let i = 1; i <= 13; i++) {
    items.push({
      src: `/images/img_page7_${i}.jpeg`,
      category: "Bible Stories",
      alt: `Bible Storytelling graduation and training seminar - Image ${i}`
    });
  }

  return items;
};

export default function GalleryPage() {
  const allItems = generateGalleryItems();
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Founders", "Outreach", "Seminars", "Churches", "Relief", "Women", "Baptisms", "Bible Stories"];

  const filteredItems = filter === "All" 
    ? allItems 
    : allItems.filter(item => item.category === filter);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    const prevIdx = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIdx);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    const nextIdx = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIdx);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl inline-block">
            <Camera className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Our Ministry Photo Gallery
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Browse through {allItems.length} authentic photos illustrating our church planting, leadership training, women's seminars, river baptisms, and disaster relief work across Nepal.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm cursor-pointer ${
                filter === cat
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group aspect-square relative rounded-2xl overflow-hidden shadow-md border border-slate-200/40 dark:border-slate-800/40 cursor-pointer bg-slate-200 dark:bg-slate-950"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs font-semibold line-clamp-2 leading-relaxed">
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-primary transition p-2 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white hover:text-primary transition text-3xl font-bold p-4 select-none cursor-pointer"
            >
              &#10094;
            </button>

            {/* Main Image Container */}
            <div className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center space-y-4">
              <div className="relative w-[85vw] h-[60vh] max-w-4xl">
                <Image
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-center text-white px-4 max-w-2xl">
                <span className="text-xs text-primary uppercase font-bold tracking-widest block mb-1">
                  {filteredItems[lightboxIndex].category}
                </span>
                <p className="text-sm text-slate-350 leading-relaxed font-semibold">
                  {filteredItems[lightboxIndex].alt}
                </p>
                <span className="text-xs text-slate-500 mt-2 block">
                  Image {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
            </div>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-primary transition text-3xl font-bold p-4 select-none cursor-pointer"
            >
              &#10095;
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
