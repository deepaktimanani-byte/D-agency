"use client";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface WhatsAppButtonProps {
  number: string;
  message?: string;
}

export function WhatsAppButton({
  number,
  message = "Hi! I'd like to learn more about your services.",
}: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const clean = number.replace(/[^0-9]/g, "");
  const href = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-[#25D366] text-white shadow-lg
        flex items-center justify-center
        hover:scale-110 hover:shadow-xl
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <MessageCircle className="w-7 h-7 fill-white" />
    </a>
  );
}
