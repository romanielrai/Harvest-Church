import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Shield, Users, Mail, DollarSign, Calendar, LogOut } from "lucide-react";
import SignOutButton from "./SignOutButton";

export const revalidate = 0; // Dynamic rendering

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch counts and dynamic listings for management
  const [
    registrations,
    messages,
    donations,
    testimonials,
    userCount,
    activeMinistries,
    totalDonationsAggregate
  ] = await Promise.all([
    prisma.eventRegistration.findMany({ include: { event: true }, orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.donation.findMany({ orderBy: { date: "desc" } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.user.count(),
    prisma.ministry.count(),
    prisma.donation.aggregate({ _sum: { amount: true } })
  ]);

  const totalDonations = totalDonationsAggregate._sum.amount ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Header bar */}
      <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 py-4 px-8 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-serif font-bold text-lg text-white">Harvest Administrative Panel</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-white font-bold">{session.user?.name}</p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase">{(session.user as any).role || "Admin"}</p>
          </div>
          <SignOutButton />
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Total Donations</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-white font-serif">NPR {totalDonations.toLocaleString()}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Contact Messages</span>
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-white font-serif">{messages.length} Records</p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Event Signups</span>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-white font-serif">{registrations.length} Registrations</p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Platform Users</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-white font-serif">{userCount} Admins</p>
          </div>
        </div>

        {/* Database Tables Details */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Section 1: Event Registrations */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white border-b border-slate-800 pb-3">Event Registrations</h2>
            
            {registrations.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No registrations logged in the database yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {registrations.map((reg) => (
                  <div key={reg.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-400">
                      <span>{reg.name}</span>
                      <span className="text-primary">{reg.phone}</span>
                    </div>
                    <p className="text-slate-300">Registered for: <strong className="text-white">{(reg as any).event?.title}</strong></p>
                    <div className="flex justify-between text-slate-500 text-[10px]">
                      <span>{reg.email}</span>
                      <span>{new Date(reg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Contact Messages */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white border-b border-slate-800 pb-3">Contact Messages</h2>
            
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No messages logged in the database yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-400">
                      <span>{msg.name} ({msg.email})</span>
                      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-primary font-bold">Subject: {msg.subject}</p>
                    <p className="text-slate-300 bg-slate-900/40 p-2.5 rounded border border-slate-800/40">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Donations */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white border-b border-slate-800 pb-3">Recent Donations</h2>
            
            {donations.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No donations processed yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {donations.map((don) => (
                  <div key={don.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2 text-xs flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="font-bold text-white">{don.donorName}</p>
                      <p className="text-[10px] text-slate-500">{don.donorEmail} | {don.purpose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{don.currency} {don.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500">{new Date(don.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Testimonials */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold font-serif text-white border-b border-slate-800 pb-3">Testimonials</h2>
            
            {testimonials.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No testimonials submitted yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {testimonials.map((test) => (
                  <div key={test.id} className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-400">
                      <span>{test.authorName} ({test.role})</span>
                      <span className="text-primary font-bold text-[10px]">{test.category}</span>
                    </div>
                    <p className="text-slate-350 italic">"{test.content}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
