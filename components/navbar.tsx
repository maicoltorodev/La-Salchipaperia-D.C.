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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* --- DESKTOP LAYOUT (md+) --- */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#inicio" className="group flex items-center gap-4 transition-transform hover:scale-105 active:scale-95">
            <div className="relative h-10 w-10">
              <Image src="/logo-navbar.webp" alt="Logo" fill className="object-contain" />
            </div>
            <span
              className="text-2xl leading-none text-primary uppercase lg:text-3xl"
              style={{
                fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                transform: 'scaleX(1.1) scaleY(1.2)',
                display: 'inline-block',
                letterSpacing: '0.04em',
                textShadow: '0.2px 0 0.1px currentColor'
              }}
            >
              {"La Salchipaperia D.C."}
            </span>
          </a>
          <nav className="ml-8 flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] font-black tracking-widest text-muted-foreground uppercase transition-all hover:text-primary hover:scale-110"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* --- MOBILE LAYOUT (<md) --- */}
        <div className="grid w-full grid-cols-3 items-center md:hidden">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <a href="#inicio" className="group relative h-8 w-8 -translate-y-1 transition-all active:scale-95">
              <Image src="/logo-navbar.webp" alt="Logo" fill className="object-contain" />
            </a>
          </div>

          {/* Center: Brand Text */}
          <div className="flex justify-center">
            <a href="#inicio" className="active:scale-95">
              <span
                className="whitespace-nowrap text-2xl leading-none text-primary uppercase"
                style={{
                  fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                  transform: 'scaleX(1.1) scaleY(1.2)',
                  display: 'inline-block',
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
              className="group flex h-10 w-10 -translate-y-1 items-center justify-end active:scale-95"
            >
              <Menu className="h-7 w-7 text-primary" />
            </button>
          </div>
        </div>

        {/* --- DESKTOP ACTIONS (Right side) --- */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#sedes"
            className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span>Sedes</span>
          </a>
          <a
            href={nearestLocation ? `tel:${nearestLocation.phone.replace(/\s+/g, '')}` : `https://wa.me/${restaurantData.contact.mainPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary-foreground transition-all hover:scale-105 active:scale-95 glow-yellow"
          >
            <Phone className="h-3.5 w-3.5" />
            {isLocating ? "..." : "Pedir Ya"}
          </a>
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
