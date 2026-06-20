"use client";
import { adminApi } from "@/lib/api";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { Testimonial } from "@/types";
import { Loader2, Pencil, Plus, Save, Star, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

const PAGES = [
  { value: "home", label: "Homepage" },
  { value: "about", label: "About Us" },
  { value: "services", label: "Services" },
  { value: "contact", label: "Contact" },
];

type FormData = { name: string; company: string; role: string; message: string; rating: number; avatar: string; displayPages: string[]; };
const EMPTY: FormData = { name: "", company: "", role: "", message: "", rating: 5, avatar: "", displayPages: ["home"] };

function parsePages(val: string): string[] {
  if (!val) return ["home"];
  return val.split(",").map((v) => v.trim()).filter(Boolean);
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getTestimonials()
      .then((d) => setItems(d || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function openNew() { setEditing("new"); setForm(EMPTY); }
  function openEdit(t: Testimonial) {
    setEditing(t.id);
    setForm({ name: t.name, company: t.company || "", role: t.role || "", message: t.message, rating: t.rating, avatar: t.avatar || "", displayPages: parsePages(t.displayPage) });
  }
  function set<K extends keyof FormData>(k: K, v: FormData[K]) { setForm((p) => ({ ...p, [k]: v })); }

  function togglePage(val: string) {
    setForm((p) => ({
      ...p,
      displayPages: p.displayPages.includes(val)
        ? p.displayPages.filter((v) => v !== val)
        : [...p.displayPages, val],
    }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, displayPage: form.displayPages.join(",") };
      if (editing === "new") {
        const t = await adminApi.createTestimonial(payload) as Testimonial;
        setItems((p) => [...p, t]);
      } else {
        const t = await adminApi.updateTestimonial(editing!, payload) as Testimonial;
        setItems((p) => p.map((x) => x.id === t.id ? t : x));
      }
      setEditing(null);
    } catch { alert("Failed to save."); }
    finally { setSaving(false); }
  }

  async function del(id: string) {
    if (!confirm("Delete?")) return; setDeleting(id);
    try { await adminApi.deleteTestimonial(id); setItems((p) => p.filter((x) => x.id !== id)); }
    catch { alert("Failed."); } finally { setDeleting(null); }
  }

  const inp = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition";

  return (
    <div className="flex gap-6">
      {/* List */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-body text-sm">{items.length} testimonials</p>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Testimonial
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {loading ? <div className="flex items-center justify-center py-10"><Loader2 className="w-5 h-5 animate-spin text-navy" /></div>
            : items.length === 0 ? <p className="text-body text-sm text-center py-10">No testimonials yet.</p>
            : items.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-heading text-sm">{t.name}</p>
                    {t.role && <span className="text-muted text-xs">· {t.role}{t.company && `, ${t.company}`}</span>}
                    <div className="flex gap-0.5 ml-auto">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-body text-sm line-clamp-2">&ldquo;{t.message}&rdquo;</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {parsePages(t.displayPage).map((p) => (
                      <span key={p} className="text-xs bg-navy/10 text-navy font-semibold px-2 py-0.5 rounded-full capitalize">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => openEdit(t)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 hover:text-navy transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(t.id)} disabled={deleting === t.id} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40">
                    {deleting === t.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Form panel */}
      {editing && (
        <div className="w-80 flex-shrink-0">
          <form onSubmit={save} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 sticky top-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-heading text-sm">{editing === "new" ? "New Testimonial" : "Edit"}</h3>
              <button type="button" onClick={() => setEditing(null)} className="text-muted hover:text-heading"><X className="w-4 h-4" /></button>
            </div>

            <ImageUpload value={form.avatar} onChange={(url) => set("avatar", url)} label="Avatar" compact />

            {(["name", "role", "company"] as const).map((k) => (
              <div key={k} className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-body capitalize">{k === "name" ? "Name *" : k}</label>
                <input required={k === "name"} type="text" value={form[k]} onChange={(e) => set(k, e.target.value)} className={inp} />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-body">Message *</label>
              <textarea required rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} className={`${inp} resize-none`} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-body">Rating</label>
              <select value={form.rating} onChange={(e) => set("rating", Number(e.target.value))} className={inp}>
                {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} stars</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-body">Display Pages</label>
              <div className="flex flex-col gap-2">
                {PAGES.map((p) => (
                  <label key={p.value} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.displayPages.includes(p.value)}
                      onChange={() => togglePage(p.value)}
                      className="w-4 h-4 accent-navy rounded"
                    />
                    <span className="text-sm text-heading">{p.label}</span>
                  </label>
                ))}
              </div>
              {form.displayPages.length === 0 && (
                <p className="text-xs text-red-500">Select at least one page</p>
              )}
            </div>

            <button type="submit" disabled={saving || form.displayPages.length === 0} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : "Save"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
