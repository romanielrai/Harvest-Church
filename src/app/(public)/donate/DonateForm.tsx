"use client";

import React, { useState } from "react";
import { CreditCard, Heart, Printer } from "lucide-react";

export default function DonateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NPR");
  const [type, setType] = useState("ONE_TIME");
  const [purpose, setPurpose] = useState("General Fund");
  
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReceipt(null);

    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: name,
          donorEmail: email,
          donorPhone: phone || null,
          amount: parseFloat(amount),
          currency,
          type,
          purpose
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process donation.");
      }

      setReceipt(data.receipt);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (receipt) {
    return (
      <div className="space-y-6 text-center py-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
          ✓
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Thank You For Your Support!</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Your generous donation of <strong>{receipt.currency} {receipt.amount.toLocaleString()}</strong> has been processed successfully. 
          </p>
        </div>

        {/* Receipt Box */}
        <div className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 text-left max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-400">
            <span>Receipt Serial</span>
            <span className="text-primary">{receipt.receiptId}</span>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-slate-400">Donor Name:</span>
              <span className="font-semibold">{receipt.donorName}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-400">Purpose:</span>
              <span className="font-semibold">{receipt.purpose}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-400">Date:</span>
              <span className="font-semibold">{new Date(receipt.date).toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <a
            href={`/api/donate/receipt?id=${receipt.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-sm transition shadow-md hover:scale-105"
          >
            <Printer className="w-4 h-4" /> Print PDF Receipt
          </a>
          <button
            onClick={() => {
              setReceipt(null);
              setName("");
              setEmail("");
              setPhone("");
              setAmount("");
            }}
            className="py-3 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-sm transition"
          >
            Donate Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Select Purpose</label>
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
        >
          <option value="General Support">General Support</option>
          <option value="Gospel Outreach">Gospel Outreach</option>
          <option value="Child Sponsorship">Child Sponsorship</option>
          <option value="Church Planting">Church Planting</option>
          <option value="Water Pump Initiative">Water Pump Initiative</option>
          <option value="Winter Relief Campaign">Winter Relief Campaign</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
          >
            <option value="NPR">NPR (Nepalese Rupee)</option>
            <option value="USD">USD (US Dollar)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={10}
            placeholder={currency === "USD" ? "e.g. 50" : "e.g. 3500"}
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Giving Interval</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
          >
            <option value="ONE_TIME">One Time</option>
            <option value="MONTHLY">Monthly Sponsorship</option>
            <option value="ANNUAL">Annual Support</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Donor's name"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your.email@example.com"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone Number (Optional)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 9841234567"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-105 text-red-800 dark:bg-red-950/40 dark:text-red-400 p-3 rounded-xl text-xs font-semibold">
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-bold rounded-xl text-sm transition shadow-md hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer animate-fadeIn"
      >
        <CreditCard className="w-4 h-4" />
        {loading ? "Processing Secure Payment..." : `Donate ${amount ? `${currency} ${parseFloat(amount).toLocaleString()}` : ""}`}
      </button>
    </form>
  );
}
