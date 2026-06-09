import React from "react";
import { Heart, Award, ShieldCheck, HelpCircle } from "lucide-react";
import DonateForm from "./DonateForm";

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Partner with us</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Expand the Kingdom of God
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            "You can donate with any amount either it is one time, monthly, or yearly. It will help us to expand the kingdom of God."
          </p>
        </div>

        {/* Form Container */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Why Your Support Matters</h2>
            
            <div className="space-y-6">
              {/* Stewardship */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">Accountable Stewardship</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    100% of designated funds go directly to rural projects in Nepal. Our administrative costs are fully covered by specific local donors.
                  </p>
                </div>
              </div>

              {/* Water Pumps */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">Holistic Outreach</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Your gift provides both physical relief (water pumps, food relief, blankets) and spiritual nourishment (chronological Bible storybooks, pastoral training).
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white">Generational Transformation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Sponsoring a child or church plant builds a lasting bridge of letters, prayers, and generational change in far corners of the country.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-950 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-lg space-y-6">
            <DonateForm />
          </div>
        </div>

      </div>
    </main>
  );
}
