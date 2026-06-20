"use client";
import { adminApi } from "@/lib/api";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

const FIELDS = [
  { section: "Company Info", fields: [
    { key: "company_name", label: "Company Name", type: "text" },
    { key: "company_tagline", label: "Tagline", type: "text" },
    { key: "company_email", label: "Email Address", type: "email" },
    { key: "company_phone", label: "Phone Number", type: "tel" },
    { key: "company_address", label: "Office Address", type: "text" },
  ]},
  { section: "Homepage Hero", fields: [
    { key: "hero_headline", label: "Hero Headline", type: "text" },
    { key: "hero_subheadline", label: "Hero Subheadline", type: "text" },
    { key: "hero_cta_primary", label: "Primary CTA Text", type: "text" },
    { key: "hero_cta_secondary", label: "Secondary CTA Text", type: "text" },
  ]},
  { section: "Stats", fields: [
    { key: "stat_1_value", label: "Stat 1 Value (e.g. 200+)", type: "text" },
    { key: "stat_1_label", label: "Stat 1 Label", type: "text" },
    { key: "stat_2_value", label: "Stat 2 Value", type: "text" },
    { key: "stat_2_label", label: "Stat 2 Label", type: "text" },
    { key: "stat_3_value", label: "Stat 3 Value", type: "text" },
    { key: "stat_3_label", label: "Stat 3 Label", type: "text" },
    { key: "stat_4_value", label: "Stat 4 Value", type: "text" },
    { key: "stat_4_label", label: "Stat 4 Label", type: "text" },
  ]},
  { section: "Social Media", fields: [
    { key: "social_linkedin", label: "LinkedIn URL", type: "url" },
    { key: "social_instagram", label: "Instagram URL", type: "url" },
    { key: "social_twitter", label: "Twitter / X URL", type: "url" },
    { key: "social_whatsapp", label: "WhatsApp Number (with country code)", type: "tel" },
  ]},
  { section: "SEO", fields: [
    { key: "seo_default_title", label: "Default Page Title", type: "text" },
    { key: "seo_default_description", label: "Default Meta Description", type: "text" },
    { key: "footer_tagline", label: "Footer Tagline", type: "text" },
  ]},
];

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminApi.getSettings()
      .then((data) => setValues(data || {}))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updateSettings(values);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      {FIELDS.map(({ section, fields }) => (
        <div key={section} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-heading text-sm">{section}</h2>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, type }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-body">{label}</label>
                <input
                  type={type}
                  value={values[key] || ""}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sticky save bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 -mx-6 px-6 py-3 flex items-center justify-between">
        {saved ? (
          <span className="flex items-center gap-2 text-green-600 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Settings saved
          </span>
        ) : <span />}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-dark transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
