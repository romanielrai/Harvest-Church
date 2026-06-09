"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition hover:scale-105 active:scale-95 cursor-pointer"
    >
      <LogOut className="w-3.5 h-3.5 text-primary" />
      Sign Out
    </button>
  );
}
