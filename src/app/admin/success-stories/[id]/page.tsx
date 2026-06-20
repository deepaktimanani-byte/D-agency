"use client";
import { adminApi, api } from "@/lib/api";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { SuccessStory } from "@/types";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const INDUSTRIES = [
  "SaaS", "E-Commerce", "Retail", "Healthcare",
  "Finance", "Real Estate", "Education", "Other",
];

type FormData = {
  title: string; slug: string; clientName: string; clientLogo: string;
  industry: string; industryOther: string; categoryId: string;
  challenge: string; solution: string; testimonial: string;
  testimonialAuthorName: string; testimonialAuthorRole: string;
  isFeatured: boolean; status: string;
};

const EMPTY: FormData = {
  title: "", slug: "", clientName: "", clientLogo: "",
  industry: "", industryOther: "", categoryId: "",
  challenge: "", solution: "", testimonial: "",
  testimonialAuthorName: "", testimonialAuthorRole: "",
  isFeatured: false, status: "draft",
};

export default function StoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    api.get("/api/admin/service-categories")
      .then((r) => setCategories(r.data.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isNew) return;
    adminApi.getStories()
      .then((data: SuccessStory[]) => {
        const s = data?.find((x) => x.id === id);
        if (s) {
          const isKnownIndustry = INDUSTRIES.slice(0, -1).includes(s.industry || "");
          setForm({
            title: s.title, slug: s.slug, clientName: s.clientName || "",
            clientLogo: s.clientLogo || "",
            industry: isKnownIndustry ? (s.industry || "") : (s.industry ? "Other" : ""),
            industryOther: isKnownIndustry ? "" : (s.industry || ""),
            categoryId: s.category?.id || "",
            challenge: s.challenge, solution: s.solution,
            testimonial: s.testimonial || "",
            testimonialAuthorName: s.testimonialAuthorName || "",
            testimonialAuthorRole: s.testimonialAuthorRole || "",
            isFeatured: s.isFeatured, status: s.status,
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  function set<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    if (k === "title" && isNew) setForm((p) => ({ ...p, title: v as string, slug: slugify(v as string) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const { industryOther, ...rest } = form;
      const payload = {
        ...rest,
        industry: form.industry === "Other" ? industryOther : form.industry,
        categoryId: form.categoryId || null,
      };
      if (isNew) await adminApi.createStory(payload);
      else await adminApi.updateStory(id, payload);
      router.push("/admin/success-stories");
    } catch { alert("Failed to save."); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-navy" /></div>;

  const inp = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <Link href="/admin/success-stories" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
        <h2 className="font-bold text-heading">{isNew ? "New Story" : "Edit Story"}</h2>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
        {/* Title & Slug */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Title *</label>
          <input required type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className={inp} placeholder="e.g. How We Helped Acme Corp Grow 3x" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Slug *</label>
          <input required type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inp} placeholder="acme-corp-growth" />
        </div>

        {/* Industry + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Industry</label>
            <select value={form.industry} onChange={(e) => set("industry", e.target.value)} className={inp}>
              <option value="">— Select industry —</option>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
            {form.industry === "Other" && (
              <input
                type="text"
                value={form.industryOther}
                onChange={(e) => set("industryOther", e.target.value)}
                placeholder="Specify industry"
                className={inp}
              />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Service Category</label>
            <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inp}>
              <option value="">— No category —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-muted">
                <a href="/admin/service-categories" className="underline text-navy" target="_blank">Add categories first</a>
              </p>
            )}
          </div>
        </div>

        {/* Client info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Client Name</label>
            <input type="text" value={form.clientName} onChange={(e) => set("clientName", e.target.value)} className={inp} placeholder="e.g. Acme Corp" />
          </div>
        </div>
        <ImageUpload value={form.clientLogo} onChange={(url) => set("clientLogo", url)} label="Client Logo" />

        {/* Story */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Challenge *</label>
          <textarea required rows={3} value={form.challenge} onChange={(e) => set("challenge", e.target.value)} className={`${inp} resize-none`} placeholder="Describe the client's problem or challenge before working with you..." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Solution *</label>
          <textarea required rows={3} value={form.solution} onChange={(e) => set("solution", e.target.value)} className={`${inp} resize-none`} placeholder="Explain the strategy and solution you delivered..." />
        </div>

        {/* Testimonial */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Client Testimonial</label>
          <textarea rows={3} value={form.testimonial} onChange={(e) => set("testimonial", e.target.value)} className={`${inp} resize-none`} placeholder="What did the client say about working with you?" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Author Name</label>
            <input type="text" value={form.testimonialAuthorName} onChange={(e) => set("testimonialAuthorName", e.target.value)} className={inp} placeholder="e.g. John Smith" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Author Role</label>
            <input type="text" value={form.testimonialAuthorRole} onChange={(e) => set("testimonialAuthorRole", e.target.value)} className={inp} placeholder="e.g. CEO, Acme Corp" />
          </div>
        </div>

        {/* Settings */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="w-4 h-4 accent-navy rounded" />
            <span className="text-sm font-medium text-heading">Feature on homepage</span>
          </label>
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Story"}
        </button>
        <Link href="/admin/success-stories" className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-body hover:bg-gray-50 transition-colors">Cancel</Link>
      </div>
    </form>
  );
}
