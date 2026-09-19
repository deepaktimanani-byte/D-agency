"use client";
import { useEffect, useState } from "react";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.2 11.2a8.1 8.1 0 0 1-11.9 7.1L4 19.5l1.3-4.1A8.1 8.1 0 1 1 20.2 11.2Z" />
      <path d="M8.2 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .5.3.6 1.2 1.7 2.2 2.2.2.1.4.1.5-.1l.6-.7c.1-.2.3-.2.5-.1l1.7.8c.2.1.3.3.2.5l-.2.8c-.1.4-.5.7-.9.8-.9.1-2.5-.4-4.1-1.9-1.4-1.3-2.1-2.8-2.3-3.7-.1-.5.1-1 .5-1.5Z" />
    </svg>
  );
}

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
      <WhatsAppIcon />
    </a>
  );
}
