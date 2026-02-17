"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Valentina Gómez",
    location: "Chapinero",
    text: "Las mejores que he probado en mi vida. La Papipollo es adictiva, los ingredientes son súper frescos y el ambiente es de otro nivel.",
    rating: 5,
  },
  {
    id: 2,
    name: "Andrés Rodríguez",
    location: "Modelia",
    text: "El servicio es increíble y la atención de primera. Vengo con mi familia todos los fines de semana. La Papicostilla es nuestra favorita.",
    rating: 5,
  },
  {
    id: 3,
    name: "Carolina Castro",
    location: "Montes",
    text: "No puedo creer que unas salchipapas puedan ser tan gourmet. La Papitodo me voló la cabeza. 100% recomendado.",
    rating: 5,
  },
  {
    id: 4,
    name: "Mateo Vargas",
    location: "Suba",
    text: "El concepto es genial. Street food premium con mucha calidad. Las salsas artesanales, especialmente la de ajo D.C., marcan la diferencia.",
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
