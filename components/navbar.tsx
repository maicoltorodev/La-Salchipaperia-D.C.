"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, MapPin, Phone } from "lucide-react"
import restaurantData from "@/data/restaurant-info.json"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menu", href: "#menu" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Sedes", href: "#sedes" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 py-2 shadow-2xl"
        : "bg-transparent py-4"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#inicio" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
          <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/20">
            <Image
              src="/images/logo.jpg"
              alt="La Salchipaperia D.C. Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black leading-none tracking-tighter text-foreground sm:text-xl">
              {"La Salchipaperia"}
            </span>
            <span className="text-xs font-bold leading-none tracking-widest text-primary uppercase">
              D.C.
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-black tracking-widest text-muted-foreground uppercase transition-all duration-300 hover:text-primary hover:scale-110"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#sedes"
            className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span>{restaurantData.locations.length}+ Sedes</span>
          </a>
          <a
            href={`https://wa.me/${restaurantData.contact.mainPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95 glow-yellow"
          >
            <Phone className="h-4 w-4" />
            Pedir Ya
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 md:hidden"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu - Fullscreen style or slide down */}
      <div
        className={`fixed inset-x-0 top-[72px] h-[calc(100vh-72px)] overflow-hidden transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none translate-y-[-10px]"
          }`}
      >
        <div className="h-full bg-background/95 p-6 backdrop-blur-3xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`flex items-center justify-between rounded-2xl bg-white/5 p-5 text-xl font-black tracking-tight text-foreground transition-all active:scale-95 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  } duration-500`}
              >
                {link.label}
                <div className="h-2 w-2 rounded-full bg-primary" />
              </a>
            ))}

            <a
              href={`https://wa.me/${restaurantData.contact.mainPhone}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary p-6 text-sm font-black uppercase tracking-[0.2em] text-primary-foreground shadow-2xl glow-yellow active:scale-95 transition-all"
            >
              <Phone className="h-5 w-5" />
              Ordenar Ahora
            </a>

            <div className="mt-8 flex justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-foreground">{restaurantData.locations.length}</span>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase text-center">Sedes</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-foreground">5★</span>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase text-center">Rating</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
