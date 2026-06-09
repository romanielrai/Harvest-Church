import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (name, email, subject, message)." },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "UNREAD"
      }
    });

    // Notify admins of new contact message (non-blocking)
    await prisma.notification.create({
      data: {
        title: "New Contact Message",
        message: `${name} sent a message regarding "${subject}".`
      }
    }).catch(() => {});

    return NextResponse.json(
      { message: "Message sent successfully!", data: contact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
