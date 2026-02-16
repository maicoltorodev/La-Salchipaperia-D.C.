"use client"

import { useState } from "react"
import { MapPin, Clock, Phone, ChevronRight, Navigation, Plane, Rocket, Crosshair, AlertCircle } from "lucide-react"

const bogotaLocations = [
  {
    id: 1,
    name: "Chapinero",
    address: "Cl. 67 #8-29, Bogotá, Colombia",
    hours: "Lun - Dom: 11:00 AM - 11:00 PM",
    phone: "+57 601 000 0001",
    tag: null,
    lat: 4.6486,
    lng: -74.0620
  },
  {
    id: 2,
    name: "Modelia",
    address: "Av. La Esperanza #75-10, Fontibón, Bogotá, Colombia",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0002",
    tag: null,
    lat: 4.6644,
    lng: -74.1162
  },
  {
    id: 3,
    name: "Montes",
    address: "Cl. 8 Sur #32-35, Bogotá, Colombia",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0003",
    tag: null,
    lat: 4.6033,
    lng: -74.1077
  },
  {
    id: 4,
    name: "Suba",
    address: "Cl. 139 # 92A-3, Suba, Bogotá, D.C",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0004",
    tag: null,
    lat: 4.7351,
    lng: -74.0952
  },
  {
    id: 5,
    name: "Bosa",
    address: "Cl. 68 Sur #78 j - 74, Bogotá",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0005",
    tag: null,
    lat: 4.6136,
    lng: -74.1947
  },
  {
    id: 6,
    name: "Kennedy",
    address: "Cra. 78B #38C, Kennedy, Bogotá, Colombia",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0006",
    tag: null,
    lat: 4.6346,
    lng: -74.1565
  },
  {
    id: 7,
    name: "Diver Plaza",
    address: "Dg. 72 #98-36, Bogotá, Colombia",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0007",
    tag: null,
    lat: 4.7066,
    lng: -74.1227
  },
  {
    id: 8,
    name: "Villa del Prado",
    address: "Cl. 174a #54C - 06, Bogotá",
    hours: "Lun - Dom: 11:00 AM - 10:00 PM",
    phone: "+57 601 000 0008",
    tag: null,
    lat: 4.7548,
    lng: -74.0535
  },
  {
    id: 9,
    name: "Centro",
    address: "Cra. 7 #19-03, Bogotá, Colombia",
    hours: "Lun - Dom: 10:00 AM - 10:00 PM",
    phone: "+57 601 000 0009",
    tag: null,
    lat: 4.6038,
    lng: -74.0722
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
    lat: 25.7617,
    lng: -80.1918
  },
]

const comingSoon = [
  {
    id: 11,
    name: "Medellin",
    tag: "proximamente",
  },
]


interface Location {
  id: number
  name: string
  address: string
  hours: string
  phone: string
  tag: string | null
  flag?: string
  lat: number
  lng: number
}

// 10km coverage radius
const MAX_DISTANCE_KM = 10;

export function LocationsSection() {
  const allLocations = [...bogotaLocations, ...internationalLocations]
  const [activeLocation, setActiveLocation] = useState<Location>(allLocations[0])
  const [isSearching, setIsSearching] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [nearestInfo, setNearestInfo] = useState<{ id: number; distance: number } | null>(null)

  const findNearestLocation = () => {
    setIsSearching(true)
    setLocationError(null)
    setNearestInfo(null)

    if (!navigator.geolocation) {
      setLocationError("Tu navegador no soporta geolocalización.")
      setIsSearching(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: userLat, longitude: userLng } = position.coords

        // Find nearest location logic
        let closestLocation: Location | null = null
        let minDistance = Infinity

        allLocations.forEach((location) => {
          const distance = calculateDistance(userLat, userLng, location.lat, location.lng)
          if (distance < minDistance) {
            minDistance = distance
            closestLocation = location
          }
        })

        if (closestLocation && minDistance <= MAX_DISTANCE_KM) {
          setActiveLocation(closestLocation)
          setNearestInfo({
            id: closestLocation.id,
            distance: parseFloat(minDistance.toFixed(1)),
          })
        } else {
          // Nearest is out of range
          if (closestLocation) {
            setLocationError(
              `Lo sentimos, no cubrimos tu zona actual. La sede más cercana está a ${minDistance.toFixed(1)} km.`
            )
            setActiveLocation(closestLocation)
          } else {
            setLocationError("No se encontraron sedes cercanas.")
          }
        }
        setIsSearching(false)
      },
      (error) => {
        console.error("Error geoposition:", error.code, error.message)
        let errorMsg = "No pudimos obtener tu ubicación."

        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMsg =
              "Permiso denegado. Por favor habilita la ubicación en tu navegador."
            break
          case 2: // POSITION_UNAVAILABLE
            errorMsg = "Tu ubicación no está disponible en este momento."
            break
          case 3: // TIMEOUT
            errorMsg = "Se agotó el tiempo de espera. Inténtalo de nuevo."
            break
        }

        setLocationError(errorMsg)
        setIsSearching(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  // Haversine formula to calculate distance in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

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
          <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
            {"10+ sedes en Bogota, presencia internacional en Miami y proximamente en Medellin. La experiencia Salchipaperia D.C. crece contigo."}
          </p>

          <button
            onClick={findNearestLocation}
            disabled={isSearching}
            className="flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Buscando cercana...
              </>
            ) : (
              <>
                <Crosshair className="h-4 w-4" />
                Encontrar mi Sede mas Cercana
              </>
            )}
          </button>

          {locationError && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4" />
              {locationError}
            </div>
          )}

          {nearestInfo && !locationError && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-500/10 px-4 py-2 text-sm text-green-600 dark:text-green-400 animate-in fade-in slide-in-from-top-2">
              <MapPin className="h-4 w-4" />
              ¡Encontramos una sede a solo {nearestInfo.distance} km de ti!
            </div>
          )}

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
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-300 ${activeLocation.id === location.id
                  ? "bg-primary text-primary-foreground glow-yellow"
                  : "bg-card text-foreground hover:bg-card/80"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`h-4 w-4 shrink-0 ${activeLocation.id === location.id
                      ? "text-primary-foreground"
                      : "text-primary"
                      }`}
                  />
                  <span className="text-sm font-bold">{location.name}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform ${activeLocation.id === location.id
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
                onClick={() => setActiveLocation(location)}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-300 ${activeLocation.id === location.id
                  ? "bg-accent text-accent-foreground glow-pink"
                  : "bg-card text-foreground hover:bg-card/80"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{"🇺🇸"}</span>
                  <span className="text-sm font-bold">{location.name}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform ${activeLocation.id === location.id
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
                {activeLocation.flag && (
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

            {/* Map Real */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary shadow-lg ring-1 ring-border/50">
              <iframe
                key={activeLocation.id} // Force reload on change
                title={`Mapa ${activeLocation.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  activeLocation.address
                )}&t=m&z=15&ie=UTF8&iwloc=&output=embed`}
                className="h-full w-full opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
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
