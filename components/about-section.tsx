"use client"

import Image from "next/image"
import { Award, Leaf, ChefHat, Heart } from "lucide-react"

const features = [
  {
    icon: ChefHat,
    title: "Receta Unica",
    description: "Nuestra receta secreta ha sido perfeccionada durante anos para lograr el sabor perfecto.",
  },
  {
    icon: Leaf,
    title: "Ingredientes Frescos",
    description: "Seleccionamos diariamente los mejores ingredientes de proveedores locales certificados.",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Cada plato pasa por estrictos controles de calidad antes de llegar a tu mesa.",
  },
  {
    icon: Heart,
    title: "Hecho con Pasion",
    description: "Nuestro equipo prepara cada orden con la dedicacion que te mereces.",
  },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Subtle accent glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Image collage */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/restaurant-interior.webp"
                alt="Interior del restaurante Salchipaperia D.C."
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -right-4 -bottom-6 rounded-2xl bg-card p-6 glow-yellow md:-right-8">
              <p className="text-4xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground">Sedes en</p>
              <p className="text-sm font-semibold text-foreground">todo el pais</p>
            </div>

            {/* Small accent card */}
            <div className="absolute -top-4 -left-4 rounded-2xl bg-accent px-4 py-3 glow-pink md:-left-8">
              <p className="text-2xl font-bold text-accent-foreground">5</p>
              <p className="text-xs text-accent-foreground/80">{"Anos de\nexperiencia"}</p>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="mb-4 inline-block text-sm font-semibold tracking-widest text-primary uppercase">
              Nuestra Historia
            </span>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              <span className="text-balance">
                {"De la calle a la "}
                <span className="text-gradient">experiencia premium</span>
              </span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {"Nacimos con la mision de transformar la salchipapa tradicional en una experiencia gastronomica de primer nivel. Con ingredientes cuidadosamente seleccionados y tecnicas innovadoras, hemos creado un concepto unico que ya conquista mas de 10 sedes."}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 rounded-xl bg-secondary/50 p-4 transition-all duration-300 hover:bg-secondary"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
