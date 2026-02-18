"use client"

import { Utensils, Truck, CreditCard, Clock } from "lucide-react"

const steps = [
  {
    icon: Utensils,
    step: "01",
    title: "Elige tu Favorita",
    description: "Explora nuestro menu con mas de 20 variedades unicas de salchipapas gourmet.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Haz tu Pedido",
    description: "Ordena en sede, por telefono o a traves de nuestras plataformas de delivery.",
  },
  {
    icon: Clock,
    step: "03",
    title: "Preparacion Express",
    description: "Tu orden se prepara al momento con ingredientes frescos en menos de 10 minutos.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Disfruta",
    description: "Recibe o recoge tu salchipapa perfecta y vive la experiencia premium.",
  },
]

export function ExperienceSection() {
  return (
    <section className="bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 text-sm font-semibold tracking-widest text-primary uppercase">
            Como Funciona
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">
              {"La Experiencia de "}
              <span className="text-gradient">{"La Salchipaperia D.C."}</span>
            </span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {"En solo 4 pasos disfrutas de la mejor salchipapa premium del pais."}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative flex flex-col items-center rounded-2xl bg-card p-8 text-center transition-all duration-500 hover:scale-[1.02] sparkle-border"
            >
              {/* Step number */}
              <span className="mb-4 text-5xl font-bold text-primary/20">{step.step}</span>

              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:glow-yellow">
                <step.icon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Connector line (hidden on last) */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
