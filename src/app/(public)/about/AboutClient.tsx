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
  Building,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutClientProps {
  team: any[];
  faqs: any[];
  settings: any;
}

export default function AboutClient({ team, faqs, settings }: AboutClientProps) {
  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Newsletter Form State
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
      setFormMessage("Please fill out all required fields.");
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
      // Simulate API registration call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setFormMessage("Thank you! You have successfully subscribed to our frontlines newsletter.");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (err) {
      setFormStatus("error");
      setFormMessage("Failed to subscribe. Please try again later.");
    }
  };

  const statementOfFaith = [
    {
      title: "The Holy Scripture",
      text: "The Bible is the inspired, infallible, and sole authoritative Word of God, our ultimate rule of faith and conduct."
    },
    {
      title: "The Eternal Trinity",
      text: "There is one true God, eternally existent in three persons: Father, Son, and Holy Spirit, co-equal in power and glory."
    },
    {
      title: "Deity of Lord Jesus Christ",
      text: "His virgin birth, His sinless life, His miracles, His vicarious and atoning death, His bodily resurrection, and His ascension to the right hand of the Father."
    },
    {
      title: "Salvation by Grace",
      text: "Salvation is received by grace alone, through faith in Jesus Christ, apart from human works, leading to regeneration by the Holy Spirit."
    },
    {
      title: "The Blessed Hope",
      text: "The personal, physical return of our Lord Jesus Christ in power and glory to judge the living and the dead."
    }
  ];

  // Resolve team members (use dynamic database configuration if available, otherwise static fallbacks)
  const allTeamMembers = team.length > 0 ? team : [
    {
      name: "Pastor Satis Thapa",
      role: "President & Elder Pastor",
      bio: "Born into a Hindu family, Pastor Satis accepted Jesus Christ in 1996 and received God's call to ministry in 2000. He started Harvest Church in 2001 and oversees the nationwide church planting movement in Nepal.",
      image: "/images/img_page1_2.jpeg"
    },
    {
      name: "Pastor Gita Karki (Thapa)",
      role: "Co-Founder & Women's Leader",
      bio: "Pastor Gita Karki oversees women's training seminars and family fellowships across Nepal. She teaches and empowers female leaders on Christian values, supporting spouses, and active roles in ministry.",
      image: "/images/img_page5_3.jpeg"
    },
    {
      name: "Brother Romaniel Rai",
      role: "Ministry Operations & Media Coordinator",
      bio: "Romaniel coordinates local outreach logistics, maintains ministry communications, compiles report summaries, and manages tech configurations across the 6 branch fellowships in Nepal.",
      image: "/images/img_page5_1.jpeg"
    },
    {
      name: "Sister Sarita Thapa",
      role: "Child Sponsorship Manager",
      bio: "Sarita manages educational sponsorships, maintains files for children in remote mountain villages, and coordinates communications between sponsors and beneficiaries.",
      image: "/images/img_page4_17.jpeg"
    }
  ];

  // Merge static structured FAQs with database dynamic FAQs
  const faqItems = [
    {
      question: "How can I support Harvest Ministries Nepal?",
      answer: "",
      type: "support"
    },
    {
      question: "What is your Statement of Faith?",
      answer: "",
      type: "faith"
    },
    {
      question: "What are your core values?",
      answer: "",
      type: "values"
    },
    {
      question: "Is Harvest Ministries registered with the government?",
      answer: "",
      type: "registration"
    },
    ...faqs.map(f => ({
      question: f.question,
      answer: f.answer,
      type: "dynamic"
    }))
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 overflow-x-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[75vh] flex items-center justify-center bg-cover bg-center text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-805"
        style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/hero_background.png')" }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs uppercase tracking-widest text-primary font-bold">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" /> About Our Ministry
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif leading-tight tracking-tight text-white uppercase">
              Spreading the Gospel & Planting Churches across Nepal
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
              Harvest Ministries Nepal was established in 2001 in Bhaktapur. Guided by the Holy Spirit, we train local leaders, plant self-multiplying churches, and extend compassionate relief in the far corners of Nepal.
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
                <Play className="w-4 h-4 fill-white text-white" /> Watch Our Story
              </button>
            </div>
          </div>

          {/* Right Video Thumbnail Column */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 dark:border-slate-800 group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
              <Image 
                src="/images/img_page1_1.jpeg" 
                alt="Ministry Outreach Video Thumbnail" 
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-all duration-300 flex flex-col items-center justify-center" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="w-16 h-16 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </span>
                <span className="text-white text-xs uppercase tracking-wider font-semibold bg-slate-900/85 px-3 py-1.5 rounded-full backdrop-blur-sm shadow border border-white/5">
                  Play Video (2:30)
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. VIDEO MODAL DIALOG */}
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
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900/80 p-2.5 rounded-full hover:scale-105 transition-all z-10 border border-slate-800"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/4K76_p-m6Lg?autoplay=1"
                  title="Harvest Ministries Nepal Story Video"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. OUR MISSION SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Calling</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
            Our Mission & Purpose
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            We are creating a movement of faith, discipleship, and relief for communities across Nepal so they can witness the light of the Gospel in their villages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Meet Their Needs */}
          <div className="bg-white dark:bg-slate-950 p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800/80 hover:shadow-xl transition-all duration-300 space-y-6 group">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 fill-primary/10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-955 dark:text-white uppercase">
              Meet Physical & Spiritual Needs
            </h3>
            <p className="text-slate-655 dark:text-slate-400 leading-relaxed text-base">
              {settings?.mission || "Harvest Ministries Nepal responds to crises with compassion. We deliver emergency food relief, winter clothing, fresh water pumps, mosquito nets, and Bibles to remote Himalayan villages, expressing Christ’s love in tangible, life-saving ways."}
            </p>
            <div className="pt-2">
              <Link href="/projects" className="text-primary font-semibold hover:underline text-sm uppercase tracking-wider inline-flex items-center gap-1">
                Explore Relief Projects →
              </Link>
            </div>
          </div>

          {/* Card 2: Awaken the Church */}
          <div className="bg-white dark:bg-slate-955 p-8 sm:p-10 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800/80 hover:shadow-xl transition-all duration-300 space-y-6 group">
            <div className="p-4 bg-secondary/10 text-secondary rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-955 dark:text-white uppercase">
              Plant Churches & Train Leaders
            </h3>
            <p className="text-slate-655 dark:text-slate-400 leading-relaxed text-base">
              {settings?.vision || "We focus on local multiplication by equipping pastors and women leaders through chronological Bible storytelling, theology seminars, and church planting strategies. We strive to establish self-reliant, multiplying branches in all 77 districts of Nepal."}
            </p>
            <div className="pt-2">
              <Link href="/ministries" className="text-secondary font-semibold hover:underline text-sm uppercase tracking-wider inline-flex items-center gap-1">
                View Ministry Activities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY / HISTORY */}
      <section className="bg-slate-105 dark:bg-slate-955/20 border-y border-slate-200/50 dark:border-slate-800/40 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
              A Calling For Action: The Story of Harvest Church
            </h2>
            <div className="space-y-4 text-slate-655 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {settings?.history ? settings.history : (
                <>
                  <p>
                    In 2001, Pastor Satis Thapa stepped out in faith to preach the Gospel in Bhaktapur, proclaiming "Jesus is the Lord." The church began with intense prayer in a tiny, one-room home with just three people. Under the guidance of the Holy Spirit, the fellowship was named <strong className="text-slate-900 dark:text-white">"Harvest Church"</strong>.
                  </p>
                  <p>
                    In 2005, Pastor Satis and his wife, Pastor Gita, took part in a theological study in Bangalore, India. Upon returning, the ministry experienced blessed growth. Today, the central Bhaktapur congregation has grown to over 75 active members, serving as a hub for outreach.
                  </p>
                  <p>
                    Now, after more than two decades of ministry, Pastor Satis and his team have established 6 branch fellowships across various districts under the umbrella of <strong className="text-slate-900 dark:text-white">"Harvest Ministries Nepal"</strong>, pursuing the vision to plant gospel-centered fellowships in every corner of the nation.
                  </p>
                </>
              )}
            </div>
            <div className="pt-2">
              <Link 
                href="#statement-of-faith" 
                className="btn border border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-707 dark:text-slate-300 font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center"
              >
                Read Statement of Faith
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 relative">
            <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900 max-w-lg mx-auto">
              <Image 
                src="/images/img_page3_1.jpeg" 
                alt="Baptism and fellowship gathering in Nepal" 
                width={600}
                height={450}
                className="object-cover w-full h-[400px] transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent p-6 flex items-end">
                <p className="text-white text-xs uppercase tracking-wider font-semibold backdrop-blur-sm bg-black/40 px-4 py-2 rounded-full border border-white/10">
                  Outreach fellowship in remote Nepal, 2026
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. DYNAMIC STATS GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Stats Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Impact</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
              Building the Kingdom with your Help
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-xl">
              By working with indigenous leaders, we maximize local resources to plant fellowships, train pastors, distribute Bibles, and provide clean drinking water.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
              <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                <span className="block text-3xl sm:text-4xl font-extrabold text-primary font-serif mb-1">75+</span>
                <span className="block text-xs uppercase tracking-widest text-slate-505 font-bold">Active Members</span>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                <span className="block text-3xl sm:text-4xl font-extrabold text-primary font-serif mb-1">6</span>
                <span className="block text-xs uppercase tracking-widest text-slate-505 font-bold">Branch Churches</span>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                <span className="block text-3xl sm:text-4xl font-extrabold text-primary font-serif mb-1">28 Yr</span>
                <span className="block text-xs uppercase tracking-widest text-slate-550 font-bold">Walking in Faith</span>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800">
                <span className="block text-3xl sm:text-4xl font-extrabold text-primary font-serif mb-1">77</span>
                <span className="block text-xs uppercase tracking-widest text-slate-550 font-bold">Districts Vision</span>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800 col-span-2 sm:col-span-2">
                <span className="block text-3xl sm:text-4xl font-extrabold text-primary font-serif mb-1">100+</span>
                <span className="block text-xs uppercase tracking-widest text-slate-550 font-bold">Local Pastors Mentored</span>
              </div>
            </div>
          </div>

          {/* Stats Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 max-w-sm w-full">
              <Image 
                src="/images/img_page4_10.jpeg" 
                alt="Ministry Impact and Children outreach" 
                width={400}
                height={500}
                className="object-cover w-full h-[450px]"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300" />
            </div>
          </div>

        </div>
      </section>

      {/* 6. SENIOR PASTOR SPOTLIGHT */}
      <section className="py-24 bg-slate-100 dark:bg-slate-950/40 border-y border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 flex justify-center order-last md:order-first">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 max-w-sm w-full">
              <Image 
                src="/images/img_page1_2.jpeg" 
                alt="Pastor Satis Thapa and Wife Gita Thapa" 
                width={400}
                height={500}
                className="object-cover w-full h-[450px]"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-white p-5 border-t border-white/10 text-center">
                <h4 className="text-lg font-bold font-serif uppercase tracking-wide">Pastor Satis Thapa</h4>
                <p className="text-xs text-secondary font-semibold uppercase tracking-widest mt-1">Founder & Senior Pastor</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Leadership</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
              Meet our Senior Pastor: Satis Thapa
            </h2>
            <div className="space-y-4 text-slate-655 dark:text-slate-400 leading-relaxed">
              <p>
                Born in 1986 into a traditional Hindu family in Bhaktapur, Pastor Satis Thapa’s life took a revolutionary turn when he accepted Lord Jesus Christ into his life on December 10, 1996. He declared his faith through baptism on March 28, 1997.
              </p>
              <p>
                In 2000, Pastor Satis received a clear, divine call to full-time gospel outreach. Since founding Harvest Church in 2001 with just three members, he has dedicated his life to sharing the Good News and planting fellowships.
              </p>
              <p>
                Together with his wife, Pastor Gita, he pursues a holistic vision: equipping indigenous leaders through theological training and chronology-based Bible storytelling, planting local fellowships, and drill fresh water wells to meet physical needs.
              </p>
              <p className="italic text-slate-800 dark:text-slate-300 border-l-4 border-primary pl-4 font-serif">
                "My vision is to share the gospel, continue to plant churches, and help the poor, needy people in the far corners of Nepal where God leads and when God provides."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE TEAM / BOARD MEMBERS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Leadership</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
            Meet the Executive & Ministry Team
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            The dedicated team orchestrating church planting, women's training, child sponsorships, and operational support.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allTeamMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group"
            >
              {/* Profile Image */}
              <Image 
                src={member.image || "/images/img_page1_2.jpeg"} 
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Default Bottom Cover Name Tag */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-transparent p-6 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-lg font-bold text-white font-serif truncate">{member.name}</h3>
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-1">{member.role}</p>
              </div>

              {/* Bio Slide-Up Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/90 text-white p-6 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-505 ease-out z-10 border-t border-slate-800">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white font-serif border-b border-slate-850 pb-2 truncate">{member.name}</h3>
                  <h4 className="text-xs text-secondary font-semibold uppercase tracking-widest">{member.role}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-6">{member.bio}</p>
                  <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Harvest Team Member</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INTERACTIVE COLLAPSIBLE FAQ SECTION */}
      <section id="statement-of-faith" className="py-24 bg-slate-100 dark:bg-slate-955/20 border-y border-slate-200/50 dark:border-slate-800/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Statement & Information</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white uppercase leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors focus:outline-none"
                >
                  <span className="text-base sm:text-lg">{item.question}</span>
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
                      <div className="p-6 pt-0 border-t border-slate-105 dark:border-slate-800/60 text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
                        
                        {item.type === "support" && (
                          <div className="space-y-3">
                            <p>You can support our ongoing missionary outreach in remote districts through three primary ways:</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li><strong>Online:</strong> You can donate securely via credit card, ACH, or PayPal by clicking on our <Link href="/donate" className="text-primary font-semibold hover:underline">Donate Page</Link>.</li>
                              <li><strong>Child Sponsorship:</strong> Help sponsor educational needs for underprivileged children in mountain communities.</li>
                              <li><strong>Pastoral Seminars:</strong> Sponsor 1-3 day training seminars to equip local Nepalese pastors.</li>
                            </ul>
                            <p>Please contact us directly for wire transfer details or direct mailing instructions.</p>
                          </div>
                        )}

                        {item.type === "faith" && (
                          <div className="space-y-4">
                            <p>Our ministry stands firmly on the historic evangelical, orthodox Christian faith:</p>
                            {settings?.statementOfFaith ? (
                              <p className="text-sm leading-relaxed whitespace-pre-line text-slate-655 dark:text-slate-350">{settings.statementOfFaith}</p>
                            ) : (
                              <div className="space-y-3 pl-2">
                                {statementOfFaith.map((point, idx) => (
                                  <div key={idx} className="flex gap-3 items-start">
                                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <div>
                                      <strong className="text-slate-900 dark:text-white block text-sm">{point.title}</strong>
                                      <p className="text-xs text-slate-505 dark:text-slate-400 mt-0.5">{point.text}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {item.type === "values" && (
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <strong className="text-slate-900 dark:text-white block mb-1">Fearless Faith</strong>
                              <p className="text-xs">Reaching the remote corners of the Himalayas where resources are thin but spiritual need is high, rooted in constant prayer.</p>
                            </div>
                            <div>
                              <strong className="text-slate-900 dark:text-white block mb-1">Indigenous Multiplication</strong>
                              <p className="text-xs">Training local believers to plant self-multiplying, culturally relevant church branches in their own districts.</p>
                            </div>
                            <div>
                              <strong className="text-slate-905 dark:text-white block mb-1">Holistic Stewardship</strong>
                              <p className="text-xs">Delivering physical aid (clean water, food, warmth) alongside spiritual bread to address community struggles systematically.</p>
                            </div>
                            <div>
                              <strong className="text-slate-905 dark:text-white block mb-1">Exceptional Culture</strong>
                              <p className="text-xs">Nurturing continuous leadership growth, mutual support, and team fellowship based on core biblical family values.</p>
                            </div>
                          </div>
                        )}

                        {item.type === "registration" && (
                          <div className="space-y-2">
                            <p>
                              Yes. Harvest Ministries Nepal operates as an officially registered non-governmental organization (NGO) in Bhaktapur, Nepal.
                            </p>
                            <p>
                              We are affiliated with the <strong>Social Welfare Council (SWC) of Nepal</strong>, which oversees NGO operations, ensuring compliance with strict accountability rules, including independent annual financial audits.
                            </p>
                          </div>
                        )}

                        {item.type === "dynamic" && (
                          <p>{item.answer}</p>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. TRUST & INTEGRITY BADGES */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Stewardship</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white uppercase">
              Financial Integrity & Affiliations
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            <div className="glass-card px-8 py-5 rounded-2xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm max-w-xs hover:scale-102 transition-transform">
              <ShieldCheck className="w-10 h-10 text-primary shrink-0" />
              <div className="text-left">
                <span className="block text-sm font-bold text-slate-955 dark:text-white">SWC Affiliated</span>
                <span className="block text-xs text-slate-500">Social Welfare Council Nepal</span>
              </div>
            </div>

            <div className="glass-card px-8 py-5 rounded-2xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm max-w-xs hover:scale-102 transition-transform">
              <CheckCircle className="w-10 h-10 text-secondary shrink-0" />
              <div className="text-left">
                <span className="block text-sm font-bold text-slate-955 dark:text-white">Govt Registered</span>
                <span className="block text-xs text-slate-500">Bhaktapur CDO Registered</span>
              </div>
            </div>

            <div className="glass-card px-8 py-5 rounded-2xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm max-w-xs hover:scale-102 transition-transform">
              <Building className="w-10 h-10 text-slate-600 dark:text-slate-400 shrink-0" />
              <div className="text-left">
                <span className="block text-sm font-bold text-slate-955 dark:text-white">Audited Accounts</span>
                <span className="block text-xs text-slate-500">Annual Independent Audit</span>
              </div>
            </div>

            <div className="glass-card px-8 py-5 rounded-2xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800/60 shadow-sm max-w-xs hover:scale-102 transition-transform">
              <Target className="w-10 h-10 text-emerald-600 shrink-0" />
              <div className="text-left">
                <span className="block text-sm font-bold text-slate-955 dark:text-white">Direct Relief Flow</span>
                <span className="block text-xs text-slate-500">100% Dedicated Field Use</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA BANNER */}
      <section 
        className="relative py-28 px-4 sm:px-6 lg:px-8 text-center text-white bg-cover bg-center border-b border-slate-205 dark:border-slate-800"
        style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.85)), url('/images/img_page7_8.jpeg')" }}
      >
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest text-secondary font-bold">One Church. One Family.</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif uppercase tracking-tight text-white leading-tight">
            Be a lifeline for believers in Nepal
          </h2>
          <p className="text-lg md:text-xl text-slate-200 italic max-w-3xl mx-auto font-serif leading-relaxed">
            "Therefore, as we have opportunity, let us do good to all people, especially to those who belong to the family of believers." <span className="block text-sm uppercase tracking-widest text-slate-400 font-bold not-italic mt-2">— Galatians 6:10</span>
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

      {/* 11. INTERACTIVE NEWSLETTER FORM */}
      <section className="py-24 bg-slate-105 dark:bg-slate-955/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass-card p-8 sm:p-12 rounded-[2rem] border border-slate-200/85 dark:border-slate-800/85 shadow-xl relative overflow-hidden">
          
          {/* Subtle Background Accents */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-secondary/5 rounded-full blur-2xl" />

          <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Stay Connected</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-955 dark:text-white uppercase leading-snug">
              Subscribe to the Frontlines Prayer & News Alerts
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Get direct updates, moving testimonies of faith, urgent prayer requests, and stories of hope from our fellowships across Nepal.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="mt-8 grid sm:grid-cols-12 gap-4 relative z-10">
            <div className="sm:col-span-4">
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={formStatus === "loading"}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={formStatus === "loading"}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={formStatus === "loading"}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <div className="sm:col-span-12 mt-2 flex justify-center">
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="faith-gradient faith-gradient-hover text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 min-w-[200px]"
              >
                {formStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe Alerts
                  </>
                )}
              </button>
            </div>
          </form>

          <AnimatePresence>
            {formStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 p-4 rounded-xl bg-emerald-505/10 border border-emerald-505/20 text-emerald-600 dark:text-emerald-450 text-center text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>{formMessage}</span>
              </motion.div>
            )}

            {formStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center text-sm flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5 shrink-0" />
                <span>{formMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </main>
  );
}
