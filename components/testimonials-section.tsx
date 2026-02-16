"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Maria Gonzalez",
    location: "Miraflores",
    text: "Las mejores salchipapas que he probado en mi vida. La Premium Gold es adictiva, el queso fundido con la salsa trufa es otra cosa.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    location: "San Isidro",
    text: "El ambiente es increible y la atencion de primera. Vengo con mi familia todos los fines de semana. La Mexicana es nuestro favorito.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Torres",
    location: "Barranco",
    text: "No puedo creer que unas salchipapas puedan ser tan gourmet. La BBQ Master me volo la cabeza. 100% recomendado.",
    rating: 5,
  },
  {
    id: 4,
    name: "Diego Vargas",
    location: "Surco",
    text: "El concepto es genial. Street food premium con precios accesibles. Las salsas artesanales marcan la diferencia total.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-sm font-semibold tracking-widest text-primary uppercase">
            Testimonios
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">
              {"Lo que Dicen "}
              <span className="text-gradient">Nuestros Fans</span>
            </span>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative flex flex-col rounded-2xl bg-card p-6 transition-all duration-500 hover:scale-[1.02] sparkle-border"
            >
              <Quote className="mb-4 h-8 w-8 text-primary/30" />
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {`"${t.text}"`}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{"Sede " + t.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
