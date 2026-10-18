"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/2348034415260?text=Hello%2C%20I%27d%20like%20to%20make%20a%20booking%20at%20Beauty%20Endowed."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      aria-label="Book on WhatsApp"
    >
      <MessageCircle size={24} className="text-white" />
      {/* Tooltip */}
      <div className="absolute right-full mr-3 bg-espresso text-ivory text-xs py-2 px-3 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Book on WhatsApp
      </div>
    </a>
  );
}
