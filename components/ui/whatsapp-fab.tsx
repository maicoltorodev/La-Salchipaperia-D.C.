"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppFAB() {
    return (
        <a
            href="https://wa.me/573005946797"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-500 hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] active:scale-90 glow-green"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="h-7 w-7 fill-white" />

            {/* Ripple Animation */}
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        </a>
    )
}
