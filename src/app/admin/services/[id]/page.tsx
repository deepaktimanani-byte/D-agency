"use client";
import { adminApi, api } from "@/lib/api";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { Service } from "@/types";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProcessStep = { title: string; description: string };
type Faq = { question: string; answer: string };
type Category = { id: string; name: string };

type FormData = {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string;
  coverImage: string;
  categoryId: string;
  ctaText: string;
  isFeatured: boolean;
  status: string;
  sortOrder: number;
  features: string[];
  processSteps: ProcessStep[];
  faqs: Faq[];
  pricing: string;
  timeline: string;
  targetAudience: string;
  metaTitle: string;
  metaDescription: string;
};

const EMPTY: FormData = {
  title: "", slug: "", shortDescription: "",
  icon: "", coverImage: "", categoryId: "", ctaText: "Get in Touch",
  isFeatured: false, status: "draft", sortOrder: 0,
  features: [], processSteps: [], faqs: [],
  pricing: "", timeline: "", targetAudience: "",
  metaTitle: "", metaDescription: "",
};

export default function ServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";
  const [form, setForm] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get("/api/admin/service-categories")
      .then((r) => setCategories(r.data.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isNew) return;
    adminApi.getServices()
      .then((data: Service[]) => {
        const s = data?.find((x) => x.id === id);
        if (s) setForm({
          title: s.title, slug: s.slug, shortDescription: s.shortDescription,
          icon: s.icon || "", coverImage: s.coverImage || "",
          categoryId: s.category?.id || "",
          ctaText: s.ctaText, isFeatured: s.isFeatured, status: s.status, sortOrder: s.sortOrder,
          features: s.features || [], processSteps: s.processSteps || [], faqs: s.faqs || [],
          pricing: s.pricing || "", timeline: s.timeline || "",
          targetAudience: s.targetAudience || "",
          metaTitle: s.metaTitle || "", metaDescription: s.metaDescription || "",
        });
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  function set<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm((p) => ({ ...p, [k]: v }));
    if (k === "title" && isNew) setForm((p) => ({ ...p, title: v as string, slug: slugify(v as string) }));
  }

  // Features
  function addFeature() {
    const val = featureInput.trim();
    if (!val) return;
    set("features", [...form.features, val]);
    setFeatureInput("");
  }
  function removeFeature(i: number) {
    set("features", form.features.filter((_, idx) => idx !== i));
  }

  // Process Steps
  function addStep() {
    set("processSteps", [...form.processSteps, { title: "", description: "" }]);
  }
  function updateStep(i: number, field: keyof ProcessStep, val: string) {
    const steps = form.processSteps.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    set("processSteps", steps);
  }
  function removeStep(i: number) {
    set("processSteps", form.processSteps.filter((_, idx) => idx !== i));
  }

  // FAQs
  function addFaq() {
    set("faqs", [...form.faqs, { question: "", answer: "" }]);
  }
  function updateFaq(i: number, field: keyof Faq, val: string) {
    const faqs = form.faqs.map((f, idx) => idx === i ? { ...f, [field]: val } : f);
    set("faqs", faqs);
  }
  function removeFaq(i: number) {
    set("faqs", form.faqs.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) await adminApi.createService(form);
      else await adminApi.updateService(id, form);
      router.push("/admin/services");
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-navy" /></div>;

  const inp = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition";
  const sectionCard = "bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/services" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h2 className="font-bold text-heading">{isNew ? "New Service" : "Edit Service"}</h2>
      </div>

      {/* ── Basic Info ── */}
      <div className={sectionCard}>
        <p className="text-xs font-bold text-muted uppercase tracking-wider">Basic Info</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Title *</label>
            <input required type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className={inp} placeholder="e.g. Digital Marketing" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Slug *</label>
            <input required type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inp} placeholder="digital-marketing" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Short Description *</label>
            <textarea required rows={2} value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} className={`${inp} resize-none`} placeholder="One or two sentences shown on the service card" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Category</label>
            <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inp}>
              <option value="">— No category —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-muted">
                <a href="/admin/service-categories" className="underline text-navy" target="_blank">Add categories first</a>
              </p>
            )}
          </div>
        </div>
        <ImageUpload value={form.coverImage} onChange={(url) => set("coverImage", url)} />
      </div>

      {/* ── Service Details ── */}
      <div className={sectionCard}>
        <p className="text-xs font-bold text-muted uppercase tracking-wider">Service Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Pricing</label>
            <input type="text" value={form.pricing} onChange={(e) => set("pricing", e.target.value)} className={inp} placeholder="e.g. Starting from ₹15,000/mo" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Typical Timeline</label>
            <input type="text" value={form.timeline} onChange={(e) => set("timeline", e.target.value)} className={inp} placeholder="e.g. 2–4 weeks" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Who Is This For?</label>
          <input type="text" value={form.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} className={inp} placeholder="e.g. Startups & growing e-commerce brands" />
        </div>
      </div>

      {/* ── What's Included ── */}
      <div className={sectionCard}>
        <p className="text-xs font-bold text-muted uppercase tracking-wider">What&apos;s Included</p>
        <div className="flex flex-col gap-2">
          {form.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-mint border border-border-light">
              <span className="flex-1 text-sm text-heading">{f}</span>
              <button type="button" onClick={() => removeFeature(i)} className="text-muted hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
            className={inp}
            placeholder="e.g. Google Ads Management — press Enter to add"
          />
          <button type="button" onClick={addFeature} className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Our Process ── */}
      <div className={sectionCard}>
        <p className="text-xs font-bold text-muted uppercase tracking-wider">Our Process</p>
        <div className="flex flex-col gap-3">
          {form.processSteps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-7 h-7 mt-2.5 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
              <div className="flex-1 flex flex-col gap-2">
                <input type="text" value={step.title} onChange={(e) => updateStep(i, "title", e.target.value)} className={inp} placeholder="Step title" />
                <textarea rows={2} value={step.description} onChange={(e) => updateStep(i, "description", e.target.value)} className={`${inp} resize-none`} placeholder="What happens in this step?" />
              </div>
              <button type="button" onClick={() => removeStep(i)} className="mt-2.5 text-muted hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addStep} className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-navy-dark transition-colors">
          <Plus className="w-4 h-4" /> Add Step
        </button>
      </div>

      {/* ── FAQs ── */}
      <div className={sectionCard}>
        <p className="text-xs font-bold text-muted uppercase tracking-wider">FAQs</p>
        <div className="flex flex-col gap-4">
          {form.faqs.map((faq, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-1 flex flex-col gap-2">
                <input type="text" value={faq.question} onChange={(e) => updateFaq(i, "question", e.target.value)} className={inp} placeholder="Question" />
                <textarea rows={2} value={faq.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} className={`${inp} resize-none`} placeholder="Answer" />
              </div>
              <button type="button" onClick={() => removeFaq(i)} className="mt-2.5 text-muted hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addFaq} className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-navy-dark transition-colors">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {/* ── Settings ── */}
      <div className={sectionCard}>
        <p className="text-xs font-bold text-muted uppercase tracking-wider">Settings</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">CTA Button Text</label>
            <input type="text" value={form.ctaText} onChange={(e) => set("ctaText", e.target.value)} className={inp} placeholder="e.g. Get in Touch" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inp}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value))} className={inp} />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="w-4 h-4 accent-navy rounded" />
          <span className="text-sm font-medium text-heading">Feature this service on the homepage</span>
        </label>
      </div>

      {/* ── SEO ── */}
      <div className={sectionCard}>
        <p className="text-xs font-bold text-muted uppercase tracking-wider">SEO</p>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Meta Title</label>
          <input type="text" value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} className={inp} placeholder="Defaults to service title if empty" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Meta Description</label>
          <textarea rows={2} value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} className={`${inp} resize-none`} placeholder="Defaults to short description if empty" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Service"}
        </button>
        <Link href="/admin/services" className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-body hover:bg-gray-50 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
