import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, eventId } = await req.json();

    if (!name || !email || !phone || !eventId) {
      return NextResponse.json(
        { error: "Please provide all required fields (name, email, phone, eventId)." },
        { status: 400 }
      );
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      return NextResponse.json(
        { error: "Specified event does not exist." },
        { status: 404 }
      );
    }

    // Create registration record
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        name,
        email,
        phone,
        status: "REGISTERED"
      }
    });

    // Notify admins about the new registration (optional: create audit/notification if needed)
    await prisma.notification.create({
      data: {
        title: "New Event Registration",
        message: `${name} has registered for "${event.title}".`
      }
    }).catch(() => {}); // non-blocking

    return NextResponse.json(
      { message: "Registration successful!", data: registration },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Event registration error:", error);
    return NextResponse.json(
      { error: "Failed to submit event registration. Please try again." },
      { status: 500 }
    );
  }
}
