"use client";
import { publicApi, type EnquiryPayload } from "@/lib/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./Button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  className?: string;
  variant?: "inline" | "full";
  services?: { id: string; title: string }[];
  redirectOnSuccess?: boolean;
}

export function LeadForm({
  className,
  variant = "full",
  services = [],
  redirectOnSuccess = true,
}: LeadFormProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const payload: EnquiryPayload = { ...data, sourcePage: pathname };
    await publicApi.submitEnquiry(payload);
    reset();
    setSubmitted(true);
    if (redirectOnSuccess) {
      setTimeout(() => router.push("/thank-you"), 800);
    }
  };

  if (submitted && !redirectOnSuccess) {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-8", className)}>
        <CheckCircle className="w-12 h-12 text-accent-teal" />
        <p className="font-semibold text-heading text-lg">Message sent!</p>
        <p className="text-body text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  const isInline = variant === "inline";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        isInline
          ? "flex flex-col sm:flex-row gap-3 flex-wrap"
          : "grid grid-cols-1 sm:grid-cols-2 gap-4",
        className
      )}
    >
      {/* Name */}
      <div className={cn("flex flex-col gap-1", isInline && "flex-1 min-w-[160px]")}>
        <input
          {...register("name")}
          placeholder="Full Name *"
          className="input-field"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className={cn("flex flex-col gap-1", isInline && "flex-1 min-w-[200px]")}>
        <input
          {...register("email")}
          type="email"
          placeholder="Email Address *"
          className="input-field"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      {!isInline && (
        <div className="flex flex-col gap-1">
          <input {...register("phone")} placeholder="Phone Number" className="input-field" />
        </div>
      )}

      {/* Company */}
      {!isInline && (
        <div className="flex flex-col gap-1">
          <input {...register("company")} placeholder="Company / Brand Name" className="input-field" />
        </div>
      )}

      {/* Service interest */}
      {!isInline && services.length > 0 && (
        <div className="sm:col-span-2 flex flex-col gap-1">
          <select {...register("serviceInterest")} className="input-field">
            <option value="">Service Interest (optional)</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Message */}
      {!isInline && (
        <div className="sm:col-span-2 flex flex-col gap-1">
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Tell us about your project..."
            className="input-field resize-none"
          />
        </div>
      )}

      {/* Submit */}
      <div className={cn(isInline ? "flex-shrink-0" : "sm:col-span-2")}>
        <Button
          type="submit"
          disabled={isSubmitting}
          size={isInline ? "md" : "lg"}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
          ) : (
            "Get a Free Consultation"
          )}
        </Button>
      </div>

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid var(--color-border);
          border-radius: 0.75rem;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          color: var(--color-heading);
          background: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: var(--color-navy);
        }
        .input-field::placeholder {
          color: var(--color-muted);
        }
      `}</style>
    </form>
  );
}
