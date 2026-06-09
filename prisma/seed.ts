import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as crypto from "crypto";

const adapter = new PrismaBetterSqlite3({ url: "file:dev.db" });
const prisma = new PrismaClient({ adapter });

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  console.log("Seeding Harvest Ministries Nepal database...");

  // 1. Clean up existing data to allow repeated seeding safely
  await prisma.systemSettings.deleteMany().catch(() => {});
  await prisma.comment.deleteMany().catch(() => {});
  await prisma.blogPost.deleteMany().catch(() => {});
  await prisma.category.deleteMany().catch(() => {});
  await prisma.sponsorship.deleteMany().catch(() => {});
  await prisma.child.deleteMany().catch(() => {});
  await prisma.prayerRequest.deleteMany().catch(() => {});
  await prisma.volunteerAssignment.deleteMany().catch(() => {});
  await prisma.volunteer.deleteMany().catch(() => {});
  await prisma.donationReceipt.deleteMany().catch(() => {});
  await prisma.donation.deleteMany().catch(() => {});
  await prisma.eventRegistration.deleteMany().catch(() => {});
  await prisma.event.deleteMany().catch(() => {});
  await prisma.project.deleteMany().catch(() => {});
  await prisma.ministry.deleteMany().catch(() => {});
  await prisma.testimonial.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});

  // 2. Create Users (Super Admin & Managers with dynamic roles)
  const hashedPassword = hashPassword("password123");
  
  const superAdmin = await prisma.user.create({
    data: {
      name: "Pastor Satis Thapa",
      email: "admin@harvestnepal.org",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    },
  });

  const financialManager = await prisma.user.create({
    data: {
      name: "Pastor Gita Karki",
      email: "finance@harvestnepal.org",
      password: hashedPassword,
      role: "FINANCIAL_MANAGER",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    },
  });

  const volunteerCoordinator = await prisma.user.create({
    data: {
      name: "Ramesh Shrestha",
      email: "volunteer@harvestnepal.org",
      password: hashedPassword,
      role: "VOLUNTEER_COORDINATOR",
    },
  });

  console.log("Seeded basic administrative users.");

  // 3. Create System Settings (CMS)
  await prisma.systemSettings.create({
    data: {
      id: "singleton",
      ministryName: "Harvest Ministries Nepal",
      email: "info@harvestnepal.org",
      phone: "+977 1 6614488",
      address: "Changu Road, Bhaktapur, Nepal",
      facebookUrl: "https://facebook.com/harvestnepal",
      twitterUrl: "https://twitter.com/harvestnepal",
      instagramUrl: "https://instagram.com/harvestnepal",
      whatsappNumber: "+9779851088488",
      mission: "To spread the Gospel of Jesus Christ across Nepal, plant biblically-sound churches, train indigenous leaders, and demonstrate God's love through holistic community care and disaster relief.",
      vision: "To see a thriving, self-multiplying church in every village and city of Nepal, transforming communities spiritually, socially, and economically.",
      statementOfFaith: "We believe the Bible is the inspired, infallible Word of God. We believe in the Trinity: Father, Son, and Holy Spirit. We believe in the deity of Christ, His virgin birth, His atoning death on the cross, His bodily resurrection, and His personal return. Salvation is by grace alone, through faith in Jesus Christ.",
      history: "Harvest Ministries Nepal was founded in 2008 in Bhaktapur, Nepal. Starting as a small house fellowship under the leadership of Pastor Satis Thapa, the ministry quickly recognized the vast spiritual and physical needs in the Himalayan nation. Over the last 18 years, the ministry has grown from a single home group into a nationwide network, establishing dozens of churches, conducting intensive leadership seminars, and providing critical community relief in the wake of the 2015 earthquake and recurring monsoonal floods.",
      aboutText: "Harvest Ministries Nepal is a registered non-governmental Christian ministry dedicated to spiritual renewal and social upliftment. Based in the ancient city of Bhaktapur, we serve as a hub for theological training, church planting support, child sponsorship networks, and grassroots humanitarian aid. Our work is driven by local Nepalese believers who understand the language, culture, and unique challenges of our remote communities.",
      logoUrl: "/images/logo.png",
    },
  });

  console.log("Seeded default SystemSettings.");

  // 4. Create Ministries (10 core categories)
  const ministriesData = [
    {
      title: "Gospel Outreach",
      slug: "gospel-outreach",
      category: "Gospel Outreach",
      coverImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800",
      description: "Taking the message of hope to remote villages in the Himalayas. Our evangelism teams travel by foot to share the good news, distribute biblical literature, and build community relationships in areas that have never heard the gospel.",
      stats: JSON.stringify({ villagesReached: 120, conversions: 2450 }),
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
      ]),
      active: true,
    },
    {
      title: "Church Planting",
      slug: "church-planting",
      category: "Church Planting",
      coverImage: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800",
      description: "Establishing local fellowships in rural districts. We believe a healthy local church is the most effective vehicle for long-term spiritual growth. We assist in buying land, constructing simple meeting halls, and support local pastors.",
      stats: JSON.stringify({ churchesPlanted: 42, activeMembers: 3200 }),
      active: true,
    },
    {
      title: "Pastor Training",
      slug: "pastor-training",
      category: "Pastor Training",
      coverImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
      description: "Equipping rural leaders with sound theology and practical ministry skills. Through regular seminars in Bhaktapur and regional classrooms, we train local pastors who lack access to formal seminary education.",
      stats: JSON.stringify({ pastorsTrained: 180, seminarsHeld: 48 }),
      active: true,
    },
    {
      title: "Leadership Development",
      slug: "leadership-development",
      category: "Leadership Development",
      coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
      description: "Cultivating the next generation of ministry and community leaders. We mentor young men and women in Biblical stewardship, administration, and modern skills, preparing them to lead with integrity.",
      stats: JSON.stringify({ leadersMentored: 75, internshipPrograms: 5 }),
      active: true,
    },
    {
      title: "Women's Ministry",
      slug: "womens-ministry",
      category: "Women's Ministry",
      coverImage: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800",
      description: "Empowering Nepalese women through discipleship, literacy programs, and vocational tailoring training. We help women discover their value in Christ and build sustainable livelihoods to support their families.",
      stats: JSON.stringify({ womenTrained: 110, sewingMachinesDistributed: 65 }),
      active: true,
    },
    {
      title: "Bible Story Training",
      slug: "bible-story-training",
      category: "Bible Story Training",
      coverImage: "https://images.unsplash.com/photo-1504052434569-70ad58565b90?w=800",
      description: "Teaching chronological Bible storytelling techniques. Since many rural communities in Nepal rely on oral traditions, this training enables leaders to effectively communicate scriptures to oral learners.",
      stats: JSON.stringify({ storytellingGraduates: 220, activeStoryCircles: 34 }),
      active: true,
    },
    {
      title: "Baptism Ministry",
      slug: "baptism-ministry",
      category: "Baptism Ministry",
      coverImage: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800",
      description: "Rejoicing in public declarations of faith. We support pastors as they baptize new believers in mountain rivers and local church baptistries, guiding them through solid pre-baptism discipleship.",
      stats: JSON.stringify({ totalBaptisms: 840, baptisedThisYear: 105 }),
      active: true,
    },
    {
      title: "Community Relief",
      slug: "community-relief",
      category: "Community Relief",
      coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      description: "Providing physical help in times of crisis. From earthquake reconstruction to monsoonal food supplies and warm winter blankets, we mobilize volunteer teams to serve our hurting neighbors in Christ's name.",
      stats: JSON.stringify({ householdsServed: 4500, emergencyResponses: 12 }),
      active: true,
    },
    {
      title: "Children's Ministry",
      slug: "childrens-ministry",
      category: "Children's Ministry",
      coverImage: "https://images.unsplash.com/photo-1472176878880-b2d921319747?w=800",
      description: "Nurturing children with Sunday schools, after-school tutoring, and holiday Bible clubs. We provide a safe environment where Nepalese kids can play, learn, and experience the love of Jesus.",
      stats: JSON.stringify({ sundaySchoolKids: 620, tutoringCenters: 3 }),
      active: true,
    },
    {
      title: "Youth Ministry",
      slug: "youth-ministry",
      category: "Youth Ministry",
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
      description: "Engaging high school and college students through fellowship groups, sports ministries, and worship nights. We support youth as they navigate peer pressure and discover their vocational purpose.",
      stats: JSON.stringify({ activeYouths: 310, youthCampsConducted: 8 }),
      active: true,
    },
  ];

  for (const m of ministriesData) {
    await prisma.ministry.create({ data: m });
  }

  console.log("Seeded 10 core Ministries.");

  // 5. Create Projects (Ongoing, Completed, Upcoming)
  const projectsData = [
    {
      title: "Bhaktapur Faith Center Construction",
      slug: "bhaktapur-faith-center",
      description: "Building a multi-purpose church building and training center in Bhaktapur. This center will house our theological seminars, youth activities, and serve as a shelter during local emergencies.",
      budget: 4500000,
      progress: 68,
      beneficiaries: 800,
      status: "ONGOING",
      coverImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800",
    },
    {
      title: "Mountain Fresh Water Wells",
      slug: "mountain-fresh-water-wells",
      description: "Drilling clean tube wells in three remote villages of Sindhupalchok. These wells prevent water-borne illnesses and save women and children hours of rigorous mountain climbing each day.",
      budget: 1200000,
      progress: 100,
      beneficiaries: 1500,
      status: "COMPLETED",
      coverImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
    },
    {
      title: "Winter Relief 2026",
      slug: "winter-relief-2026",
      description: "Distributing thick winter blankets, heavy jackets, and heaters to high-altitude communities in Solukhumbu facing freezing weather without proper insulation.",
      budget: 800000,
      progress: 0,
      beneficiaries: 350,
      status: "UPCOMING",
      coverImage: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800",
    },
  ];

  for (const p of projectsData) {
    await prisma.project.create({ data: p });
  }

  console.log("Seeded ongoing and completed Projects.");

  // 6. Create Events
  const eventsData = [
    {
      title: "Indigenious Pastors Conference 2026",
      slug: "indigenous-pastors-conference-2026",
      description: "A three-day spiritual retreat and theological training conference for rural pastors. The registration fee is fully sponsored, providing food, lodging, and books for all participants.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days in future
      location: "Harvest Center, Bhaktapur",
      category: "Pastor Training",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    },
    {
      title: "Youth Summer Fellowship Camp",
      slug: "youth-summer-fellowship-camp",
      description: "An interactive, high-energy camp for teens featuring worship sessions, team building, biblically-grounded discussions, and competitive games in scenic Pokhara.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // 60 days in future
      location: "Lake Side Lodge, Pokhara",
      category: "Youth Ministry",
      image: "https://images.unsplash.com/photo-1526976780723-d3d63b530ae3?w=800",
    },
  ];

  for (const e of eventsData) {
    const createdEvent = await prisma.event.create({ data: e });
    
    // Seed standard registrations for event
    await prisma.eventRegistration.createMany({
      data: [
        {
          eventId: createdEvent.id,
          name: "Sanjay Shrestha",
          email: "sanjay@gmail.com",
          phone: "9841234567",
          status: "REGISTERED",
        },
        {
          eventId: createdEvent.id,
          name: "Maya Tamang",
          email: "maya@yahoo.com",
          phone: "9809876543",
          status: "REGISTERED",
        }
      ]
    });
  }

  console.log("Seeded Events and default Registrations.");

  // 7. Create Children Profiles for Sponsorship
  const childrenData = [
    {
      name: "Binod Tamang",
      age: 8,
      gender: "Male",
      school: "Bhaktapur Public Academy",
      familyInfo: "Binod lives with his widowed mother who works as a brick kiln laborer. Her meager wages are barely enough for rent and one meal a day.",
      sponsorshipNeed: 3500.0,
      photos: JSON.stringify(["https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400"]),
      progressReports: JSON.stringify([
        { date: "2025-12-15", grade: "Class 2", health: "Good", notes: "Binod completed his final exams with high marks in math. He loves drawing." }
      ]),
    },
    {
      name: "Prerna Shrestha",
      age: 10,
      gender: "Female",
      school: "Himalayan Sunrise School",
      familyInfo: "Prerna's father is physically disabled and unable to work. Her mother sells vegetables on the street. They have three children and need assistance with education costs.",
      sponsorshipNeed: 3500.0,
      photos: JSON.stringify(["https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400"]),
      progressReports: JSON.stringify([
        { date: "2025-11-20", grade: "Class 4", health: "Excellent", notes: "Prerna has been attending tutoring classes daily. Her teacher reports she is very helpful and polite." }
      ]),
    },
  ];

  for (const c of childrenData) {
    await prisma.child.create({ data: c });
  }

  console.log("Seeded sponsor-ready Child profiles.");

  // 8. Create Blog Categories and Posts
  const categoryNews = await prisma.category.create({
    data: { name: "Ministry News", slug: "ministry-news" },
  });

  const categoryRelief = await prisma.category.create({
    data: { name: "Disaster Relief", slug: "disaster-relief" },
  });

  await prisma.blogPost.create({
    data: {
      title: " सिंधुपालचोक Rural Outreach: Reaching the Unreached",
      slug: "sindhupalchok-rural-outreach-2026",
      summary: "Our gospel team recently climbed five hours to reach a remote mountain village in Sindhupalchok, sharing the message of faith and love.",
      content: "<p>Our mobile evangelism teams recently returned from an intensive five-day outreach in the remote heights of Sindhupalchok. Due to rough terrain and lack of paved roads, our team traveled by foot, carrying heavy backpacks containing scriptures, basic health supplies, and food packets.</p><p>We held simple open-air meetings where we shared chronological stories of the bible. Over eighty villagers attended our evening story circle. We are deeply grateful to God for protecting the team and opening doors in Sindhupalchok. Plans are underway to establish a regular home fellowship in this village next month.</p>",
      coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      authorName: "Pastor Satis Thapa",
      categoryId: categoryNews.id,
      tags: "Outreach, Evangelism, Sindhupalchok",
      seoTitle: "Sindhupalchok Outreach - Harvest Ministries Nepal",
      seoDescription: "Read the powerful testimony of our gospel team reaching remote Sindhupalchok villages.",
    },
  });

  await prisma.blogPost.create({
    data: {
      title: "Bhaktapur Center Roof Completed!",
      slug: "bhaktapur-center-roof-completed",
      summary: "Thank you sponsors! The roof structure of the Bhaktapur Faith Center has been completed successfully ahead of the monsoon.",
      content: "<p>We are thrilled to share that through your generous contributions, we have successfully poured the concrete roof slab for the second floor of the Bhaktapur multi-purpose center. This milestone is crucial as the monsoon rains will begin shortly, and having the structural roof in place allows our indoor plaster and electrical teams to work uninterrupted.</p><p>When finished, this three-story center will serve as a central training hall, administrative offices, and a safe community shelter. We ask for your continued prayers for the finishing budget and volunteer safety.</p>",
      coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
      authorName: "Pastor Gita Karki",
      categoryId: categoryRelief.id,
      tags: "Construction, Bhaktapur, Center",
      seoTitle: "Bhaktapur Center Construction Progress - Harvest Ministries",
      seoDescription: "Construction update for the Bhaktapur Faith Center roof slab completion.",
    },
  });

  console.log("Seeded Blog Categories and Posts.");

  // 9. Create Testimonials
  const testimonialsData = [
    {
      authorName: "Sarah Jenkins",
      role: "Short-term Volunteer, USA",
      content: "Spending two weeks with Harvest Ministries Nepal in Bhaktapur opened my eyes. Pastor Satis and Gita represent the true heart of servanthood. Seeing the children study with such joy in the tutoring classes was incredibly beautiful.",
      category: "VOLUNTEER",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    },
    {
      authorName: "Bir Bahadur Tamang",
      role: "Sindhupalchok Village Leader",
      content: "When the landslide blocked our clean water stream, we didn't know what to do. Harvest Ministries Nepal didn't just bring words; they brought tools, pipes, and engineers. Today, our whole village has clean drinking water directly from the tap.",
      category: "COMMUNITY",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      authorName: "David Davidson",
      role: "Child Sponsor, Canada",
      content: "Sponsoring Binod has been an absolute blessing. The monthly progress reports are very transparent and detailed. Writing letters back and forth has allowed us to connect personally. I highly recommend sponsoring a child through Harvest.",
      category: "SPONSOR",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }

  console.log("Seeded dynamic Testimonials.");

  // 10. Seed dynamic mock donations for analytics dashboards
  const donationData = [
    { donorName: "John Doe", donorEmail: "john@gmail.com", amount: 15000, purpose: "General Fund", type: "ONE_TIME", date: new Date("2026-01-15") },
    { donorName: "Jane Smith", donorEmail: "jane@yahoo.com", amount: 3500, purpose: "Child Sponsorship", type: "MONTHLY", date: new Date("2026-02-10") },
    { donorName: "Robert Miller", donorEmail: "robert@outlook.com", amount: 50000, purpose: "Church Planting", type: "ONE_TIME", date: new Date("2026-03-25") },
    { donorName: "David Davidson", donorEmail: "david@sponsors.org", amount: 10500, purpose: "Child Sponsorship", type: "MONTHLY", date: new Date("2026-04-12") },
    { donorName: "Grace Mission", donorEmail: "grace@missions.net", amount: 120000, purpose: "Pastor Training", type: "ONE_TIME", date: new Date("2026-05-18") },
    { donorName: "Local Church Pokhara", donorEmail: "pokharachurch@gmail.com", amount: 8000, purpose: "Community Relief", type: "ONE_TIME", date: new Date("2026-05-28") },
  ];

  for (const d of donationData) {
    const createdDonation = await prisma.donation.create({ data: d });
    
    // Create a unique receipt serial e.g., REC-2026-0001
    const serial = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    await prisma.donationReceipt.create({
      data: {
        receiptId: serial,
        donationId: createdDonation.id,
        amount: createdDonation.amount,
        date: createdDonation.date,
        donorName: createdDonation.donorName,
        donorEmail: createdDonation.donorEmail,
        purpose: createdDonation.purpose || "General Support",
        qrCode: `VERIFY-${serial}`,
        pdfUrl: `/receipts/${serial}.pdf`,
      }
    });
  }

  // 11. Seed prayer requests
  await prisma.prayerRequest.create({
    data: {
      requesterName: "Sushila Karki",
      requesterEmail: "sushila@gmail.com",
      category: "HEALING",
      content: "Please pray for my mother who is undergoing surgery tomorrow morning for a heart valve replacement in Kathmandu.",
      isAnonymous: false,
      isPrivate: false,
      status: "PENDING",
    }
  });

  await prisma.prayerRequest.create({
    data: {
      requesterName: "Anonymous",
      requesterEmail: null,
      category: "SPIRITUAL_GROWTH",
      content: "Please pray for our family house fellowship in a remote village, that we would remain strong in faith despite social pressure and local opposition.",
      isAnonymous: true,
      isPrivate: false,
      status: "ANSWERED",
      answer: "Praise God, our family fellowship has grown, and three neighbors recently joined our prayer group with open hearts!",
    }
  });

  console.log("Seeded database successfully!");
}

main()
  .catch((e) => {
    console.error("Error in seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
