"use client";
import { adminApi } from "@/lib/api";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getBlogPosts()
      .then((data) => setPosts(data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    setDeleting(id);
    try {
      await adminApi.deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-body text-sm">{posts.length} posts</p>
        <Link href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide">Title</th>
              <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3 font-semibold text-body text-xs uppercase tracking-wide hidden sm:table-cell">Published</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center"><Loader2 className="w-5 h-5 animate-spin text-navy mx-auto" /></td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-body text-sm">No posts yet. <Link href="/admin/blog/new" className="text-navy underline">Write one</Link></td></tr>
            ) : posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-heading line-clamp-1">{p.title}</p>
                  <p className="text-muted text-xs">/blog/{p.slug}</p>
                </td>
                <td className="px-5 py-3.5 text-body text-sm hidden md:table-cell">{p.category?.name || "—"}</td>
                <td className="px-5 py-3.5">
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
                    p.status === "published" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                  )}>{p.status}</span>
                </td>
                <td className="px-5 py-3.5 text-muted text-xs hidden sm:table-cell">{p.publishedAt ? formatDate(p.publishedAt) : "—"}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/blog/${p.id}`} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 hover:text-navy transition-colors"><Pencil className="w-3.5 h-3.5" /></Link>
                    <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40">
                      {deleting === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
