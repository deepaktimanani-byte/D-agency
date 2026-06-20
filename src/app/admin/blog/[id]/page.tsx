"use client";
import { adminApi, api } from "@/lib/api";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { BlogPost } from "@/types";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormData = {
  title: string; slug: string; excerpt: string; content: string;
  featuredImage: string; categoryId: string; tags: string;
  readTimeMinutes: number; status: string; publishedAt: string;
};

const EMPTY: FormData = {
  title: "", slug: "", excerpt: "", content: "",
  featuredImage: "", categoryId: "", tags: "",
  readTimeMinutes: 5, status: "draft", publishedAt: "",
};

export default function BlogEditPage() {
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
    adminApi.getBlogPosts()
      .then((data: BlogPost[]) => {
        const p = data?.find((x) => x.id === id);
        if (p) setForm({
          title: p.title, slug: p.slug, excerpt: p.excerpt || "", content: p.content,
          featuredImage: p.featuredImage || "", categoryId: p.category?.id || "",
          tags: p.tags?.join(", ") || "", readTimeMinutes: p.readTimeMinutes,
          status: p.status, publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 16) : "",
        });
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
      const payload = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
      if (isNew) await adminApi.createBlogPost(payload);
      else await adminApi.updateBlogPost(id, payload);
      router.push("/admin/blog");
    } catch { alert("Failed to save."); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-navy" /></div>;

  const inp = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 transition-colors"><ArrowLeft className="w-4 h-4" /></Link>
        <h2 className="font-bold text-heading">{isNew ? "New Post" : "Edit Post"}</h2>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Title *</label>
            <input required type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className={inp} placeholder="e.g. 10 Digital Marketing Trends to Watch in 2025" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Slug *</label>
            <input required type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inp} placeholder="digital-marketing-trends-2025" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Excerpt</label>
          <textarea rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className={`${inp} resize-none`} placeholder="A short summary shown on the blog listing page..." />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-body">Content *</label>
          <RichTextEditor value={form.content} onChange={(html) => set("content", html)} />
        </div>
        <ImageUpload value={form.featuredImage} onChange={(url) => set("featuredImage", url)} label="Featured Image" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Category</label>
            <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inp}>
              <option value="">— No category —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Tags (comma-separated)</label>
            <input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)} className={inp} placeholder="seo, growth, digital" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Read Time (minutes)</label>
            <input type="number" min={1} value={form.readTimeMinutes} onChange={(e) => set("readTimeMinutes", Number(e.target.value))} className={inp} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-body">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inp}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-body">Publish Date</label>
            <input type="datetime-local" value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} className={inp} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Post"}
        </button>
        <Link href="/admin/blog" className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-body hover:bg-gray-50 transition-colors">Cancel</Link>
      </div>
    </form>
  );
}
