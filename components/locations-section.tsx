"use client"

import { useState } from "react"
import { MapPin, Clock, Phone, ChevronRight, Navigation, Plane, Rocket } from "lucide-react"

const bogotaLocations = [
  {
    id: 1,
    name: "Chapinero",
    address: "Chapinero, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 11:00 PM",
    phone: "+57 601 000 0001",
    tag: null,
  },
  {
    id: 2,
    name: "Modelia",
    address: "Modelia, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0002",
    tag: null,
  },
  {
    id: 3,
    name: "Montes",
    address: "Montes, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0003",
    tag: null,
  },
  {
    id: 4,
    name: "Suba",
    address: "Suba, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0004",
    tag: null,
  },
  {
    id: 5,
    name: "Bosa",
    address: "Bosa, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0005",
    tag: null,
  },
  {
    id: 6,
    name: "Kennedy",
    address: "Kennedy, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0006",
    tag: null,
  },
  {
    id: 7,
    name: "Alamos",
    address: "Alamos, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0007",
    tag: null,
  },
  {
    id: 8,
    name: "Villa del Prado",
    address: "Villa del Prado, Bogota D.C.",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0008",
    tag: null,
  },
  {
    id: 9,
    name: "Centro",
    address: "Centro Historico, Bogota D.C.",
    hours: "Lun - Dom: 10:00 AM - 10:00 PM",
    phone: "+57 601 000 0009",
    tag: null,
  },
]

const internationalLocations = [
  {
    id: 10,
    name: "Miami",
    address: "Miami, Florida, USA",
    hours: "Mon - Sun: 11:00 AM - 10:00 PM",
    phone: "+1 305 000 0000",
    tag: "international",
    flag: "US",
  },
]

const comingSoon = [
  {
    id: 11,
    name: "Medellin",
    tag: "proximamente",
  },
]

type Location = (typeof bogotaLocations)[number]

export function LocationsSection() {
  const allLocations = [...bogotaLocations, ...internationalLocations]
  const [activeLocation, setActiveLocation] = useState<Location>(allLocations[0])

  return (
    <section id="sedes" className="bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              Nuestras Sedes
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">
              {"De Bogota "}
              <span className="text-gradient">{"al Mundo"}</span>
            </span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {"9 sedes en Bogota, presencia internacional en Miami y proximamente en Medellin. La experiencia Salchipaperia D.C. crece contigo."}
          </p>
        </div>

        {/* Locations grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Location list */}
          <div className="flex flex-col gap-2">
            {/* Bogota heading */}
            <div className="mb-1 flex items-center gap-2 px-2 pt-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                Bogota D.C.
              </span>
            </div>

            {bogotaLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location)}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                  activeLocation.id === location.id
                    ? "bg-primary text-primary-foreground glow-yellow"
                    : "bg-card text-foreground hover:bg-card/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`h-4 w-4 shrink-0 ${
                      activeLocation.id === location.id
                        ? "text-primary-foreground"
                        : "text-primary"
                    }`}
                  />
                  <span className="text-sm font-bold">{location.name}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    activeLocation.id === location.id
                      ? "text-primary-foreground translate-x-0"
                      : "text-muted-foreground -translate-x-1 group-hover:translate-x-0"
                  }`}
                />
              </button>
            ))}

            {/* International heading */}
            <div className="mb-1 mt-4 flex items-center gap-2 px-2">
              <Plane className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold tracking-widest text-accent uppercase">
                Internacional
              </span>
            </div>

            {internationalLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(location as Location)}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                  activeLocation.id === location.id
                    ? "bg-accent text-accent-foreground glow-pink"
                    : "bg-card text-foreground hover:bg-card/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{"🇺🇸"}</span>
                  <span className="text-sm font-bold">{location.name}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    activeLocation.id === location.id
                      ? "text-accent-foreground translate-x-0"
                      : "text-muted-foreground -translate-x-1 group-hover:translate-x-0"
                  }`}
                />
              </button>
            ))}

            {/* Coming soon */}
            <div className="mb-1 mt-4 flex items-center gap-2 px-2">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                Proximamente
              </span>
            </div>

            {comingSoon.map((city) => (
              <div
                key={city.id}
                className="flex items-center justify-between rounded-xl border border-dashed border-primary/30 px-4 py-3 opacity-70"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-primary/50" />
                  <span className="text-sm font-bold text-muted-foreground">{city.name}</span>
                </div>
                <span className="animate-shimmer rounded-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 px-3 py-1 text-[10px] font-bold text-primary uppercase">
                  Pronto
                </span>
              </div>
            ))}
          </div>

          {/* Location detail */}
          <div className="sparkle-border rounded-2xl bg-card p-8 lg:p-10">
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-3xl font-bold text-foreground">
                  {activeLocation.name}
                </h3>
                {(activeLocation as typeof internationalLocations[number]).flag && (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                    {"🇺🇸 USA"}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{activeLocation.address}</p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Horario</p>
                  <p className="text-sm text-muted-foreground">{activeLocation.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Telefono</p>
                  <p className="text-sm text-muted-foreground">{activeLocation.phone}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Navigation className="h-8 w-8 text-primary" />
                <p className="text-sm font-medium text-muted-foreground">
                  {"Sede " + activeLocation.name}
                </p>
              </div>
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid h-full w-full grid-cols-8 grid-rows-6">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-border/50" />
                  ))}
                </div>
              </div>
              {/* Pin marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="h-4 w-4 rounded-full bg-primary glow-yellow" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
                </div>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent("Salchipaperia D.C. " + activeLocation.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.02] glow-yellow"
            >
              <Navigation className="h-4 w-4" />
              Como Llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
