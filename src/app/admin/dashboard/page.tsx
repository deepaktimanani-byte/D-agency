"use client";
import { StatCard } from "@/components/admin/StatCard";
import { adminApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Layers,
  MessageSquare,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  totalEnquiries: number;
  newEnquiries: number;
  totalServices: number;
  publishedPosts: number;
  totalStories: number;
  totalTeamMembers: number;
}

interface RecentEnquiry {
  id: string;
  name: string;
  email: string;
  serviceInterest?: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-yellow-50 text-yellow-600",
  closed: "bg-green-50 text-green-600",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [enquiries, setEnquiries] = useState<RecentEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, e] = await Promise.allSettled([
          adminApi.getStats(),
          adminApi.getEnquiries({ page: 1 }),
        ]);
        if (s.status === "fulfilled") setStats(s.value);
        if (e.status === "fulfilled") setEnquiries((e.value?.items || e.value || []).slice(0, 6));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Enquiries"
          value={loading ? "—" : (stats?.totalEnquiries ?? 0)}
          icon={MessageSquare}
          trend={stats?.newEnquiries ? `${stats.newEnquiries} new` : undefined}
          trendUp
          color="navy"
        />
        <StatCard
          label="Active Services"
          value={loading ? "—" : (stats?.totalServices ?? 0)}
          icon={Layers}
          color="teal"
        />
        <StatCard
          label="Blog Posts"
          value={loading ? "—" : (stats?.publishedPosts ?? 0)}
          icon={FileText}
          color="orange"
        />
        <StatCard
          label="Success Stories"
          value={loading ? "—" : (stats?.totalStories ?? 0)}
          icon={Trophy}
          color="purple"
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "New Service", href: "/admin/services/new", color: "bg-navy text-white" },
          { label: "New Blog Post", href: "/admin/blog/new", color: "bg-accent-teal text-white" },
          { label: "New Story", href: "/admin/success-stories/new", color: "bg-navy/10 text-navy" },
          { label: "View Enquiries", href: "/admin/enquiries", color: "bg-gray-100 text-heading" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className={`rounded-xl px-4 py-3 text-sm font-semibold text-center transition-opacity hover:opacity-80 ${q.color}`}
          >
            {q.label}
          </Link>
        ))}
      </div>

      {/* Recent enquiries */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-heading text-sm">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-xs font-semibold text-navy hover:underline">
            View all →
          </Link>
        </div>
        {enquiries.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {enquiries.map((enq) => (
              <div key={enq.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-0.5">
                  <p className="font-semibold text-heading text-sm">{enq.name}</p>
                  <p className="text-muted text-xs">{enq.email} {enq.serviceInterest && `· ${enq.serviceInterest}`}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[enq.status] || "bg-gray-100 text-gray-600"}`}>
                    {enq.status}
                  </span>
                  <span className="text-xs text-muted">{formatDate(enq.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-10 text-center">
            <Users className="w-8 h-8 text-muted mx-auto mb-2" />
            <p className="text-body text-sm">{loading ? "Loading…" : "No enquiries yet"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
