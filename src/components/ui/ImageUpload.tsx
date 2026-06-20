"use client";
import { api } from "@/lib/api";
import { ImageIcon, Loader2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  compact?: boolean;
}

export function ImageUpload({ value, onChange, label = "Cover Image", compact = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/api/media/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(data.data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  if (compact) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-body">{label}</label>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
        <div className="relative group w-20 h-20 flex-shrink-0">
          {value ? (
            <>
              <div
                className="w-20 h-20 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                <Image src={value} alt={label} fill className="object-contain p-1" unoptimized />
                {uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
                    <Loader2 className="w-4 h-4 animate-spin text-navy" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div
              onDrop={onDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => !uploading && inputRef.current?.click()}
              className={`w-20 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragOver ? "border-navy bg-bg-mint" : "border-gray-200 bg-gray-50 hover:border-navy/40 hover:bg-bg-mint"
              }`}
            >
              {uploading
                ? <Loader2 className="w-5 h-5 animate-spin text-navy" />
                : <UploadCloud className="w-5 h-5 text-muted" />}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-body">{label}</label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="w-3 h-3" /> Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 w-full h-40 group">
          <Image src={value} alt="Cover" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-heading text-xs font-semibold shadow hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              {uploading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <UploadCloud className="w-3.5 h-3.5" />}
              {uploading ? "Uploading…" : "Replace Image"}
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed w-full h-40 cursor-pointer transition-colors ${
            dragOver
              ? "border-navy bg-bg-mint"
              : "border-gray-200 bg-gray-50 hover:border-navy/40 hover:bg-bg-mint"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-navy" />
              <span className="text-xs text-muted">Uploading…</span>
            </div>
          ) : (
            <>
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <ImageIcon className="w-5 h-5 text-muted" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-heading">
                  Click to upload <span className="text-muted font-normal">or drag & drop</span>
                </p>
                <p className="text-xs text-muted mt-0.5">PNG, JPG, WebP</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
