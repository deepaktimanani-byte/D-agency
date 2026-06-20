"use client";
import { api } from "@/lib/api";
import { Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

type Category = { id: string; name: string; slug: string };

export default function ServiceCategoriesPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // inline add form
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  // inline edit
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    api.get("/api/admin/service-categories")
      .then((r) => setCats(r.data.data || []))
      .catch(() => setCats([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    setSaving(true);
    try {
      const r = await api.post("/api/admin/service-categories", { name });
      setCats((p) => [...p, r.data.data]);
      setNewName("");
      setAdding(false);
    } catch { alert("Failed to add."); }
    finally { setSaving(false); }
  }

  async function handleEdit(id: string) {
    const name = editName.trim();
    if (!name) return;
    setSaving(true);
    try {
      const r = await api.put(`/api/admin/service-categories/${id}`, { name });
      setCats((p) => p.map((c) => c.id === id ? r.data.data : c));
      setEditId(null);
    } catch { alert("Failed to update."); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? Services using it will be unassigned.")) return;
    setDeleting(id);
    try {
      await api.delete(`/api/admin/service-categories/${id}`);
      setCats((p) => p.filter((c) => c.id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  }

  const inp = "px-3 py-2 rounded-xl border border-gray-200 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition";

  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-heading">Service Categories</h2>
          <p className="text-muted text-xs mt-0.5">Organise your services into groups</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditId(null); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Add row */}
      {adding && (
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-100 px-4 py-3">
          <input
            autoFocus
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAdding(false); }}
            placeholder="Category name"
            className={`${inp} flex-1`}
          />
          <button onClick={handleAdd} disabled={saving} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold disabled:opacity-60">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save
          </button>
          <button onClick={() => setAdding(false)} className="w-8 h-8 flex items-center justify-center rounded-xl text-muted hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-5 h-5 animate-spin text-navy" />
          </div>
        ) : cats.length === 0 && !adding ? (
          <div className="py-12 text-center text-body text-sm">
            No categories yet. Add one to get started.
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {cats.map((c) => (
              <li key={c.id} className="flex items-center gap-3 px-5 py-3.5">
                {editId === c.id ? (
                  <>
                    <input
                      autoFocus
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleEdit(c.id); if (e.key === "Escape") setEditId(null); }}
                      className={`${inp} flex-1`}
                    />
                    <button onClick={() => handleEdit(c.id)} disabled={saving} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold disabled:opacity-60">
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      Save
                    </button>
                    <button onClick={() => setEditId(null)} className="w-8 h-8 flex items-center justify-center rounded-xl text-muted hover:bg-gray-100">
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-semibold text-heading text-sm">{c.name}</p>
                      <p className="text-muted text-xs">{c.slug}</p>
                    </div>
                    <button
                      onClick={() => { setEditId(c.id); setEditName(c.name); setAdding(false); }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 hover:text-navy transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      disabled={deleting === c.id}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40"
                    >
                      {deleting === c.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
