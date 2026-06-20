"use client";
import { ThemePicker } from "@/components/admin/ThemePicker";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/enquiries": "Enquiries",
  "/admin/services": "Services",
  "/admin/blog": "Blog Posts",
  "/admin/success-stories": "Success Stories",
  "/admin/testimonials": "Testimonials",
  "/admin/team": "Team Members",
  "/admin/settings": "Site Settings",
};

export function AdminHeader() {
  const pathname = usePathname();
  const base = "/" + pathname.split("/").slice(1, 3).join("/");
  const title = TITLES[base] || "Admin";

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="font-bold text-heading text-sm">{title}</h1>
      <div className="flex items-center gap-3">
        <ThemePicker />
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-navy rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center">
          <span className="text-white text-xs font-bold">A</span>
        </div>
      </div>
    </header>
  );
}
