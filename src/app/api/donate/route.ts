import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { donorName, donorEmail, donorPhone, amount, currency, type, purpose } = await req.json();

    if (!donorName || !donorEmail || !amount || !currency || !type || !purpose) {
      return NextResponse.json(
        { error: "Please fill in all required fields (donorName, donorEmail, amount, currency, type, purpose)." },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Donation amount must be greater than zero." },
        { status: 400 }
      );
    }

    // 1. Create Donation entry
    const donation = await prisma.donation.create({
      data: {
        donorName,
        donorEmail,
        donorPhone: donorPhone || null,
        amount,
        currency,
        type,
        purpose,
        status: "COMPLETED"
      }
    });

    // 2. Generate unique serial for receipt
    const year = new Date().getFullYear();
    const count = await prisma.donationReceipt.count();
    const serial = `REC-${year}-${String(count + 1).padStart(4, "0")}`;

    // 3. Create Receipt entry
    const receipt = await prisma.donationReceipt.create({
      data: {
        receiptId: serial,
        donationId: donation.id,
        amount,
        donorName,
        donorEmail,
        purpose,
        pdfUrl: `/api/donate/receipt?id=${donation.id}`,
        qrCode: `VERIFY-${serial}`
      }
    });

    // Notify admins of new donation (non-blocking)
    await prisma.notification.create({
      data: {
        title: "New Donation Received",
        message: `${donorName} donated ${currency} ${amount.toLocaleString()} for "${purpose}".`
      }
    }).catch(() => {});

    return NextResponse.json(
      { 
        message: "Donation logged successfully!", 
        receipt: {
          id: donation.id,
          receiptId: receipt.receiptId,
          amount: donation.amount,
          currency: donation.currency,
          donorName: donation.donorName,
          purpose: donation.purpose,
          date: donation.date
        } 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Donation processing error:", error);
    return NextResponse.json(
      { error: "Failed to process donation. Please try again." },
      { status: 500 }
    );
  }
}
