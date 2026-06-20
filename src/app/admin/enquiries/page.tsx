"use client";
import { adminApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Loader2, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  message?: string;
  sourcePage?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

const STATUSES = ["all", "new", "contacted", "closed"];
const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-yellow-50 text-yellow-600",
  closed: "bg-green-50 text-green-600",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);

  useEffect(() => {
    adminApi.getEnquiries()
      .then((data) => setEnquiries(data?.items || data || []))
      .catch(() => setEnquiries([]))
      .finally(() => setLoading(false));
  }, []);

  async function changeStatus(id: string, status: string) {
    await adminApi.updateEnquiryStatus(id, status);
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: status as Enquiry["status"] } : e));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status: status as Enquiry["status"] } : null);
  }

  const filtered = filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);

  return (
    <div className="flex gap-6 h-full">
      {/* List */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 p-1 w-fit">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors",
                filter === s ? "bg-navy text-white" : "text-body hover:text-heading"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide hidden md:table-cell">Contact</th>
                <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide hidden lg:table-cell">Service</th>
                <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center"><Loader2 className="w-5 h-5 animate-spin text-navy mx-auto" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-body text-sm">No enquiries found</td></tr>
              ) : (
                filtered.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => setSelected(enq)}
                    className={cn("hover:bg-gray-50 cursor-pointer transition-colors", selected?.id === enq.id && "bg-navy/5")}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-heading">{enq.name}</p>
                      {enq.company && <p className="text-muted text-xs">{enq.company}</p>}
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <div className="flex flex-col gap-0.5">
                        <a href={`mailto:${enq.email}`} className="text-navy text-xs flex items-center gap-1 hover:underline">
                          <Mail className="w-3 h-3" />{enq.email}
                        </a>
                        {enq.phone && (
                          <a href={`tel:${enq.phone}`} className="text-body text-xs flex items-center gap-1">
                            <Phone className="w-3 h-3" />{enq.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-body text-xs hidden lg:table-cell">{enq.serviceInterest || "—"}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={enq.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => changeStatus(enq.id, e.target.value)}
                        className={cn("text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer outline-none", STATUS_COLORS[enq.status])}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-muted text-xs hidden sm:table-cell">{formatDate(enq.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 h-fit sticky top-0">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-heading">{selected.name}</h3>
            <button onClick={() => setSelected(null)} className="text-muted hover:text-heading text-lg leading-none">×</button>
          </div>
          {selected.company && <p className="text-body text-sm -mt-2">{selected.company}</p>}
          <div className="flex flex-col gap-2 text-sm">
            <a href={`mailto:${selected.email}`} className="text-navy hover:underline">{selected.email}</a>
            {selected.phone && <a href={`tel:${selected.phone}`} className="text-body">{selected.phone}</a>}
          </div>
          {selected.serviceInterest && (
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Interested In</p>
              <p className="text-body text-sm">{selected.serviceInterest}</p>
            </div>
          )}
          {selected.message && (
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Message</p>
              <p className="text-body text-sm leading-relaxed">{selected.message}</p>
            </div>
          )}
          {selected.sourcePage && (
            <p className="text-xs text-muted">From: {selected.sourcePage}</p>
          )}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-muted">{formatDate(selected.createdAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
