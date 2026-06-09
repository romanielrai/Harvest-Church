import React from "react";
import Image from "next/image";
import { Globe, Users, Anchor, HelpCircle, Heart, BookOpen, GraduationCap } from "lucide-react";

export default function MinistriesPage() {
  const ministries = [
    {
      title: "Sharing Gospel",
      subtitle: "Outreach & Evangelism",
      description: "We share the Gospel of Jesus Christ to unreached people across Nepal. Our teams organize community-centered gospel programs to share God's message of eternal salvation in remote mountain regions.",
      details: [
        "Handout Gospel Tracts: Distributing biblical literature directly in local dialects.",
        "Gospel Music Programs: Conducting fellowship music gatherings in local villages.",
        "Telling Bible Stories: Sharing chronological stories of Christ around campfires.",
        "Jesus Movie Screenings: Hosting mobile projector shows in public areas."
      ],
      icon: Globe,
      color: "border-red-500/30 text-red-500 bg-red-500/5",
      images: ["/images/img_page2_1.jpeg", "/images/img_page2_3.jpeg", "/images/img_page2_7.jpeg"]
    },
    {
      title: "Training Church Leaders",
      subtitle: "Theological Discipleship (2 Timothy 2:2)",
      description: "We train local pastors and elders by organizing intensive 1-3 day conferences and seminars. Our focus is to encourage and equip leaders who serve in remote mountain districts, making them strong, doctrinally sound, and hardworking shepherds.",
      details: [
        "Scripture Focus: Anchored on 2 Timothy 2:2 ('entrust to reliable people who will also be qualified to teach others').",
        "Practical Theology: Focus on sermon preparation, biblical counseling, and church administration.",
        "Pastoral Care: Providing free lodging, food, and reference materials for rural delegates."
      ],
      icon: GraduationCap,
      color: "border-amber-500/30 text-amber-500 bg-amber-500/5",
      images: ["/images/img_page3_1.jpeg", "/images/img_page3_3.jpeg", "/images/img_page3_5.jpeg"]
    },
    {
      title: "Planting Churches",
      subtitle: "District Fellowships",
      description: "Our long-term vision is to plant biblically-sound churches in every single one of the 77 districts of Nepal. So far, the Lord has enabled us to establish 6 active branches / daughter churches in different districts.",
      details: [
        "Indigenous Shepherds: Matching newly planted fellowships with trained local pastors.",
        "Meeting Spaces: Supporting the construction of simple community prayer halls.",
        "Decentralized Outreaches: Using daughter churches as bases for rural medical and relief outreach."
      ],
      icon: Anchor,
      color: "border-blue-500/30 text-blue-500 bg-blue-500/5",
      images: ["/images/img_page3_7.jpeg", "/images/img_page3_8.jpeg", "/images/img_page3_11.jpeg"]
    },
    {
      title: "Helping Needy People",
      subtitle: "Holistic Relief & Community Development",
      description: "We help the poor and needy people in the far corners of Nepal where God leads and when God provides. We reach out to both Christian and non-Christian communities with emergency relief to demonstrate the practical love of God.",
      details: [
        "Food Distribution: Distributing bags of rice, lentils, salt, and cooking oil during crises.",
        "Clean Water Initiatives: Drilling and installing local water pumps to prevent water-borne illnesses.",
        "Essential Support: Supplying warm clothes, heavy blankets, sleepers, and mosquito nets to low-income families."
      ],
      icon: HelpCircle,
      color: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5",
      images: ["/images/img_page4_1.jpeg", "/images/img_page4_5.jpeg", "/images/img_page4_6.jpeg"]
    },
    {
      title: "Women's Training/Seminars",
      subtitle: "Empowerment & Family Care",
      description: "Led by Pastor Gita Karki, this ministry provides specialized teaching and encouragement for women leaders of different churches. In Nepal, there are very few female teachers to train women leaders. This ministry bridges that critical gap.",
      details: [
        "Role of Ladies in Ministry: Discipleship and teaching strategies for women leaders.",
        "Husband & Family Support: Seminars on how to support spouses in ministry and raise children with biblical values.",
        "Livelihood & Counseling: Integrating spiritual health with counseling for mothers and young girls."
      ],
      icon: Users,
      color: "border-purple-500/30 text-purple-500 bg-purple-500/5",
      images: ["/images/img_page5_1.jpeg", "/images/img_page5_3.jpeg", "/images/img_page5_8.jpeg"]
    },
    {
      title: "Baptisms",
      subtitle: "Public Proclamation of Faith (Matthew 28:19-20)",
      description: "Following the Great Commission of Jesus Christ, we walk alongside new converts through pre-baptism counseling and celebrate public declarations of faith through river baptisms.",
      details: [
        "Scripture Focus: Matthew 28:19 ('Go therefore and make disciples of all nations, baptizing them...').",
        "Community Witness: Gathering fellowships at mountain streams and local rivers for public baptism services.",
        "Discipleship Continuity: Placing baptized members immediately into regular home fellowships."
      ],
      icon: Heart,
      color: "border-teal-500/30 text-teal-500 bg-teal-500/5",
      images: ["/images/img_page6_1.jpeg", "/images/img_page6_4.jpeg", "/images/img_page6_7.jpeg"]
    },
    {
      title: "Bible Stories Tellers Training",
      subtitle: "Oral Discipleship Curriculum",
      description: "Since 2017, we have run a specialized program to teach 108 chronological Bible stories from the Old and New Testaments. Because many rural communities in Nepal rely heavily on oral traditions, sharing scriptures through stories is highly effective.",
      details: [
        "Graduation Stats: Trained 138 students so far who actively tell Bible stories in their neighborhoods.",
        "Curriculum Scope: Takes 2 years of bi-monthly intensive classes to master the 108 core biblical stories.",
        "Multiplication Index: Graduates immediately form new storytelling circles to make and build disciples."
      ],
      icon: BookOpen,
      color: "border-indigo-500/30 text-indigo-500 bg-indigo-500/5",
      images: ["/images/img_page7_1.jpeg", "/images/img_page7_8.jpeg", "/images/img_page7_11.jpeg"]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">What We Do</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Our 7 Core Ministry Activities
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            By the grace of God, we serve remote and poor districts in Nepal. Explore the 7 pillars of our outreach, training, and community relief efforts.
          </p>
        </div>

        {/* Ministries List */}
        <div className="space-y-24">
          {ministries.map((min, index) => {
            const Icon = min.icon;
            return (
              <div 
                key={index} 
                className={`grid lg:grid-cols-12 gap-12 items-center border-t border-slate-200 dark:border-slate-800 pt-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content Column */}
                <div className={`lg:col-span-7 space-y-6 ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                  <div className={`flex items-center gap-3 border rounded-full px-4 py-1.5 w-fit font-bold uppercase tracking-wider text-xs ${min.color}`}>
                    <Icon className="w-4 h-4" />
                    <span>{min.subtitle}</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                    {index + 1}. {min.title}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {min.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {min.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 items-start">
                        <span className="text-primary mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Photos Grid Column */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  {/* First big image */}
                  <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800/50 h-56 relative">
                    <Image
                      src={min.images[0]}
                      alt={`${min.title} photo 1`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Two small images */}
                  <div className="rounded-xl overflow-hidden shadow-md border border-slate-200/50 dark:border-slate-800/50 h-32 relative">
                    <Image
                      src={min.images[1]}
                      alt={`${min.title} photo 2`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md border border-slate-200/50 dark:border-slate-800/50 h-32 relative">
                    <Image
                      src={min.images[2]}
                      alt={`${min.title} photo 3`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
