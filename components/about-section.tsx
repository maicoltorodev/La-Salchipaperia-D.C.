"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Award, Leaf, ChefHat, Heart, Star } from "lucide-react"

const features = [
  {
    icon: ChefHat,
    title: "Receta Única",
    description: "Nuestra receta secreta ha sido perfeccionada durante años para lograr el sabor perfecto.",
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
    title: "Hecho con Pasión",
    description: "Nuestro equipo prepara cada orden con la dedicación que te mereces.",
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )

    const reveals = sectionRef.current?.querySelectorAll(".scroll-reveal")
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="nosotros" ref={sectionRef} className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Image collage with premium effects */}
          <div className="scroll-reveal relative transition-all duration-1000">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
              <Image
                src="/images/restaurant-interior.webp"
                alt="Interior del restaurante La Salchipaperia D.C."
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>

            {/* Floating premium stat card */}
            <div className="glass-card animate-float absolute -right-4 -bottom-6 rounded-[2rem] p-6 glow-yellow md:-right-8">
              <p className="text-5xl font-black tracking-tighter text-primary">10+</p>
              <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                Sedes en Colombia
              </p>
            </div>

            {/* Small floating badge */}
            <div className="glass-card animate-float absolute -top-6 -left-4 rounded-2xl p-4 glow-pink md:-left-8" style={{ animationDelay: "1.5s" }}>
              <Star className="mb-1 h-5 w-5 fill-accent text-accent" />
              <p className="text-2xl font-black text-foreground">5</p>
              <p className="whitespace-pre-line text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                {"Años de\nExperiencia"}
              </p>
            </div>
          </div>

          {/* Right: Content with mobile optimizations */}
          <div className="flex flex-col gap-8">
            <div className="scroll-reveal transition-all duration-1000" style={{ transitionDelay: "200ms" }}>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-8 bg-primary" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
                  Nuestra Trayectoria
                </span>
              </div>
              <h2 className="mb-6 text-4xl font-black leading-[1] tracking-tighter text-foreground sm:text-6xl">
                De la Calle a la<br />
                <span className="text-gradient drop-shadow-[0_0_20px_rgba(233,30,140,0.2)]">Revolución Premium</span>
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                {"Nacimos con la misión de transformar el plato callejero más icónico en una experiencia gastronómica de alta gama. Hoy, con más de 10 sedes, seguimos redefiniendo lo que significa comer una salchipapa."}
              </p>
            </div>

            {/* Feature grid - 2 columns on tablet+ */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="scroll-reveal glass-card group flex gap-4 rounded-[1.5rem] p-5 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-black text-foreground">{feature.title}</h3>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
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

