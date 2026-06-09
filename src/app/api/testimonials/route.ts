import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { authorName, role, content, category } = await req.json();

    if (!authorName || !role || !content || !category) {
      return NextResponse.json(
        { error: "Please fill in all fields (authorName, role, content, category)." },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        authorName,
        role,
        content,
        category
      }
    });

    // Notify admins of new testimonial (non-blocking)
    await prisma.notification.create({
      data: {
        title: "New Testimonial Submitted",
        message: `${authorName} submitted feedback as a ${category}.`
      }
    }).catch(() => {});

    return NextResponse.json(
      { message: "Testimonial submitted successfully!", data: testimonial },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit testimonial. Please try again." },
      { status: 500 }
    );
  }
}
