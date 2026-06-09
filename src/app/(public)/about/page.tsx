import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Compass, ShieldAlert, Award } from "lucide-react";

export default function AboutPage() {
  const statementOfFaith = [
    "The Bible is the inspired, infallible, and sole authoritative Word of God.",
    "There is one God, eternally existent in three persons: Father, Son, and Holy Spirit.",
    "The deity of our Lord Jesus Christ, His virgin birth, His sinless life, His miracles, His vicarious and atoning death, His bodily resurrection, and His ascension to the right hand of the Father.",
    "Salvation is by grace alone, through faith in Jesus Christ, apart from human works.",
    "The personal, physical return of Jesus Christ in power and glory."
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">About Our Ministry</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Our Journey of Faith & Service
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Harvest Ministries Nepal was established in 2001 in Bhaktapur, Nepal. Starting as a small house fellowship of 3 people in a one-room home, God has faithfully expanded this ministry into a nationwide outreach network.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-slate-900 dark:text-white font-bold">The Story of Harvest Church</h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              In 2001, Pastor Satis Thapa started to work for Christ Jesus, preaching the good news of Jesus Christ in Bhaktapur and proclaiming, "Jesus is the Lord." The church began with intense prayer in a tiny, one-room home with just three people. Under the guidance of the Holy Spirit, the fellowship was named **"Harvest Church"**.
            </p>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              In 2005, Pastor Satis and his wife, Pastor Gita, took part in a theological study in Bangalore, India. Upon returning, the ministry experienced blessed growth. Today, the central Bhaktapur congregation has grown to over 75 active members.
            </p>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              Now, after 28 years of walking with Jesus, Pastor Satis and his team have established 5 sister fellowships across various districts under the umbrella of **"Harvest Ministries Nepal"**, pursuing the vision to plant gospel-centered fellowships in every corner of the nation.
            </p>
          </div>
          <div className="relative group rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
            <Image
              src="/images/img_page1_2.jpeg"
              alt="Pastor Satis and Pastor Gita"
              width={600}
              height={450}
              className="object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl inline-block">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              "My vision is to share the gospel, continue to plant churches, and help the poor, needy people in the far corners of Nepal where God leads and when God provides."
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl inline-block">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              To spread the Gospel of Jesus Christ across all 77 districts of Nepal, train indigenous leaders, establish self-multiplying local church branches, and manifest Christ's love through holistic social relief and community development.
            </p>
          </div>
        </div>

        {/* Statement of Faith */}
        <div className="bg-slate-100 dark:bg-slate-950 p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Theological Foundation</span>
            <h2 className="text-3xl font-serif text-slate-900 dark:text-white font-bold">Statement of Faith</h2>
          </div>
          <div className="max-w-4xl mx-auto grid gap-6">
            {statementOfFaith.map((point, index) => (
              <div key={index} className="flex gap-4 items-start bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-150 dark:border-slate-800">
                <div className="w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-1">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founders Profiles */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Our Leadership</span>
            <h2 className="text-3xl font-serif text-slate-900 dark:text-white font-bold">About the Founders</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Pastor Satis Thapa */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between">
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl font-serif">
                    ST
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Pastor Satis Thapa</h3>
                    <p className="text-xs text-secondary font-semibold uppercase tracking-wider">President & Elder Pastor</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Born in 1986 into a Hindu family, Pastor Satis accepted Lord Jesus Christ into his life on December 10, 1996. He was baptized on March 28, 1997. He received God's call to ministry in 2000, and since 2001 he has been walking and working joyfully for the expansion of God's Kingdom in Nepal.
                </p>
              </div>
              <div className="p-8 pt-0">
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Award className="w-4 h-4 text-primary" /> 28 Years in Faith</span>
                  <span>Estd. Harvest Church</span>
                </div>
              </div>
            </div>

            {/* Pastor Gita Karki */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col justify-between">
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl font-serif">
                    GK
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Pastor Gita Karki (Thapa)</h3>
                    <p className="text-xs text-secondary font-semibold uppercase tracking-wider">Co-Founder & Women's Leader</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pastor Gita Karki serves as the co-founder and oversees the Women's training seminars and family fellowships. She teaches and preaches to women leaders of different churches across Nepal. She addresses topics such as the role of ladies in ministry, supporting spouses in ministry, and Christian family values.
                </p>
              </div>
              <div className="p-8 pt-0">
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Award className="w-4 h-4 text-primary" /> Seminar Speaker</span>
                  <span>Bangalore Study (2005)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
