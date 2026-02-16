"use client"

import { Sparkles } from "lucide-react"

const items = [
  "Papas Crujientes",
  "Salchichas Premium",
  "Salsas Artesanales",
  "Bogota + Miami",
  "Proximamente Medellin",
  "Delivery Disponible",
  "Street Food Premium",
  "100% Calidad",
  "Hecho con Pasion",
]

export function MarqueeBanner() {
  return (
    <div className="overflow-hidden border-y border-border bg-primary py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-4">
            <Sparkles className="h-4 w-4 text-primary-foreground/60" />
            <span className="text-sm font-bold tracking-wide text-primary-foreground uppercase">
              {item}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
