import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ReportGenerator } from "@/lib/report-generator";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const donationId = searchParams.get("id");

    if (!donationId) {
      return new NextResponse("Missing donation id parameter.", { status: 400 });
    }

    const receiptData = await prisma.donationReceipt.findUnique({
      where: { donationId },
      include: { donation: true }
    });

    if (!receiptData) {
      return new NextResponse("Receipt not found.", { status: 404 });
    }

    // Call high-fidelity HTML generator
    const html = ReportGenerator.generateReceiptHTML({
      receiptId: receiptData.receiptId,
      donorName: receiptData.donorName,
      donorEmail: receiptData.donorEmail,
      donorPhone: receiptData.donation.donorPhone,
      amount: receiptData.amount,
      currency: receiptData.donation.currency,
      purpose: receiptData.purpose,
      date: receiptData.date,
      paymentType: "Online Simulated"
    });

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
    });
  } catch (error: any) {
    console.error("Receipt generation error:", error);
    return new NextResponse("Failed to load receipt.", { status: 500 });
  }
}
