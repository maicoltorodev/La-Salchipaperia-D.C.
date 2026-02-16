"use client"

import Image from "next/image"
import { ArrowDown, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-salchipapas.jpg"
          alt="Salchipapas gourmet premium"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/60" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
      <div className="absolute top-1/3 right-20 h-3 w-3 animate-pulse-glow rounded-full bg-accent" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-1/3 left-1/4 h-2 w-2 animate-pulse-glow rounded-full bg-primary" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
        <div className="flex flex-col items-start gap-8">
          {/* Badge */}
          <div className="sparkle-border flex items-center gap-2 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {"Bogota D.C. + Miami"}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-balance">
              {"La Salchipapa"}
              <br />
              <span className="text-gradient">{"que Mereces"}</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {"Street food elevado a su maxima expresion. Ingredientes premium, salsas artesanales y una experiencia que no olvidaras."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#menu"
              className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all duration-300 hover:scale-105 glow-yellow"
            >
              Ver Menu
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#sedes"
              className="sparkle-border flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-foreground transition-all duration-300 hover:scale-105"
            >
              Encuentra tu Sede
            </a>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-8 md:gap-12">
            <div>
              <p className="text-3xl font-bold text-primary md:text-4xl">10</p>
              <p className="text-sm text-muted-foreground">Sedes</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-foreground md:text-4xl">50K+</p>
              <p className="text-sm text-muted-foreground">Clientes Felices</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-accent md:text-4xl">20+</p>
              <p className="text-sm text-muted-foreground">Variedades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            Descubre
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1.5">
            <div className="h-2 w-1 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
