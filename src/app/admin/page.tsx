"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Shield, 
  Users, 
  Mail, 
  DollarSign, 
  Calendar, 
  LogOut, 
  LayoutDashboard, 
  Image as ImageIcon, 
  FileText, 
  LayoutTemplate, 
  Briefcase, 
  HelpCircle, 
  Settings, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Check, 
  X, 
  ChevronRight, 
  Globe, 
  TrendingUp, 
  Menu, 
  Eye, 
  FileDown, 
  UserPlus, 
  FolderPlus, 
  ToggleLeft, 
  ToggleRight,
  ShieldAlert,
  Loader2,
  Anchor,
  Heart
} from "lucide-react";


type ModuleType = "dashboard" | "homepage" | "media" | "blogs" | "services" | "portfolio" | "testimonials" | "team" | "faq" | "leads" | "settings" | "seo" | "users";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Navigation and Layout States
  const [activeTab, setActiveTab] = useState<ModuleType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // General Loading & Notification States
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Database Data States
  const [analytics, setAnalytics] = useState<any>(null);
  const [settings, setSettings] = useState<any>({});
  const [blogs, setBlogs] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [leadFilter, setLeadFilter] = useState("ALL");
  const [mediaSearch, setMediaSearch] = useState("");
  const [selectedFolderFilter, setSelectedFolderFilter] = useState("All");
  const [uploadFolder, setUploadFolder] = useState("general");

  // CRUD Modal Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<any>({});
  
  // Media Upload File State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Authenticate user and fetch initial stats
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchData = async (moduleName: string) => {
    try {
      const res = await fetch(`/api/admin/${moduleName}`);
      if (!res.ok) throw new Error(`Failed to load ${moduleName} content.`);
      const data = await res.json();
      return data;
    } catch (err: any) {
      showNotification("error", err.message);
      return null;
    }
  };

  const loadAllContent = async () => {
    if (status !== "authenticated") return;
    setLoading(true);
    
    // Fetch analytics first for dashboard metrics
    const analData = await fetchData("analytics");
    if (analData) setAnalytics(analData);

    const setsData = await fetchData("settings");
    if (setsData) setSettings(setsData);

    const blogData = await fetchData("blogs");
    if (blogData) setBlogs(blogData);

    const serviceData = await fetchData("services");
    if (serviceData) setServices(serviceData);

    const projData = await fetchData("portfolio");
    if (projData) setProjects(projData);

    const testData = await fetchData("testimonials");
    if (testData) setTestimonials(testData);

    const teamData = await fetchData("team");
    if (teamData) setTeam(teamData);

    const faqData = await fetchData("faqs");
    if (faqData) setFaqs(faqData);

    const leadData = await fetchData("leads");
    if (leadData) setLeads(leadData);

    const userData = await fetchData("users");
    if (userData) setUsers(userData);

    const mediaData = await fetchData("media");
    if (mediaData) setMedia(mediaData);

    setLoading(false);
  };

  useEffect(() => {
    loadAllContent();
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-sm text-slate-400 font-medium">Loading administrative workspace...</p>
      </div>
    );
  }

  const userRole = (session?.user as any)?.role || "USER";

  // Check role-based permission client side
  const canAccess = (tab: ModuleType): boolean => {
    if (userRole === "SUPER_ADMIN") return true;
    switch (tab) {
      case "settings":
      case "seo":
        return userRole === "SEO_MANAGER";
      case "media":
        return userRole === "MEDIA_MANAGER";
      case "blogs":
      case "services":
      case "portfolio":
      case "testimonials":
      case "team":
      case "faq":
      case "leads":
        return userRole === "CONTENT_MANAGER";
      case "dashboard":
      case "homepage":
        return userRole === "CONTENT_MANAGER" || userRole === "SEO_MANAGER" || userRole === "MEDIA_MANAGER";
      case "users":
        return false;
      default:
        return false;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSubmitting(true);
      const form = new FormData();
      form.append("file", file);
      form.append("folder", uploadFolder);

      try {
        const res = await fetch(`/api/admin/media`, {
          method: "POST",
          body: form,
        });

        if (!res.ok) throw new Error("Failed to upload media file.");
        showNotification("success", "Media uploaded and indexed successfully!");
        await loadAllContent();
      } catch (err: any) {
        showNotification("error", err.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  // CRUD operation triggers
  const openAddModal = () => {
    setFormData({});
    setModalAction("add");
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setFormData({ ...item });
    setModalAction("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (module: string, id: string) => {
    if (!confirm("Are you sure you want to delete this resource permanently?")) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/${module}?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to delete from ${module}.`);
      }
      showNotification("success", "Resource deleted successfully.");
      await loadAllContent();
    } catch (err: any) {
      showNotification("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // API endpoint mapping
    let endpoint = "";
    if (activeTab === "blogs") endpoint = "blogs";
    else if (activeTab === "services") endpoint = "services";
    else if (activeTab === "portfolio") endpoint = "portfolio";
    else if (activeTab === "testimonials") endpoint = "testimonials";
    else if (activeTab === "team") endpoint = "team";
    else if (activeTab === "faq") endpoint = "faqs";
    else if (activeTab === "users") endpoint = "users";

    const method = modalAction === "add" ? "POST" : "PUT";

    try {
      const res = await fetch(`/api/admin/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save data.");
      }

      showNotification("success", `Content ${modalAction === "add" ? "created" : "updated"} successfully.`);
      setIsModalOpen(false);
      await loadAllContent();
    } catch (err: any) {
      showNotification("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Special Form handlers
  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save website configurations.");
      showNotification("success", "Website settings updated successfully!");
      await loadAllContent();
    } catch (err: any) {
      showNotification("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setSubmitting(true);
    const form = new FormData();
    form.append("file", uploadFile);
    form.append("folder", uploadFolder);

    try {
      const res = await fetch(`/api/admin/media`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to upload media file.");
      showNotification("success", "Media uploaded and indexed successfully!");
      setUploadFile(null);
      setUploadFolder("general");
      await loadAllContent();
    } catch (err: any) {
      showNotification("error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle lead status
  const toggleLeadStatus = async (lead: any) => {
    const nextStatus = lead.status === "UNREAD" ? "READ" : lead.status === "READ" ? "REPLIED" : "UNREAD";
    try {
      const res = await fetch(`/api/admin/leads`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, status: nextStatus })
      });
      if (!res.ok) throw new Error("Failed to update lead status.");
      await loadAllContent();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  // Export leads to CSV file
  const exportLeadsToCSV = () => {
    const csvRows = [
      ["Name", "Email", "Phone", "Subject", "Message", "Submitted Date", "Status"]
    ];

    leads.forEach((l) => {
      csvRows.push([
        l.name,
        l.email,
        l.phone || "",
        l.subject.replace(/"/g, '""'),
        l.message.replace(/"/g, '""'),
        new Date(l.createdAt).toLocaleDateString(),
        l.status
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + csvRows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `harvest_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Page layout section updates
  const updateSectionOrder = async (sectionKey: string, action: "up" | "down" | "toggle") => {
    const currentLayout = settings.homepageLayout || "hero,mission,story,stats,pastor,team,faq,badges,cta,newsletter";
    const sections = currentLayout.split(",");

    const idx = sections.indexOf(sectionKey);
    if (idx === -1 && action !== "toggle") return;

    if (action === "up" && idx > 0) {
      const temp = sections[idx];
      sections[idx] = sections[idx - 1];
      sections[idx - 1] = temp;
    } else if (action === "down" && idx < sections.length - 1) {
      const temp = sections[idx];
      sections[idx] = sections[idx + 1];
      sections[idx + 1] = temp;
    } else if (action === "toggle") {
      // Toggle visibility by adding or removing from array (simulated config)
      if (idx !== -1) {
        sections.splice(idx, 1);
      } else {
        sections.push(sectionKey);
      }
    }

    const newLayout = sections.join(",");
    setSettings({ ...settings, homepageLayout: newLayout });
    
    // Save order instantly to database
    try {
      await fetch(`/api/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, homepageLayout: newLayout }),
      });
      showNotification("success", "Homepage sections updated live!");
    } catch (err) {}
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"} font-sans flex`}>
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-fade-in ${
          notification.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-red-500/10 border-red-500/20 text-red-400"
        }`}>
          {notification.type === "success" ? <Check className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
          <span className="text-sm font-medium">{notification.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-64 border-r shrink-0 flex flex-col justify-between transition-all duration-300 ${
        isDarkMode ? "bg-slate-900 border-slate-800/80" : "bg-white border-slate-200"
      } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"}`}>
        
        <div className="p-5 space-y-6">
          {/* Logo Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Shield className="w-6 h-6" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="block font-serif font-bold text-sm text-white uppercase tracking-wider">Harvest Portal</span>
                <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Content Manager</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-4">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "homepage", label: "Homepage Sections", icon: LayoutTemplate },
              { id: "media", label: "Media Library", icon: ImageIcon },
              { id: "blogs", label: "Blog Posts", icon: FileText },
              { id: "services", label: "Ministries & Services", icon: Anchor },
              { id: "portfolio", label: "Portfolio Projects", icon: Briefcase },
              { id: "testimonials", label: "Testimonials", icon: Heart },
              { id: "team", label: "Team Members", icon: Users },
              { id: "faq", label: "Frequently FAQs", icon: HelpCircle },
              { id: "leads", label: "Contact Leads", icon: Mail },
              { id: "settings", label: "Website Settings", icon: Settings },
              { id: "seo", label: "SEO Settings", icon: Globe },
              { id: "users", label: "Users & Roles", icon: Shield }
            ].map((tab) => {
              const IconComp = tab.icon;
              const hasAccess = canAccess(tab.id as ModuleType);
              if (!hasAccess) return null;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as ModuleType);
                    setSearchTerm("");
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id 
                      ? "bg-primary text-white shadow-md" 
                      : isDarkMode ? "text-slate-400 hover:bg-slate-800/50 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <IconComp className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span>{tab.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800/50 space-y-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white font-medium focus:outline-none"
          >
            {sidebarOpen && <span>Interface Theme</span>}
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700/60 text-[9px] uppercase tracking-wider font-bold">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header bar */}
        <header className={`py-4 px-6 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md ${
          isDarkMode ? "bg-slate-900/80 border-slate-800/80" : "bg-white/80 border-slate-200"
        }`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-serif font-bold text-lg text-white uppercase tracking-wider">Harvest Administrative Workspace</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Active Panel: {activeTab}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white font-bold">{session?.user?.name}</p>
              <p className="text-[9px] text-secondary font-bold uppercase tracking-wider">{userRole}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white font-serif">
              {session?.user?.name?.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Panels */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* A. DASHBOARD VIEW */}
          {activeTab === "dashboard" && analytics && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Metric 1 */}
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 hover:-translate-y-1.5 transition-transform">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs uppercase font-extrabold tracking-wider">Total Support</span>
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-extrabold font-serif text-white">NPR {analytics.metrics.donationsTotal.toLocaleString()}</p>
                  <span className="block text-[10px] text-slate-500">{analytics.metrics.donationsCount} logs logged</span>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 hover:-translate-y-1.5 transition-transform">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs uppercase font-extrabold tracking-wider">Outreach Leads</span>
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-extrabold font-serif text-white">{analytics.metrics.messagesCount}</p>
                  <span className="block text-[10px] text-slate-500">Contact form signups</span>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 hover:-translate-y-1.5 transition-transform">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs uppercase font-extrabold tracking-wider">Event Registrations</span>
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-extrabold font-serif text-white">{analytics.metrics.eventSignupsCount}</p>
                  <span className="block text-[10px] text-slate-500">Signups recorded</span>
                </div>

                {/* Metric 4 */}
                <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl space-y-2 hover:-translate-y-1.5 transition-transform">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="text-xs uppercase font-extrabold tracking-wider">Platform Administrators</span>
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-extrabold font-serif text-white">{analytics.metrics.activeUsersCount}</p>
                  <span className="block text-[10px] text-slate-500">Role controls active</span>
                </div>

              </div>

              {/* Graphical Trend & Recent Activity */}
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Simulated Chart Panel */}
                <div className="lg:col-span-8 bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold font-serif uppercase tracking-wide">Dynamic Analytics Graph</h3>
                    <span className="text-xs text-primary font-bold inline-flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Live Growth Flow</span>
                  </div>
                  
                  {/* Visual simulated bar chart */}
                  <div className="h-64 flex items-end justify-between gap-4 pt-6 border-b border-slate-800 pb-1">
                    {analytics.monthlyStats.map((stat: any, idx: number) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-primary transition-colors">NPR {stat.donations}</span>
                        <div 
                          className="w-full bg-slate-800 group-hover:bg-primary rounded-t-lg transition-all" 
                          style={{ height: `${(stat.donations / 45000) * 160}px` }}
                        />
                        <span className="text-xs font-bold text-slate-400">{stat.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Donations Activity List */}
                <div className="lg:col-span-4 bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-lg font-bold font-serif uppercase tracking-wide border-b border-slate-800 pb-3">Support Logs</h3>
                  <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
                    {analytics.recentDonations.map((don: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-800/40 pb-2">
                        <div>
                          <strong className="block text-slate-200">{don.donorName}</strong>
                          <span className="text-[10px] text-slate-500">{new Date(don.date).toLocaleDateString()}</span>
                        </div>
                        <span className="font-bold text-primary">{don.currency} {don.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* B. HOMEPAGE MANAGEMENT */}
          {activeTab === "homepage" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">Visual Layout Manager</h2>
                <p className="text-xs text-slate-500 mt-1">Enable, disable, and order sections of the homepage live.</p>
              </div>

              <div className="space-y-3 max-w-xl">
                {[
                  { key: "hero", label: "Hero Banner (Welcome Image & Video Link)" },
                  { key: "mission", label: "Our Mission Goals (Meet Needs & Training)" },
                  { key: "story", label: "History & Story (Harvest Church Timeline)" },
                  { key: "stats", label: "Dynamic Metrics (Impact Stats)" },
                  { key: "pastor", label: "Pastor Spotlight (Satis Thapa Testimony)" },
                  { key: "team", label: "Team Directory (Interactive Cards)" },
                  { key: "faq", label: "Collapsible FAQs Accordion" },
                  { key: "badges", label: "Affiliations & Transparency Badges" },
                  { key: "cta", label: "Scripture Banner (Galatians 6:10 CTA)" },
                  { key: "newsletter", label: "Newsletter Registration Box" }
                ].map((sec, index) => {
                  const layoutStr = settings.homepageLayout || "";
                  const activeSections = layoutStr.split(",");
                  const isEnabled = activeSections.includes(sec.key);
                  const currentIdx = activeSections.indexOf(sec.key);

                  return (
                    <div key={sec.key} className="flex items-center justify-between p-4 bg-slate-950 border border-slate-850 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center text-slate-400">
                          {index + 1}
                        </span>
                        <span className="text-sm font-semibold text-white">{sec.label}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* Up / Down Controls */}
                        <div className="flex items-center gap-1.5 border border-slate-800 bg-slate-900 px-2 py-1 rounded-lg">
                          <button 
                            onClick={() => updateSectionOrder(sec.key, "up")} 
                            disabled={currentIdx <= 0}
                            className="text-xs text-slate-450 hover:text-white disabled:opacity-30 disabled:pointer-events-none font-bold px-1"
                          >
                            ▲
                          </button>
                          <span className="text-[10px] font-bold text-slate-500">Order</span>
                          <button 
                            onClick={() => updateSectionOrder(sec.key, "down")} 
                            disabled={currentIdx === -1 || currentIdx >= activeSections.length - 1}
                            className="text-xs text-slate-450 hover:text-white disabled:opacity-30 disabled:pointer-events-none font-bold px-1"
                          >
                            ▼
                          </button>
                        </div>

                        {/* Enable/Disable Toggle */}
                        <button 
                          onClick={() => updateSectionOrder(sec.key, "toggle")}
                          className="focus:outline-none"
                        >
                          {isEnabled ? (
                            <span className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-wider font-bold">Enabled</span>
                          ) : (
                            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 text-[9px] uppercase tracking-wider font-bold">Disabled</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}          {/* C. MEDIA LIBRARY */}
          {activeTab === "media" && (
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`space-y-8 animate-fade-in bg-slate-900 border rounded-3xl p-6 sm:p-8 transition-all relative ${
                dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-slate-800"
              }`}
            >
              {dragActive && (
                <div className="absolute inset-0 bg-primary/10 border-4 border-dashed border-primary rounded-3xl z-40 flex items-center justify-center pointer-events-none backdrop-blur-xs">
                  <div className="text-center space-y-2">
                    <Upload className="w-12 h-12 text-primary animate-bounce mx-auto" />
                    <p className="text-base text-white font-bold uppercase tracking-wider">Drop files here to upload</p>
                    <p className="text-xs text-slate-400 font-semibold">Upload directly into folder "{uploadFolder}"</p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">Media Manager</h2>
                  <p className="text-xs text-slate-500 mt-1">Upload images, videos, and PDFs to use across the site. Drag-and-drop files here.</p>
                </div>
                
                {/* Upload Form */}
                <form onSubmit={handleFileUpload} className="flex flex-wrap items-center gap-3 bg-slate-955 border border-slate-850 p-2 rounded-xl">
                  <input 
                    type="file" 
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    required
                    accept="image/*,video/*,.pdf,.docx,.doc"
                    className="text-xs text-slate-400 max-w-[180px] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                  />
                  <input 
                    type="text" 
                    placeholder="Folder (e.g. general)" 
                    value={uploadFolder}
                    onChange={(e) => setUploadFolder(e.target.value)}
                    required
                    className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-xs text-white placeholder-slate-600 focus:outline-none w-32"
                  />
                  <button 
                    type="submit" 
                    disabled={!uploadFile || submitting}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-1.5 px-4 rounded-lg text-xs uppercase tracking-wider disabled:opacity-45 inline-flex items-center gap-1.5"
                  >
                    {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    Upload File
                  </button>
                </form>
              </div>

              {/* Media Search & Folder Filter & New Folder Creator */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex max-w-sm items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-2 rounded-xl">
                    <Search className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search uploaded files..." 
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="bg-transparent text-sm text-slate-105 placeholder-slate-500 focus:outline-none w-full"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-2 rounded-xl">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active:</span>
                    <select
                      value={uploadFolder}
                      onChange={(e) => setUploadFolder(e.target.value)}
                      className="bg-transparent border-0 text-xs font-semibold text-slate-350 focus:outline-none cursor-pointer"
                    >
                      {Array.from(new Set(["general", ...media.map(m => m.folder || "general")])).map(folder => (
                        <option key={folder} value={folder}>{folder}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Add New Folder */}
                <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-1 rounded-xl">
                  <input 
                    type="text"
                    placeholder="Create folder..."
                    id="newFolderNameInput"
                    className="bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none w-28 py-1.5"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = e.currentTarget.value.trim().toLowerCase();
                        if (val) {
                          setUploadFolder(val);
                          setSelectedFolderFilter(val);
                          e.currentTarget.value = "";
                          showNotification("success", `Active folder changed to: ${val}`);
                        }
                      }
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("newFolderNameInput") as HTMLInputElement;
                      const val = input?.value.trim().toLowerCase();
                      if (val) {
                        setUploadFolder(val);
                        setSelectedFolderFilter(val);
                        input.value = "";
                        showNotification("success", `Active folder changed to: ${val}`);
                      }
                    }}
                    className="text-[10px] uppercase font-bold text-primary hover:text-white"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Folder filters tags row */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/40">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mr-2">Filter by Folder:</span>
                <button
                  onClick={() => setSelectedFolderFilter("All")}
                  className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold transition ${
                    selectedFolderFilter === "All"
                      ? "bg-primary text-white shadow-sm"
                      : "bg-slate-955 border border-slate-850 text-slate-400 hover:text-white"
                  }`}
                >
                  All Folders
                </button>
                {Array.from(new Set(media.map(m => m.folder || "general"))).map(folder => (
                  <button
                    key={folder}
                    onClick={() => setSelectedFolderFilter(folder)}
                    className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold transition ${
                      selectedFolderFilter === folder
                        ? "bg-primary text-white shadow-sm"
                        : "bg-slate-955 border border-slate-850 text-slate-405 hover:text-white"
                    }`}
                  >
                    {folder}
                  </button>
                ))}
              </div>

              {/* File Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 pt-4">
                {media
                  .filter(m => m.name.toLowerCase().includes(mediaSearch.toLowerCase()))
                  .filter(m => selectedFolderFilter === "All" || m.folder === selectedFolderFilter)
                  .map((item) => (
                    <div key={item.id} className="bg-slate-955 border border-slate-850 rounded-2xl overflow-hidden p-3 space-y-2 flex flex-col justify-between group relative">
                      
                      {/* Media Preview Box */}
                      <div className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden relative">
                        {item.type === "IMAGE" ? (
                          <Image src={item.url} alt={item.name} fill className="object-cover" />
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.type}</span>
                        )}
                      </div>

                      {/* Meta info */}
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-white truncate" title={item.name}>{item.name}</span>
                        <div className="flex justify-between items-center text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                          <span>{(item.size / 1024).toFixed(1)} KB</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[8px] text-primary">{item.folder || "general"}</span>
                        </div>
                      </div>

                      {/* Copy Link / Replace / Delete Buttons */}
                      <div className="flex gap-2 pt-1.5 border-t border-slate-900 flex-wrap">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            showNotification("success", "File URL copied to clipboard!");
                          }}
                          className="flex-1 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[9px] text-slate-350 font-bold uppercase tracking-wider"
                        >
                          Copy URL
                        </button>
                        
                        <label className="py-1 px-2 rounded bg-slate-900 hover:bg-slate-800 text-[9px] text-slate-350 font-bold uppercase tracking-wider cursor-pointer text-center flex-1 select-none">
                          Replace
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*,video/*,.pdf,.docx,.doc"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (!confirm(`Are you sure you want to replace this media file with "${file.name}"?`)) return;
                              setSubmitting(true);
                              const form = new FormData();
                              form.append("file", file);
                              try {
                                const res = await fetch(`/api/admin/media?id=${item.id}`, {
                                  method: "PUT",
                                  body: form
                                });
                                if (!res.ok) throw new Error("Failed to replace media file.");
                                showNotification("success", "Media replaced successfully!");
                                await loadAllContent();
                              } catch(err: any) {
                                showNotification("error", err.message);
                              } finally {
                                setSubmitting(false);
                              }
                            }}
                          />
                        </label>

                        <button 
                          onClick={() => handleDelete("media", item.id)}
                          className="py-1 px-1.5 rounded bg-red-950/20 border border-red-900/10 hover:bg-red-500/10 text-red-400 animate-transition"
                          title="Delete Permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}          {/* D. BLOG POSTS */}
          {activeTab === "blogs" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white font-medium">Blogs Content Management</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage articles, updates, news, and drafts.</p>
                </div>
                
                {/* Search Bar & Add Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-1.5 rounded-xl text-xs">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search blogs..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-650 focus:outline-none w-36"
                    />
                  </div>
                  <button 
                    onClick={openAddModal}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Blog Post
                  </button>
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-3 w-12">Cover</th>
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Author</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Created</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs
                      .filter(blog => 
                        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        blog.authorName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        blog.summary?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((blog) => (
                        <tr key={blog.id} className="border-b border-slate-800/40 hover:bg-slate-955/20 transition-colors">
                          <td className="py-3.5">
                            <div className="relative w-8 h-8 rounded bg-slate-800 overflow-hidden">
                              <Image src={blog.coverImage || "/images/img_page1_1.jpeg"} alt="" fill className="object-cover" />
                            </div>
                          </td>
                          <td className="py-3.5 font-bold text-white">{blog.title}</td>
                          <td className="py-3.5 text-slate-400">{blog.authorName}</td>
                          <td className="py-3.5">
                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch(`/api/admin/blogs`, {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ id: blog.id, published: !blog.published })
                                  });
                                  if (res.ok) {
                                    await loadAllContent();
                                    showNotification("success", "Blog status updated live!");
                                  }
                                } catch(e) {}
                              }}
                              title="Click to toggle status"
                              className="focus:outline-none cursor-pointer"
                            >
                              {blog.published ? (
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[9px] uppercase tracking-wider">Published</span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-[9px] uppercase tracking-wider">Draft</span>
                              )}
                            </button>
                          </td>
                          <td className="py-3.5 text-slate-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                          <td className="py-3.5 text-right space-x-2">
                            <button 
                              onClick={() => openEditModal(blog)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-350"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDelete("blogs", blog.id)}
                              className="p-1 rounded bg-red-955/20 border border-red-900/10 hover:bg-red-500/10 text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}          {/* E. SERVICES / MINISTRIES */}
          {activeTab === "services" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">Ministries & Services</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage active church ministries and public services.</p>
                </div>
                
                {/* Search Bar & Add Button */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-1.5 rounded-xl text-xs">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search services..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-650 focus:outline-none w-36"
                    />
                  </div>
                  <button 
                    onClick={openAddModal}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Service
                  </button>
                </div>
              </div>

              {/* Grid list */}
              <div className="grid md:grid-cols-2 gap-6">
                {services
                  .filter(item => 
                    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    item.category?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <div key={item.id} className="bg-slate-955 border border-slate-850 p-6 rounded-2xl flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{item.category}</span>
                        <h3 className="text-base font-bold text-white font-serif">{item.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{item.description}</p>
                        
                        {/* Live active toggle */}
                        <div className="pt-2">
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/admin/services`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ id: item.id, active: !item.active })
                                });
                                if (res.ok) {
                                  await loadAllContent();
                                  showNotification("success", "Service status updated live!");
                                }
                              } catch(e) {}
                            }}
                            title="Click to toggle status"
                            className="focus:outline-none cursor-pointer text-left block"
                          >
                            {item.active ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[9px] uppercase tracking-wider">Published</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-[9px] uppercase tracking-wider">Draft</span>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 shrink-0">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-350 text-xs border border-slate-850"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete("services", item.id)}
                          className="p-1.5 rounded bg-red-955/20 border border-red-900/10 hover:bg-red-500/10 text-red-400 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}          {/* F. PORTFOLIO / PROJECTS */}
          {activeTab === "portfolio" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white font-medium">Portfolio Projects</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage ongoing humanitarian, water pump, and building projects.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-1.5 rounded-xl text-xs">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search projects..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-650 focus:outline-none w-36"
                    />
                  </div>
                  <button 
                    onClick={openAddModal}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {projects
                  .filter(proj => 
                    proj.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    proj.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    proj.status?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((proj) => (
                    <div key={proj.id} className="bg-slate-955 border border-slate-855 rounded-2xl overflow-hidden flex flex-col justify-between">
                      
                      {/* Top thumbnail */}
                      <div className="relative aspect-video bg-slate-900">
                        <Image src={proj.coverImage || "/images/img_page1_1.jpeg"} alt="" fill className="object-cover" />
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-900/90 text-white font-bold text-[8px] uppercase tracking-wider">
                          {proj.status}
                        </span>
                      </div>

                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-white truncate">{proj.title}</h3>
                          <span className="text-[10px] text-slate-550 font-bold block mt-1">Progress: {proj.progress}%</span>
                        </div>
                        
                        {/* Visual progress bar */}
                        <div className="w-full bg-slate-850 rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${proj.progress}%` }} />
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>Budget: NPR {proj.budget.toLocaleString()}</span>
                          <span>{proj.beneficiaries} Beneficiaries</span>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-slate-900/50 flex gap-2 items-center justify-between">
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch(`/api/admin/portfolio`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: proj.id, published: !proj.published })
                              });
                              if (res.ok) {
                                await loadAllContent();
                                showNotification("success", "Project status updated live!");
                              }
                            } catch(e) {}
                          }}
                          className="focus:outline-none cursor-pointer"
                        >
                          {proj.published ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[9px] uppercase tracking-wider">Published</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-[9px] uppercase tracking-wider">Draft</span>
                          )}
                        </button>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditModal(proj)}
                            className="py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-855 text-xs font-bold text-slate-355 flex items-center justify-center gap-1 border border-slate-850"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button 
                            onClick={() => handleDelete("portfolio", proj.id)}
                            className="py-1.5 px-3 rounded bg-red-955/20 border border-red-900/10 hover:bg-red-500/10 text-red-400 text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}          {/* G. TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white font-medium">Testimonials</h2>
                  <p className="text-xs text-slate-500 mt-1">Review and manage testimonies shared by sponsors, volunteers, and members.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-1.5 rounded-xl text-xs">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search testimonials..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-650 focus:outline-none w-36"
                    />
                  </div>
                  <button 
                    onClick={openAddModal}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Testimonial
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="space-y-4">
                {testimonials
                  .filter(test => 
                    test.authorName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    test.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    test.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    test.category?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((test) => (
                    <div key={test.id} className="bg-slate-955 border border-slate-850 p-6 rounded-2xl flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <strong className="text-white text-sm">{test.authorName}</strong>
                          <span className="text-[10px] text-slate-505 font-medium">({test.role})</span>
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] uppercase tracking-wider font-bold">{test.category}</span>
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/admin/testimonials`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ id: test.id, published: !test.published })
                                });
                                if (res.ok) {
                                  await loadAllContent();
                                  showNotification("success", "Testimonial status updated live!");
                                }
                              } catch(e) {}
                            }}
                            className="focus:outline-none cursor-pointer ml-2"
                          >
                            {test.published ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[9px] uppercase tracking-wider">Published</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-[9px] uppercase tracking-wider">Draft</span>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-350 italic leading-relaxed">"{test.content}"</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEditModal(test)}
                          className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-355 border border-slate-850"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete("testimonials", test.id)}
                          className="p-1 rounded bg-red-950/20 border border-red-900/10 hover:bg-red-500/10 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}          {/* H. TEAM MEMBERS */}
          {activeTab === "team" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white font-medium">Team Profiles</h2>
                  <p className="text-xs text-slate-505 mt-1">Manage elder pastors, co-founders, and child coordinators.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-1.5 rounded-xl text-xs">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search team..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-650 focus:outline-none w-36"
                    />
                  </div>
                  <button 
                    onClick={openAddModal}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Team Member
                  </button>
                </div>
              </div>

              {/* Team list */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {team
                  .filter(member => 
                    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    member.bio?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((member) => (
                    <div key={member.id} className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between">
                      <div className="relative aspect-[3/4] bg-slate-900">
                        <Image src={member.image || "/images/img_page1_2.jpeg"} alt="" fill className="object-cover" />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-sm font-bold text-white">{member.name}</h3>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">{member.role}</p>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{member.bio}</p>
                      </div>
                      <div className="p-4 pt-0 border-t border-slate-900 flex gap-2 items-center justify-between">
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch(`/api/admin/team`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: member.id, published: !member.published })
                              });
                              if (res.ok) {
                                await loadAllContent();
                                showNotification("success", "Team member status updated live!");
                              }
                            } catch(e) {}
                          }}
                          className="focus:outline-none cursor-pointer"
                        >
                          {member.published ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[9px] uppercase tracking-wider">Published</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-[9px] uppercase tracking-wider">Draft</span>
                          )}
                        </button>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditModal(member)}
                            className="py-1 px-2.5 bg-slate-900 hover:bg-slate-855 rounded border border-slate-800 text-[10px] font-bold text-slate-355 text-center"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete("team", member.id)}
                            className="px-2 py-1 bg-red-950/20 border border-red-900/10 hover:bg-red-500/10 rounded text-red-400 text-xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* I. FAQ */}
          {activeTab === "faq" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white font-medium">Frequently Asked Questions</h2>
                  <p className="text-xs text-slate-500 mt-1">Manage the accordion items displayed in the public Info tab.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-955 border border-slate-850 px-3 py-1.5 rounded-xl text-xs">
                    <Search className="w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search FAQs..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-650 focus:outline-none w-36"
                    />
                  </div>
                  <button 
                    onClick={openAddModal}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add FAQ Item
                  </button>
                </div>
              </div>

              {/* list */}
              <div className="space-y-4">
                {faqs
                  .filter(faq => 
                    faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    faq.answer?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((faq) => (
                    <div key={faq.id} className="bg-slate-955 border border-slate-855 p-6 rounded-2xl flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <strong className="block text-white text-sm">Q: {faq.question}</strong>
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`/api/admin/faqs`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ id: faq.id, published: !faq.published })
                                });
                                if (res.ok) {
                                  await loadAllContent();
                                  showNotification("success", "FAQ status updated live!");
                                }
                              } catch(e) {}
                            }}
                            className="focus:outline-none cursor-pointer ml-2"
                          >
                            {faq.published ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[9px] uppercase tracking-wider">Published</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-semibold text-[9px] uppercase tracking-wider">Draft</span>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">A: {faq.answer}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button 
                          onClick={() => openEditModal(faq)}
                          className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-355 border border-slate-850"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete("faq", faq.id)}
                          className="p-1 rounded bg-red-950/20 border border-red-900/10 hover:bg-red-500/10 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* J. CONTACT LEADS */}
          {activeTab === "leads" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">Contact leads Center</h2>
                  <p className="text-xs text-slate-500 mt-1">Review contact form submissions, volunteer signups, and queries.</p>
                </div>
                <button 
                  onClick={exportLeadsToCSV}
                  className="bg-slate-850 hover:bg-slate-850 text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider border border-slate-800 inline-flex items-center gap-1.5 focus:outline-none"
                >
                  <FileDown className="w-4 h-4 text-primary" /> Export leads to CSV
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {["ALL", "UNREAD", "READ", "REPLIED"].map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() => setLeadFilter(statusOption)}
                    className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all border ${
                      leadFilter === statusOption
                        ? "bg-primary border-primary text-white"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:text-white"
                    }`}
                  >
                    {statusOption}
                  </button>
                ))}
              </div>

              {/* Leads list */}
              <div className="space-y-4">
                {leads
                  .filter((l) => leadFilter === "ALL" || l.status === leadFilter)
                  .map((lead) => (
                    <div key={lead.id} className="bg-slate-950 border border-slate-850 p-6 rounded-2xl space-y-4">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <strong className="text-slate-100">{lead.name}</strong>
                          <span className="text-slate-500">({lead.email} | {lead.phone || "No phone"})</span>
                          <span className="text-slate-600 font-bold">{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleLeadStatus(lead)}
                            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 rounded border border-slate-850 text-[9px] uppercase tracking-widest font-bold text-slate-350"
                          >
                            Mark: {lead.status === "UNREAD" ? "Read" : lead.status === "READ" ? "Replied" : "Unread"}
                          </button>
                          <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-extrabold ${
                            lead.status === "UNREAD" ? "bg-red-500/10 text-red-400" : lead.status === "READ" ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                          }`}>{lead.status}</span>
                          <button 
                            onClick={() => handleDelete("leads", lead.id)}
                            className="p-1 rounded bg-red-950/20 border border-red-900/10 hover:bg-red-500/10 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs text-primary font-bold">Subject: {lead.subject}</h4>
                        <p className="text-xs text-slate-350 bg-slate-900/40 p-4 rounded-xl border border-slate-850/50 leading-relaxed font-mono whitespace-pre-wrap">{lead.message}</p>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* K. WEBSITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl">
              
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">General Configurations</h2>
                <p className="text-xs text-slate-500 mt-1">Manage global title, logos, contacts, and social media references.</p>
              </div>

              <form onSubmit={handleSettingsSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Ministry Name</label>
                    <input 
                      type="text" 
                      value={settings.ministryName || ""}
                      onChange={(e) => setSettings({ ...settings, ministryName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Contact Email</label>
                    <input 
                      type="email" 
                      value={settings.email || ""}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Contact Phone</label>
                    <input 
                      type="text" 
                      value={settings.phone || ""}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Contact Address</label>
                    <input 
                      type="text" 
                      value={settings.address || ""}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Facebook URL</label>
                    <input 
                      type="text" 
                      value={settings.facebookUrl || ""}
                      onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Twitter / X URL</label>
                    <input 
                      type="text" 
                      value={settings.twitterUrl || ""}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Instagram URL</label>
                    <input 
                      type="text" 
                      value={settings.instagramUrl || ""}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Logo Image URL</label>
                    <input 
                      type="text" 
                      value={settings.logoUrl || ""}
                      onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-3 px-8 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Save Configurations
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* L. SEO SETTINGS */}
          {activeTab === "seo" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl">
              
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">Search Engine Optimization (SEO)</h2>
                <p className="text-xs text-slate-500 mt-1">Configure global search meta details directly to improve website rankings.</p>
              </div>

              <form onSubmit={handleSettingsSave} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Default Meta Title</label>
                    <input 
                      type="text" 
                      value={settings.seoTitle || ""}
                      onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Default Meta Description</label>
                    <textarea 
                      rows={4}
                      value={settings.seoDescription || ""}
                      onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Keywords (Comma Separated)</label>
                    <input 
                      type="text" 
                      value={settings.seoKeywords || ""}
                      onChange={(e) => setSettings({ ...settings, seoKeywords: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="faith-gradient faith-gradient-hover text-white font-bold py-3 px-8 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    Save SEO Metadata
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* M. USERS & ROLES */}
          {activeTab === "users" && (
            <div className="space-y-8 animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider text-white">Administrators & Permissions</h2>
                  <p className="text-xs text-slate-500 mt-1">Assign roles (`CONTENT_MANAGER`, `MEDIA_MANAGER`, `SEO_MANAGER`, `SUPER_ADMIN`) to control menu accessibility.</p>
                </div>
                <button 
                  onClick={openAddModal}
                  className="faith-gradient faith-gradient-hover text-white font-bold py-2 px-6 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" /> Add Administrator
                </button>
              </div>

              {/* Users list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email Address</th>
                      <th className="pb-3">Active Permission Role</th>
                      <th className="pb-3">Registered</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((usr) => (
                      <tr key={usr.id} className="border-b border-slate-800/40 hover:bg-slate-950/20 transition-colors">
                        <td className="py-3.5 font-bold text-white">{usr.name}</td>
                        <td className="py-3.5 text-slate-400">{usr.email}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-widest font-extrabold ${
                            usr.role === "SUPER_ADMIN" ? "bg-red-500/10 text-red-400" : usr.role === "CONTENT_MANAGER" ? "bg-primary/10 text-primary" : "bg-slate-800 text-slate-400"
                          }`}>{usr.role}</span>
                        </td>
                        <td className="py-3.5 text-slate-500">{new Date(usr.createdAt).toLocaleDateString()}</td>
                        <td className="py-3.5 text-right space-x-2">
                          <button 
                            onClick={() => openEditModal(usr)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-350"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete("users", usr.id)}
                            disabled={usr.id === (session?.user as any)?.id}
                            className="p-1 rounded bg-red-950/20 border border-red-900/10 hover:bg-red-500/10 text-red-400 disabled:opacity-30 disabled:pointer-events-none"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* N. UNIFIED ADD/EDIT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full bg-slate-800 text-slate-450 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-serif text-white border-b border-slate-800 pb-3 uppercase tracking-wide">
              {modalAction === "add" ? "Create New" : "Edit Details"} {activeTab.slice(0, -1)}
            </h3>

            <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
              
              {/* Blogs form fields */}
              {activeTab === "blogs" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Title</label>
                    <input 
                      type="text" 
                      value={formData.title || ""} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">URL Slug</label>
                    <input 
                      type="text" 
                      placeholder="auto-generated-if-blank"
                      value={formData.slug || ""} 
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Summary</label>
                    <input 
                      type="text" 
                      value={formData.summary || ""} 
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-955 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Content (HTML allowed)</label>
                    <textarea 
                      rows={8}
                      value={formData.content || ""} 
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-955 border border-slate-850 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={formData.coverImage || ""} 
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-955 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">SEO Title (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.seoTitle || ""} 
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">SEO Description (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.seoDescription || ""} 
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      id="blogPublished"
                      type="checkbox" 
                      checked={formData.published !== false} 
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="accent-primary"
                    />
                    <label htmlFor="blogPublished" className="text-xs text-slate-300 font-semibold select-none">Publish Immediately</label>
                  </div>
                </>
              )}
 
              {/* Services / Ministries form fields */}
              {activeTab === "services" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Ministry Title</label>
                    <input 
                      type="text" 
                      value={formData.title || ""} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Category</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Church Planting, Relief"
                      value={formData.category || ""} 
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={formData.coverImage || ""} 
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Description</label>
                    <textarea 
                      rows={5}
                      value={formData.description || ""} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      id="serviceActive"
                      type="checkbox" 
                      checked={formData.active !== false} 
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="accent-primary"
                    />
                    <label htmlFor="serviceActive" className="text-xs text-slate-300 font-semibold select-none">Publish / Active</label>
                  </div>
                </>
              )}

              {/* Portfolio / Projects form fields */}
              {activeTab === "portfolio" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Project Title</label>
                    <input 
                      type="text" 
                      value={formData.title || ""} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Budget (NPR)</label>
                      <input 
                        type="number" 
                        value={formData.budget || ""} 
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Progress (%)</label>
                      <input 
                        type="number" 
                        min="0"
                        max="100"
                        value={formData.progress || ""} 
                        onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Beneficiaries</label>
                      <input 
                        type="number" 
                        value={formData.beneficiaries || ""} 
                        onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Status</label>
                      <select
                        value={formData.status || "ONGOING"}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs focus:outline-none text-slate-300"
                      >
                        <option value="ONGOING">Ongoing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="UPCOMING">Upcoming</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Description</label>
                    <textarea 
                      rows={4}
                      value={formData.description || ""} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={formData.coverImage || ""} 
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-955 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      id="projectPublished"
                      type="checkbox" 
                      checked={formData.published !== false} 
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="accent-primary"
                    />
                    <label htmlFor="projectPublished" className="text-xs text-slate-350 font-semibold select-none">Publish Immediately</label>
                  </div>
                </>
              )}

              {/* Testimonials form fields */}
              {activeTab === "testimonials" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Author Name</label>
                    <input 
                      type="text" 
                      value={formData.authorName || ""} 
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Author Role</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Sponsor, Pastor"
                        value={formData.role || ""} 
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Category</label>
                      <select
                        value={formData.category || "COMMUNITY"}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs focus:outline-none text-slate-300"
                      >
                        <option value="VOLUNTEER">Volunteer</option>
                        <option value="COMMUNITY">Community member</option>
                        <option value="SPONSOR">Sponsor</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Content Testimony</label>
                    <textarea 
                      rows={4}
                      value={formData.content || ""} 
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-955 border border-slate-850 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      id="testimonialPublished"
                      type="checkbox" 
                      checked={formData.published !== false} 
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="accent-primary"
                    />
                    <label htmlFor="testimonialPublished" className="text-xs text-slate-350 font-semibold select-none">Publish Immediately</label>
                  </div>
                </>
              )}

              {/* Team Members form fields */}
              {activeTab === "team" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Name</label>
                    <input 
                      type="text" 
                      value={formData.name || ""} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Role / Title</label>
                      <input 
                        type="text" 
                        value={formData.role || ""} 
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Display Order</label>
                      <input 
                        type="number" 
                        value={formData.order || 0} 
                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Image Link</label>
                    <input 
                      type="text" 
                      value={formData.image || ""} 
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Short Biography</label>
                    <textarea 
                      rows={4}
                      value={formData.bio || ""} 
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-955 border border-slate-850 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      id="teamPublished"
                      type="checkbox" 
                      checked={formData.published !== false} 
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="accent-primary"
                    />
                    <label htmlFor="teamPublished" className="text-xs text-slate-350 font-semibold select-none">Publish Immediately</label>
                  </div>
                </>
              )}

              {/* FAQ form fields */}
              {activeTab === "faq" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Question</label>
                    <input 
                      type="text" 
                      value={formData.question || ""} 
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Answer</label>
                    <textarea 
                      rows={5}
                      value={formData.answer || ""} 
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-955 border border-slate-850 rounded-xl text-sm focus:outline-none resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      id="faqPublished"
                      type="checkbox" 
                      checked={formData.published !== false} 
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="accent-primary"
                    />
                    <label htmlFor="faqPublished" className="text-xs text-slate-350 font-semibold select-none">Publish Immediately</label>
                  </div>
                </>
              )}

              {/* Users form fields */}
              {activeTab === "users" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name || ""} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  {modalAction === "add" && (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email || ""} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Password {modalAction === "edit" && "(leave blank if unchanged)"}</label>
                    <input 
                      type="password" 
                      value={formData.password || ""} 
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={modalAction === "add"}
                      className="w-full px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Administrative Role</label>
                    <select
                      value={formData.role || "USER"}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs focus:outline-none text-slate-300"
                    >
                      <option value="SUPER_ADMIN">Super Admin (full control)</option>
                      <option value="CONTENT_MANAGER">Content Manager (blogs/crud)</option>
                      <option value="MEDIA_MANAGER">Media Manager (library access)</option>
                      <option value="SEO_MANAGER">SEO Manager (meta controls)</option>
                      <option value="USER">User (read only)</option>
                    </select>
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 text-slate-350 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="faith-gradient faith-gradient-hover text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider disabled:opacity-45"
                >
                  {submitting ? "Saving..." : "Save Record"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

