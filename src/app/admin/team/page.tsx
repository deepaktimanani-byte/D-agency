"use client";
import { adminApi } from "@/lib/api";
import { ImageUpload } from "@/components/ui/ImageUpload";
import type { TeamMember } from "@/types";
import { Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type FormData = { name: string; designation: string; bio: string; photo: string; linkedinUrl: string; sortOrder: number; };
const EMPTY: FormData = { name: "", designation: "", bio: "", photo: "", linkedinUrl: "", sortOrder: 0 };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getTeam()
      .then((d) => setMembers(d || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function openNew() { setEditing("new"); setForm(EMPTY); }
  function openEdit(m: TeamMember) { setEditing(m.id); setForm({ name: m.name, designation: m.designation, bio: m.bio || "", photo: m.photo || "", linkedinUrl: m.linkedinUrl || "", sortOrder: m.sortOrder }); }
  function set<K extends keyof FormData>(k: K, v: FormData[K]) { setForm((p) => ({ ...p, [k]: v })); }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    try {
      if (editing === "new") {
        const m = await adminApi.createMember(form) as TeamMember;
        setMembers((p) => [...p, m]);
      } else {
        const m = await adminApi.updateMember(editing!, form) as TeamMember;
        setMembers((p) => p.map((x) => x.id === m.id ? m : x));
      }
      setEditing(null);
    } catch { alert("Failed to save."); }
    finally { setSaving(false); }
  }

  async function del(id: string) {
    if (!confirm("Remove member?")) return; setDeleting(id);
    try { await adminApi.deleteMember(id); setMembers((p) => p.filter((x) => x.id !== id)); }
    catch { alert("Failed."); } finally { setDeleting(null); }
  }

  const inp = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition";

  return (
    <div className="flex gap-6">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-body text-sm">{members.length} members</p>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
        {loading ? <div className="flex items-center justify-center py-10"><Loader2 className="w-5 h-5 animate-spin text-navy" /></div>
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {m.photo ? <Image src={m.photo} alt={m.name} width={64} height={64} className="object-cover w-full h-full" />
                      : <div className="w-full h-full flex items-center justify-center bg-navy/10"><span className="font-bold text-navy text-lg">{m.name.charAt(0)}</span></div>}
                  </div>
                  <div>
                    <p className="font-bold text-heading">{m.name}</p>
                    <p className="text-body text-sm">{m.designation}</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => openEdit(m)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100 hover:text-navy transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => del(m.id)} disabled={deleting === m.id} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40">
                      {deleting === m.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
              {members.length === 0 && <p className="text-body text-sm col-span-3 text-center py-10">No team members yet.</p>}
            </div>}
      </div>

      {editing && (
        <div className="w-72 flex-shrink-0">
          <form onSubmit={save} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 sticky top-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-heading text-sm">{editing === "new" ? "New Member" : "Edit Member"}</h3>
              <button type="button" onClick={() => setEditing(null)} className="text-muted hover:text-heading"><X className="w-4 h-4" /></button>
            </div>
            <ImageUpload value={form.photo} onChange={(url) => set("photo", url)} label="Photo" compact />
            {[["name","Name *","text",true],["designation","Designation *","text",true],["linkedinUrl","LinkedIn URL","url",false]].map(([k,l,t,r]) => (
              <div key={k as string} className="flex flex-col gap-1"><label className="text-xs font-semibold text-body">{l as string}</label>
                <input required={r as boolean} type={t as string} value={(form as Record<string,unknown>)[k as string] as string} onChange={(e) => set(k as keyof FormData, e.target.value)} className={inp} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-body">Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => set("bio", e.target.value)} className={`${inp} resize-none`} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-body">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", Number(e.target.value))} className={inp} />
            </div>
            <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : "Save"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
