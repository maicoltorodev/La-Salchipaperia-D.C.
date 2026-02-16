"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown, Sparkles } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-background"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-salchipapas.webp"
          alt="Salchipapas gourmet premium"
          fill
          className="object-cover opacity-30 sm:opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-transparent to-background/70" />
      </div>

      {/* Decorative elements - Only show on desktop for perf or make very simple for mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] animate-rotate-slow rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-1/4 left-10 h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
        <div className="absolute top-1/3 right-20 h-3 w-3 animate-pulse-glow rounded-full bg-accent" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/3 left-1/4 h-2 w-2 animate-pulse-glow rounded-full bg-primary" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 sm:py-32">
        <div className={`flex flex-col items-start gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="sparkle-border flex items-center gap-2 rounded-full px-4 py-2 animate-float">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold tracking-wider text-primary uppercase sm:text-sm">
              {"Bogotá D.C. + Miami"}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1] tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="block">{"La Salchipapa"}</span>
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(245,197,24,0.3)]">{"que Mereces"}</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            {"Street food elevado a su máxima expresión. Ingredientes premium, salsas artesanales y una experiencia que no olvidarás."}
          </p>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="#menu"
              className="group flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-5 text-base font-black text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 glow-yellow"
            >
              Ver Menú
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#sedes"
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-base font-black text-foreground backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              Encuentra tu Sede
            </a>
          </div>

          {/* Stats - Optimized for mobile layout */}
          <div className="mt-12 grid grid-cols-3 gap-4 sm:flex sm:gap-12">
            <div className="flex flex-col">
              <p className="text-3xl font-black text-primary sm:text-4xl">10</p>
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase sm:text-xs">Sedes</p>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-4 sm:pl-12">
              <p className="text-3xl font-black text-foreground sm:text-4xl">50K+</p>
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase sm:text-xs">Clientes</p>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-4 sm:pl-12">
              <p className="text-3xl font-black text-accent sm:text-4xl">20+</p>
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase sm:text-xs">Variedades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 sm:bottom-12">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground/50 uppercase">
            Descubre
          </span>
          <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/10 p-1.5 backdrop-blur-sm">
            <div className="h-2 w-1 animate-bounce rounded-full bg-primary shadow-[0_0_10px_rgba(245,197,24,1)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

