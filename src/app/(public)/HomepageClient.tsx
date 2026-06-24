"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Award, 
  Heart, 
  Globe, 
  Users, 
  Anchor, 
  HelpCircle, 
  Play, 
  X, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Send,
  Loader2,
  Calendar,
  Building,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HomepageClientProps {
  settings: any;
  stats: any;
  blogs: any[];
  ministries: any[];
  projects: any[];
  team: any[];
  faqs: any[];
}

export default function HomepageClient({ 
  settings, 
  stats, 
  blogs, 
  ministries, 
  projects, 
  team, 
  faqs 
}: HomepageClientProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Newsletter form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setFormStatus("error");
      setFormMessage("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormStatus("error");
      setFormMessage("Please enter a valid email address.");
      return;
    }

    setFormStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setFormMessage("Successfully subscribed to frontlines updates!");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (err) {
      setFormStatus("error");
      setFormMessage("Failed to subscribe. Try again later.");
    }
  };

  // Default section order parsed from database settings
  const layoutOrder = settings.homepageLayout 
    ? settings.homepageLayout.split(",") 
    : ["hero", "mission", "story", "stats", "pastor", "team", "faq", "badges", "cta", "newsletter"];

  // Render individual sections dynamically
  const renderSection = (sectionKey: string) => {
    switch (sectionKey) {
      
      // 1. HERO BANNER
      case "hero":
        return (
          <section 
            key="hero"
            className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800"
            style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/hero_background.png')` }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
              
              <div className="md:col-span-7 space-y-6 text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs uppercase tracking-widest text-primary font-bold">
                  Est. 2001 | Bhaktapur, Nepal
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif leading-tight tracking-tight text-white uppercase">
                  {settings.ministryName || "Harvest Ministries Nepal"}
                </h1>
                <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
                  {settings.aboutText || "Sowing seeds of faith and harvesting fruit of eternal hope. We train indigenous leaders, plant churches, and help the poor in the far corners of Nepal."}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                  <Link 
                    href="/donate" 
                    className="faith-gradient faith-gradient-hover text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white" /> Support Our Mission
                  </Link>
                  <button 
                    onClick={() => setIsVideoOpen(true)}
                    className="bg-slate-800/80 hover:bg-slate-950 text-white font-semibold py-3.5 px-8 rounded-full border border-slate-700 hover:scale-105 transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" /> Watch Our Story
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 dark:border-slate-800 group cursor-pointer animate-pulse-slow" onClick={() => setIsVideoOpen(true)}>
                  <Image 
                    src="/images/img_page1_1.jpeg" 
                    alt="Ministry Outreach Video Thumbnail" 
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-all duration-300 flex flex-col items-center justify-center" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <span className="w-16 h-16 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </span>
                    <span className="text-white text-xs uppercase tracking-wider font-semibold bg-slate-900/80 px-3 py-1 rounded-full border border-white/5">
                      Play Testimony Video
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        );

      // 2. MISSION GOALS
      case "mission":
        return (
          <section key="mission" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Call</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
                Our Strategic Focus
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Reaching the poorest villages in the remote corners of the Himalayas with physical and spiritual support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-950 p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800/80 hover:shadow-xl transition-all duration-300 space-y-6 group">
                <div className="p-4 bg-primary/10 text-primary rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 fill-primary/10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-955 dark:text-white uppercase">
                  Holistic relief and child sponsorships
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  {settings.mission || "Providing critical community aid (clean water pumps, winter clothes, food supplies, and school sponsorships) to support marginalized Nepalese families."}
                </p>
                <div className="pt-2">
                  <Link href="/projects" className="text-primary font-semibold hover:underline text-sm uppercase tracking-wider inline-flex items-center gap-1">
                    Relief Projects →
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950 p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800/80 hover:shadow-xl transition-all duration-300 space-y-6 group">
                <div className="p-4 bg-secondary/10 text-secondary rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-955 dark:text-white uppercase">
                  Planting fellowships & Leader training
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                  {settings.vision || "Training indigenous pastors and women leaders to plant self-reliant, multiplying house church branches across all 77 districts of Nepal."}
                </p>
                <div className="pt-2">
                  <Link href="/ministries" className="text-secondary font-semibold hover:underline text-sm uppercase tracking-wider inline-flex items-center gap-1">
                    Our Activities →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );

      // 3. CHURCH TIMELINE STORY
      case "story":
        return (
          <section key="story" className="bg-slate-100 dark:bg-slate-955/20 border-y border-slate-200/50 dark:border-slate-800/40 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 space-y-6">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Timeline</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
                  How God has Faithfully Led Us
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    In 2001, Pastor Satis Thapa started to work for Christ Jesus in Bhaktapur with intense prayer in a tiny, one-room home. Beginning as a house fellowship of only three people, the fellowship was named <strong>"Harvest Church"</strong>.
                  </p>
                  <p>
                    Following theological studies in 2005, the congregation expanded blessed growth. Today, the central Bhaktapur fellowship serves as a hub of ministry, coordinating active outreaches in the remote areas of Nepal.
                  </p>
                </div>
                <div className="pt-2">
                  <Link 
                    href="/about" 
                    className="border border-slate-350 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold py-3.5 px-8 rounded-full text-xs uppercase tracking-wider"
                  >
                    Read Detailed Story
                  </Link>
                </div>
              </div>
              
              <div className="md:col-span-6 flex justify-center">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 max-w-md w-full aspect-video md:aspect-[4/3]">
                  <Image src="/images/img_page3_3.jpeg" alt="" fill className="object-cover" />
                </div>
              </div>
            </div>
          </section>
        );

      // 4. DYNAMIC IMPACT STATS
      case "stats":
        return (
          <section key="stats" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Summary stats</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
                  Expanding nationwide fellowships
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                  <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                    <span className="block text-3xl font-extrabold text-primary font-serif mb-1">75+</span>
                    <span className="block text-xs uppercase tracking-widest text-slate-505 font-bold">Active Members</span>
                  </div>
                  <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                    <span className="block text-3xl font-extrabold text-primary font-serif mb-1">{stats.projects || 3}</span>
                    <span className="block text-xs uppercase tracking-widest text-slate-505 font-bold">Ongoing Projects</span>
                  </div>
                  <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                    <span className="block text-3xl font-extrabold text-primary font-serif mb-1">6</span>
                    <span className="block text-xs uppercase tracking-widest text-slate-505 font-bold">Church Branches</span>
                  </div>
                  <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                    <span className="block text-3xl font-extrabold text-primary font-serif mb-1">77</span>
                    <span className="block text-xs uppercase tracking-widest text-slate-505 font-bold">Districts vision</span>
                  </div>
                  <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800 col-span-2">
                    <span className="block text-3xl font-extrabold text-primary font-serif mb-1">{stats.volunteers || 12}+</span>
                    <span className="block text-xs uppercase tracking-widest text-slate-505 font-bold">Active Mission Volunteers</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-850">
                <Image src="/images/img_page4_10.jpeg" alt="" width={400} height={500} className="object-cover w-full h-[400px]" />
              </div>
            </div>
          </section>
        );

      // 5. PASTOR SPOTLIGHT
      case "pastor":
        return (
          <section key="pastor" className="py-24 bg-slate-100 dark:bg-slate-950/40 border-y border-slate-200/50 dark:border-slate-800/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center">
              
              <div className="md:col-span-5 flex justify-center order-last md:order-first">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 max-w-sm w-full">
                  <Image src="/images/img_page1_2.jpeg" alt="" width={400} height={500} className="object-cover w-full h-[450px]" />
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-white p-5 text-center">
                    <h4 className="text-base font-bold font-serif uppercase tracking-wide">Pastor Satis Thapa</h4>
                    <span className="block text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">Founder & Elder Pastor</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Founder testimony</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
                  Preaching that "Jesus is Lord"
                </h2>
                <p className="text-slate-650 dark:text-slate-400 leading-relaxed text-base">
                  Pastor Satis accepted Christ in 1996 and was baptized in 1997. Since 2001, he and Pastor Gita have served families in remote mountain villages, building church communities, training leaders, and meeting immediate physical needs.
                </p>
                <p className="italic text-slate-800 dark:text-slate-350 border-l-4 border-primary pl-4 font-serif text-sm">
                  "Sowing the Gospel of Jesus Christ across all 77 districts of Nepal, training indigenous leaders, and establishing local church branches."
                </p>
              </div>

            </div>
          </section>
        );

      // 6. TEAM MEMBERS
      case "team":
        return (
          <section key="team" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-xs uppercase tracking-widest text-primary font-bold">Ministry team</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
                Our Leaders & Directors
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.length === 0 ? (
                // Fallback static team members if db is empty
                [
                  { name: "Pastor Satis Thapa", role: "Founder & Senior Pastor", bio: "Preaching and planting churches since 2001.", image: "/images/img_page1_2.jpeg" },
                  { name: "Pastor Gita Karki Thapa", role: "Women's Seminars Leader", bio: "Empowering ladies and family fellowships.", image: "/images/img_page5_3.jpeg" }
                ].map((member, idx) => (
                  <div key={idx} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-850 group">
                    <Image src={member.image} alt="" fill className="object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-white p-5 text-center">
                      <h3 className="text-sm font-bold font-serif">{member.name}</h3>
                      <p className="text-[9px] text-secondary font-bold uppercase tracking-wider mt-1">{member.role}</p>
                    </div>
                  </div>
                ))
              ) : (
                team.slice(0, 4).map((member, idx) => (
                  <div key={idx} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-850 group">
                    <Image src={member.image || "/images/img_page1_2.jpeg"} alt="" fill className="object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-white p-5 text-center group-hover:opacity-0 transition-opacity">
                      <h3 className="text-sm font-bold font-serif truncate">{member.name}</h3>
                      <p className="text-[9px] text-secondary font-bold uppercase tracking-wider mt-1">{member.role}</p>
                    </div>
                    <div className="absolute inset-0 bg-slate-950/90 text-white p-5 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-sm font-bold font-serif border-b border-slate-800 pb-1.5">{member.name}</h3>
                      <p className="text-[9px] text-secondary font-bold uppercase tracking-wider mt-1">{member.role}</p>
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-4 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        );

      // 7. FREQUENTLY FAQS
      case "faq":
        return (
          <section key="faq" className="py-24 bg-slate-105 dark:bg-slate-955/20 border-y border-slate-200/50 dark:border-slate-800/40">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Faqs</span>
                <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white uppercase">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.length === 0 ? (
                  <p className="text-sm text-slate-500 italic text-center">No FAQ records configured in dashboard settings.</p>
                ) : (
                  faqs.map((faq, index) => (
                    <div key={faq.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800 overflow-hidden">
                      <button 
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-6 text-left font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors focus:outline-none"
                      >
                        <span className="text-base font-semibold">{faq.question}</span>
                        {openFaqIndex === index ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {openFaqIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        );

      // 8. STEWARDSHIP BADGES
      case "badges":
        return (
          <section key="badges" className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
              <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white uppercase">Stewardship & Integrity</h2>
              <div className="flex flex-wrap justify-center gap-10">
                <div className="glass-card px-6 py-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:scale-102 transition-transform">
                  <ShieldCheck className="w-9 h-9 text-primary shrink-0" />
                  <div className="text-left text-xs">
                    <strong className="block text-slate-950 dark:text-white">SWC Affiliated</strong>
                    <span className="text-slate-500">Social Welfare Council Nepal</span>
                  </div>
                </div>
                <div className="glass-card px-6 py-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:scale-102 transition-transform">
                  <CheckCircle className="w-9 h-9 text-secondary shrink-0" />
                  <div className="text-left text-xs">
                    <strong className="block text-slate-950 dark:text-white">Registered NGO</strong>
                    <span className="text-slate-500">Local Bhaktapur Registered</span>
                  </div>
                </div>
                <div className="glass-card px-6 py-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:scale-102 transition-transform">
                  <Building className="w-9 h-9 text-slate-550 dark:text-slate-400 shrink-0" />
                  <div className="text-left text-xs">
                    <strong className="block text-slate-950 dark:text-white">Audited Accounts</strong>
                    <span className="text-slate-500">Annual Independent Audit</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      // 9. CTA BANNER
      case "cta":
        return (
          <section 
            key="cta"
            className="relative py-28 px-4 sm:px-6 lg:px-8 text-center text-white bg-cover bg-center border-b border-slate-200 dark:border-slate-800"
            style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.85)), url('/images/img_page7_8.jpeg')` }}
          >
            <div className="max-w-4xl mx-auto space-y-6 relative z-10">
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">One Church. One Family.</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif uppercase tracking-tight text-white leading-tight">
                Be a lifeline for believers in Nepal
              </h2>
              <p className="text-base md:text-lg text-slate-200 italic max-w-3xl mx-auto font-serif leading-relaxed">
                "Therefore, as we have opportunity, let us do good to all people, especially to those who belong to the family of believers." <span className="block text-xs uppercase tracking-widest text-slate-450 font-bold not-italic mt-2">— Galatians 6:10</span>
              </p>
              <div className="pt-4">
                <Link 
                  href="/donate" 
                  className="faith-gradient faith-gradient-hover text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2"
                >
                  Donate Today
                </Link>
              </div>
            </div>
          </section>
        );

      // 10. NEWSLETTER FORM
      case "newsletter":
        return (
          <section key="newsletter" className="py-24 bg-slate-100 dark:bg-slate-950/40 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto glass-card p-8 sm:p-12 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 shadow-xl relative overflow-hidden">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Stay Connected</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-955 dark:text-white uppercase leading-snug">
                  Subscribe to the Frontlines Prayer & News Alerts
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Get direct updates, testimonies of faith, and prayer requests from our church branches across Nepal.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="mt-8 grid sm:grid-cols-12 gap-4 relative z-10">
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-12 mt-2 flex justify-center">
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-3 px-8 rounded-xl shadow-md text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 min-w-[200px]"
                  >
                    {formStatus === "loading" ? "Subscribing..." : "Subscribe Alerts"}
                  </button>
                </div>
              </form>

              {formStatus === "success" && (
                <div className="mt-4 p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-center text-xs font-semibold">
                  {formMessage}
                </div>
              )}
              {formStatus === "error" && (
                <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center text-xs font-semibold">
                  {formMessage}
                </div>
              )}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans overflow-x-hidden">
      
      {/* Dynamic sections mapped in admin visual builder order */}
      {layoutOrder.map((sectionKey: string) => renderSection(sectionKey.trim()))}

      {/* Embedded video player modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-850"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900/80 p-2.5 rounded-full z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/4K76_p-m6Lg?autoplay=1"
                  title="Story Video"
                  allow="autoplay; fullscreen"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
