"use client";

import React, { useState } from "react";

export default function TestimonialForm() {
  const [authorName, setAuthorName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("VOLUNTEER");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName, role, content, category }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit testimonial.");
      }

      setSuccess(true);
      setAuthorName("");
      setRole("");
      setContent("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400 p-3 rounded-xl text-xs font-semibold">
          🎉 Thank you! Your testimonial has been submitted for moderation.
        </div>
      )}
      {error && (
        <div className="bg-red-105 text-red-800 dark:bg-red-950/40 dark:text-red-400 p-3 rounded-xl text-xs font-semibold">
          ⚠️ {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          placeholder="e.g. Sarah Jenkins"
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Role / Description</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          placeholder="e.g. Short-term Volunteer, Canada"
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary"
        >
          <option value="VOLUNTEER">Volunteer</option>
          <option value="COMMUNITY">Community Leader / Local</option>
          <option value="SPONSOR">Child Sponsor</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Story</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          placeholder="Share your experience with our ministry..."
          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-bold rounded-xl text-sm transition shadow-md hover:scale-105 active:scale-95 disabled:scale-100 cursor-pointer"
      >
        {loading ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
}
