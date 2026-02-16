"use client"

import Image from "next/image"
import { Phone, ArrowRight, Sparkles } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Image
              src="/images/logo.jpg"
              alt="Salchipaperia D.C. Logo"
              width={96}
              height={96}
              className="rounded-full glow-yellow"
            />
            <div className="absolute -inset-2 animate-pulse-glow rounded-full border-2 border-primary/30" />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <span className="text-sm font-semibold tracking-widest text-accent uppercase">
            No esperes mas
          </span>
          <Sparkles className="h-5 w-5 text-accent" />
        </div>

        <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          <span className="text-balance">
            {"Tu Salchipapa Perfecta "}
            <span className="text-gradient">Te Espera</span>
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {"Ordena ahora para delivery o visita cualquiera de nuestras 7+ sedes. La experiencia premium que tu paladar se merece."}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:+51999999999"
            className="group flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground transition-all duration-300 hover:scale-105 glow-yellow"
          >
            <Phone className="h-5 w-5" />
            Ordenar por Delivery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#sedes"
            className="sparkle-border flex items-center gap-2 rounded-full px-10 py-4 text-base font-bold text-foreground transition-all duration-300 hover:scale-105"
          >
            Visitar una Sede
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-xs font-bold text-foreground"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {"Mas de 50,000 clientes satisfechos"}
          </span>
        </div>
      </div>
    </section>
  )
}
