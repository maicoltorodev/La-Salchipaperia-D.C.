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
  const [nearestLocation, setNearestLocation] = useState<any>(null)
  const [isLocating, setIsLocating] = useState(false)

  // Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    // Find nearest location on mount
    if (navigator.geolocation) {
      setIsLocating(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: userLat, longitude: userLng } = position.coords
          let closest = restaurantData.locations[0]
          let minDistance = Infinity

          restaurantData.locations.forEach((loc: any) => {
            if (loc.lat && loc.lng) {
              const dist = calculateDistance(userLat, userLng, loc.lat, loc.lng)
              if (dist < minDistance) {
                minDistance = dist
                closest = loc
              }
            }
          })
          setNearestLocation(closest)
          setIsLocating(false)
        },
        () => {
          setIsLocating(false)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 py-2 shadow-2xl"
        : "bg-transparent py-4"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* --- DESKTOP LAYOUT (md+) --- */}
        <div className="hidden w-full items-center justify-between md:flex md:h-20 md:gap-6 lg:h-24 lg:gap-10">
          {/* Left: Brand */}
          <div className="flex flex-1 items-center justify-start">
            <a href="#inicio" className="group flex items-center gap-4 transition-all hover:scale-105">
              <div className="relative h-10 w-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Image src="/logo-navbar.webp" alt="Logo" fill className="object-contain drop-shadow-2xl" />
              </div>
              <span
                className="text-xl leading-none text-primary uppercase transition-all duration-300 group-hover:text-white lg:text-2xl"
                style={{
                  fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                  transform: 'scaleX(1.1) scaleY(1.2)',
                  display: 'inline-block',
                  letterSpacing: '0.04em',
                }}
              >
                La Salchipaperia D.C.
              </span>
            </a>
          </div>

          {/* Center: Navigation - Pill Design */}
          <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-2xl backdrop-blur-3xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group/item relative flex items-center px-5 py-2 transition-all"
              >
                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-primary">
                  {link.label}
                </span>
                <div className="absolute inset-0 scale-75 rounded-full bg-white/5 opacity-0 transition-all duration-300 group-hover/item:scale-100 group-hover/item:opacity-100" />
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex flex-1 items-center justify-end gap-6">
            <a
              href="#sedes"
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 transition-all hover:text-primary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                <MapPin className="h-4 w-4 transition-colors group-hover:text-black" />
              </div>
              <span className="hidden lg:inline">Sedes</span>
            </a>

            <a
              href={nearestLocation ? `tel:${nearestLocation.phone.replace(/\s+/g, '')}` : `https://wa.me/${restaurantData.contact.mainPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-yellow group relative flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-3.5 shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Phone className="h-4 w-4 text-black transition-transform group-hover:rotate-12" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black">
                {isLocating ? "..." : "Pedir Ya"}
              </span>
            </a>
          </div>
        </div>

        {/* --- MOBILE LAYOUT (<md) --- */}
        <div className="flex h-16 w-full items-center justify-between md:hidden">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <a href="#inicio" className="group relative h-9 w-9 transition-all active:scale-95">
              <Image src="/logo-navbar.webp" alt="Logo" fill className="object-contain" />
            </a>
          </div>

          {/* Center: Brand Text */}
          <div className="flex justify-center flex-1">
            <a href="#inicio" className="active:scale-95 text-center">
              <span
                className="whitespace-nowrap text-2xl leading-none text-primary uppercase block"
                style={{
                  fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                  transform: 'scaleX(1.1) scaleY(1.2)',
                  letterSpacing: '0.08em',
                  textShadow: '0.2px 0 0.1px currentColor'
                }}
              >
                {"La Salchipaperia D.C."}
              </span>
            </a>
          </div>

          {/* Right: Hamburger */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group flex h-10 w-10 items-center justify-end active:scale-95"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-primary" />
              ) : (
                <Menu className="h-7 w-7 text-primary" />
              )}
            </button>
          </div>
        </div>
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
              href={nearestLocation ? `tel:${nearestLocation.phone.replace(/\s+/g, '')}` : `https://wa.me/${restaurantData.contact.mainPhone}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary p-6 text-sm font-black uppercase tracking-[0.2em] text-primary-foreground shadow-2xl glow-yellow active:scale-95 transition-all"
            >
              <Phone className={`h-5 w-5 ${isLocating ? 'animate-pulse' : ''}`} />
              {isLocating ? "Buscando tu sede..." : nearestLocation ? `Llamar a ${nearestLocation.name}` : "Ordenar Ahora"}
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
