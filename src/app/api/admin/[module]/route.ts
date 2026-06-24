import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import * as crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// Map modules to authorized roles
const ROLE_PERMISSIONS: Record<string, string[]> = {
  settings: ["SUPER_ADMIN", "SEO_MANAGER"],
  media: ["SUPER_ADMIN", "MEDIA_MANAGER"],
  blogs: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  services: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  portfolio: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  testimonials: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  team: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  faqs: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  leads: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  users: ["SUPER_ADMIN"],
  analytics: ["SUPER_ADMIN", "CONTENT_MANAGER"],
};

async function authorize(module: string): Promise<{ authorized: boolean; role?: string; user?: any }> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { authorized: false };
  }

  const role = (session.user as any).role || "USER";
  
  // SUPER_ADMIN overrides all checks
  if (role === "SUPER_ADMIN") {
    return { authorized: true, role, user: session.user };
  }

  const allowedRoles = ROLE_PERMISSIONS[module] || [];
  if (allowedRoles.includes(role)) {
    return { authorized: true, role, user: session.user };
  }

  return { authorized: false, role, user: session.user };
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  try {
    const { module } = await params;
    const auth = await authorize(module);
    if (!auth.authorized) {
      return NextResponse.json({ error: "Access Denied: Insufficient Permissions" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    switch (module) {
      case "settings":
        let settings = await prisma.systemSettings.findFirst();
        if (!settings) {
          settings = await prisma.systemSettings.create({
            data: {
              ministryName: "Harvest Ministries Nepal",
              email: "info@harvestnepal.org",
              phone: "+977 1 6610000",
              address: "Bhaktapur, Nepal",
              mission: "To spread the Gospel of Jesus Christ across all 77 districts of Nepal.",
              vision: "To plant churches and share the gospel in remote villages.",
              statementOfFaith: "The Bible is the inspired Word of God...",
              history: "Established in 2001 in Bhaktapur...",
              aboutText: "Harvest Church is a vibrant house fellowship..."
            }
          });
        }
        return NextResponse.json(settings);

      case "blogs":
        if (id) {
          const blog = await prisma.blogPost.findUnique({ where: { id } });
          return NextResponse.json(blog);
        }
        const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(blogs);

      case "services":
        if (id) {
          const service = await prisma.ministry.findUnique({ where: { id } });
          return NextResponse.json(service);
        }
        const services = await prisma.ministry.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(services);

      case "portfolio":
        if (id) {
          const project = await prisma.project.findUnique({ where: { id } });
          return NextResponse.json(project);
        }
        const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(projects);

      case "testimonials":
        if (id) {
          const testimonial = await prisma.testimonial.findUnique({ where: { id } });
          return NextResponse.json(testimonial);
        }
        const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(testimonials);

      case "team":
        if (id) {
          const member = await prisma.teamMember.findUnique({ where: { id } });
          return NextResponse.json(member);
        }
        const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
        return NextResponse.json(team);

      case "faqs":
        if (id) {
          const faq = await prisma.faq.findUnique({ where: { id } });
          return NextResponse.json(faq);
        }
        const faqs = await prisma.faq.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(faqs);

      case "leads":
        if (id) {
          const lead = await prisma.contactMessage.findUnique({ where: { id } });
          return NextResponse.json(lead);
        }
        const leads = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(leads);

      case "users":
        const users = await prisma.user.findMany({
          select: { id: true, name: true, email: true, role: true, createdAt: true },
          orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(users);

      case "media":
        const mediaFiles = await prisma.mediaFile.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json(mediaFiles);

      case "analytics":
        const [
          totalDonationsSum,
          donationsCount,
          eventSignupsCount,
          messagesCount,
          activeUsersCount,
          blogPostsCount,
          projectsCount,
          ministriesCount
        ] = await Promise.all([
          prisma.donation.aggregate({ _sum: { amount: true } }),
          prisma.donation.count(),
          prisma.eventRegistration.count(),
          prisma.contactMessage.count(),
          prisma.user.count(),
          prisma.blogPost.count(),
          prisma.project.count(),
          prisma.ministry.count(),
        ]);

        const recentDonations = await prisma.donation.findMany({
          take: 6,
          orderBy: { date: "desc" },
          select: { donorName: true, amount: true, currency: true, date: true }
        });

        // Dynamic monthly stats simulation
        const monthlyStats = [
          { month: "Jan", donations: 12000, signups: 8 },
          { month: "Feb", donations: 19000, signups: 15 },
          { month: "Mar", donations: 15000, signups: 10 },
          { month: "Apr", donations: 24000, signups: 22 },
          { month: "May", donations: totalDonationsSum._sum.amount ? totalDonationsSum._sum.amount * 0.4 : 31000, signups: eventSignupsCount || 12 },
          { month: "Jun", donations: totalDonationsSum._sum.amount ? totalDonationsSum._sum.amount * 0.6 : 45000, signups: eventSignupsCount + 5 || 28 }
        ];

        return NextResponse.json({
          metrics: {
            donationsTotal: totalDonationsSum._sum.amount ?? 0,
            donationsCount,
            eventSignupsCount,
            messagesCount,
            activeUsersCount,
            blogPostsCount,
            projectsCount,
            ministriesCount
          },
          recentDonations,
          monthlyStats
        });

      default:
        return NextResponse.json({ error: "Invalid module request" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("GET error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  try {
    const { module } = await params;
    const auth = await authorize(module);
    if (!auth.authorized) {
      return NextResponse.json({ error: "Access Denied: Insufficient Permissions" }, { status: 403 });
    }

    // Specially handle media uploads
    if (module === "media") {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      const folder = (formData.get("folder") as string) || "general";
      if (!file) {
        return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);

      const url = `/uploads/${safeName}`;

      const mediaType = file.type.startsWith("image") 
        ? "IMAGE" 
        : file.type.startsWith("video") 
          ? "VIDEO" 
          : "DOCUMENT";

      const record = await prisma.mediaFile.create({
        data: {
          url,
          name: file.name,
          type: mediaType,
          size: file.size,
          folder: folder.toLowerCase().trim()
        }
      });

      return NextResponse.json({ message: "File uploaded successfully", data: record }, { status: 201 });
    }

    const data = await req.json();

    switch (module) {
      case "blogs":
        let category = await prisma.category.findFirst();
        if (!category) {
          category = await prisma.category.create({
            data: { name: "General", slug: "general" }
          });
        }
        
        const blogSlug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const blog = await prisma.blogPost.create({
          data: {
            title: data.title,
            slug: blogSlug,
            content: data.content,
            summary: data.summary || "",
            coverImage: data.coverImage || "/images/img_page1_1.jpeg",
            authorName: data.authorName || auth.user?.name || "Admin",
            authorImage: data.authorImage || null,
            published: data.published !== false,
            categoryId: category.id,
            tags: data.tags || null,
            seoTitle: data.seoTitle || null,
            seoDescription: data.seoDescription || null,
          }
        });
        return NextResponse.json(blog, { status: 201 });

      case "services":
        const serviceSlug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const service = await prisma.ministry.create({
          data: {
            title: data.title,
            slug: serviceSlug,
            category: data.category || "General Outreach",
            coverImage: data.coverImage || "/images/img_page1_1.jpeg",
            description: data.description || "",
            active: data.active !== false
          }
        });
        return NextResponse.json(service, { status: 201 });

      case "portfolio":
        const projSlug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const project = await prisma.project.create({
          data: {
            title: data.title,
            slug: projSlug,
            description: data.description || "",
            budget: parseFloat(data.budget) || 0,
            progress: parseFloat(data.progress) || 0,
            status: data.status || "ONGOING",
            coverImage: data.coverImage || "/images/img_page1_1.jpeg",
            beneficiaries: parseInt(data.beneficiaries) || 0
          }
        });
        return NextResponse.json(project, { status: 201 });

      case "testimonials":
        const testimonial = await prisma.testimonial.create({
          data: {
            authorName: data.authorName,
            role: data.role || "Member",
            content: data.content,
            category: data.category || "COMMUNITY",
            avatarUrl: data.avatarUrl || null,
            videoUrl: data.videoUrl || null
          }
        });
        return NextResponse.json(testimonial, { status: 201 });

      case "team":
        const member = await prisma.teamMember.create({
          data: {
            name: memberNameClean(data.name),
            role: data.role,
            bio: data.bio || "",
            image: data.image || "/images/img_page1_2.jpeg",
            order: parseInt(data.order) || 0
          }
        });
        return NextResponse.json(member, { status: 201 });

      case "faqs":
        const faq = await prisma.faq.create({
          data: {
            question: data.question,
            answer: data.answer
          }
        });
        return NextResponse.json(faq, { status: 201 });

      case "users":
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
          return NextResponse.json({ error: "Email already registered." }, { status: 400 });
        }
        const newUser = await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            password: hashPassword(data.password),
            role: data.role || "USER"
          }
        });
        return NextResponse.json({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }, { status: 201 });

      default:
        return NextResponse.json({ error: "Operation not supported on module" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json({ error: error.message || "Failed to create resource" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  try {
    const { module } = await params;
    const auth = await authorize(module);
    if (!auth.authorized) {
      return NextResponse.json({ error: "Access Denied: Insufficient Permissions" }, { status: 403 });
    }

    const data = await req.json();
    const id = data.id;

    if (module !== "settings" && !id) {
      return NextResponse.json({ error: "Resource identifier ID is missing." }, { status: 400 });
    }

    switch (module) {
      case "settings":
        let currentSettings = await prisma.systemSettings.findFirst();
        if (!currentSettings) {
          currentSettings = await prisma.systemSettings.create({
            data: {
              mission: "",
              vision: "",
              statementOfFaith: "",
              history: "",
              aboutText: ""
            }
          });
        }
        const updatedSettings = await prisma.systemSettings.update({
          where: { id: currentSettings.id },
          data: {
            ministryName: data.ministryName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            facebookUrl: data.facebookUrl,
            twitterUrl: data.twitterUrl,
            instagramUrl: data.instagramUrl,
            whatsappNumber: data.whatsappNumber,
            mission: data.mission,
            vision: data.vision,
            statementOfFaith: data.statementOfFaith,
            history: data.history,
            logoUrl: data.logoUrl,
            aboutText: data.aboutText,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription,
            seoKeywords: data.seoKeywords,
            homepageLayout: data.homepageLayout
          }
        });
        return NextResponse.json(updatedSettings);

      case "blogs":
        const updatedBlog = await prisma.blogPost.update({
          where: { id },
          data: {
            title: data.title,
            slug: data.slug,
            content: data.content,
            summary: data.summary,
            coverImage: data.coverImage,
            authorName: data.authorName,
            published: data.published,
            tags: data.tags,
            seoTitle: data.seoTitle,
            seoDescription: data.seoDescription
          }
        });
        return NextResponse.json(updatedBlog);

      case "services":
        const updatedService = await prisma.ministry.update({
          where: { id },
          data: {
            title: data.title,
            slug: data.slug,
            category: data.category,
            coverImage: data.coverImage,
            description: data.description,
            active: data.active
          }
        });
        return NextResponse.json(updatedService);

      case "portfolio":
        const updatedProject = await prisma.project.update({
          where: { id },
          data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            budget: parseFloat(data.budget) || 0,
            progress: parseFloat(data.progress) || 0,
            status: data.status,
            coverImage: data.coverImage,
            beneficiaries: parseInt(data.beneficiaries) || 0
          }
        });
        return NextResponse.json(updatedProject);

      case "testimonials":
        const updatedTestimonial = await prisma.testimonial.update({
          where: { id },
          data: {
            authorName: data.authorName,
            role: data.role,
            content: data.content,
            category: data.category,
            avatarUrl: data.avatarUrl,
            videoUrl: data.videoUrl
          }
        });
        return NextResponse.json(updatedTestimonial);

      case "team":
        const updatedMember = await prisma.teamMember.update({
          where: { id },
          data: {
            name: memberNameClean(data.name),
            role: data.role,
            bio: data.bio,
            image: data.image,
            order: parseInt(data.order) || 0
          }
        });
        return NextResponse.json(updatedMember);

      case "faqs":
        const updatedFaq = await prisma.faq.update({
          where: { id },
          data: {
            question: data.question,
            answer: data.answer
          }
        });
        return NextResponse.json(updatedFaq);

      case "leads":
        const updatedLead = await prisma.contactMessage.update({
          where: { id },
          data: {
            status: data.status // UNREAD, READ, REPLIED
          }
        });
        return NextResponse.json(updatedLead);

      case "users":
        const updateData: any = { role: data.role };
        if (data.password) {
          updateData.password = hashPassword(data.password);
        }
        if (data.name) {
          updateData.name = data.name;
        }
        const updatedUser = await prisma.user.update({
          where: { id },
          data: updateData
        });
        return NextResponse.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role });

      default:
        return NextResponse.json({ error: "Operation not supported on module" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: error.message || "Failed to update resource" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  try {
    const { module } = await params;
    const auth = await authorize(module);
    if (!auth.authorized) {
      return NextResponse.json({ error: "Access Denied: Insufficient Permissions" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Resource identifier ID parameter is missing." }, { status: 400 });
    }

    switch (module) {
      case "blogs":
        await prisma.blogPost.delete({ where: { id } });
        return NextResponse.json({ message: "Post deleted successfully" });

      case "services":
        await prisma.ministry.delete({ where: { id } });
        return NextResponse.json({ message: "Service deleted successfully" });

      case "portfolio":
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ message: "Project deleted successfully" });

      case "testimonials":
        await prisma.testimonial.delete({ where: { id } });
        return NextResponse.json({ message: "Testimonial deleted successfully" });

      case "team":
        await prisma.teamMember.delete({ where: { id } });
        return NextResponse.json({ message: "Team member deleted successfully" });

      case "faqs":
        await prisma.faq.delete({ where: { id } });
        return NextResponse.json({ message: "FAQ deleted successfully" });

      case "leads":
        await prisma.contactMessage.delete({ where: { id } });
        return NextResponse.json({ message: "Lead record deleted successfully" });

      case "users":
        // Protect the logged-in super admin from self-deletion
        if (id === auth.user?.id) {
          return NextResponse.json({ error: "Self-deletion is not permitted." }, { status: 400 });
        }
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ message: "User deleted successfully" });

      case "media":
        const mediaFile = await prisma.mediaFile.findUnique({ where: { id } });
        if (mediaFile) {
          // If it is a local upload, clean up from disk
          if (mediaFile.url.startsWith("/uploads/")) {
            const diskPath = path.join(process.cwd(), "public", mediaFile.url);
            await unlink(diskPath).catch(() => {});
          }
          await prisma.mediaFile.delete({ where: { id } });
        }
        return NextResponse.json({ message: "Media deleted successfully" });

      default:
        return NextResponse.json({ error: "Operation not supported on module" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete resource" }, { status: 500 });
  }
}

// Clean helper
function memberNameClean(name: string): string {
  // Strip tags if any, clean up spacing
  return name.replace(/<[^>]*>?/gm, "").trim();
}
