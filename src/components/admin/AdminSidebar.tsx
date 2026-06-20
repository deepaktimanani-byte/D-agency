"use client";
import { cn } from "@/lib/utils";
import {
  FileText,
  FolderOpen,
  LayoutDashboard,
  Layers,
  LogOut,
  MessageSquare,
  Quote,
  Settings,
  Trophy,
  Users,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Services", href: "/admin/services", icon: Layers },
  { label: "Categories", href: "/admin/service-categories", icon: FolderOpen },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Success Stories", href: "/admin/success-stories", icon: Trophy },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/admin/login");
  }

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
        {!collapsed && (
          <span className="font-extrabold text-heading text-sm tracking-tight">
            Agency<span className="text-navy">Admin</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-navy text-white"
                  : "text-body hover:bg-gray-50 hover:text-heading"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="border-t border-gray-100 py-3 px-2 flex flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="View Site"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-body hover:bg-gray-50 hover:text-heading transition-colors"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>View Site</span>}
        </a>
        <button
          onClick={logout}
          title="Logout"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
