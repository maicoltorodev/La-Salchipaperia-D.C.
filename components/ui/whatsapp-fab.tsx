"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Loader2, MapPin, Search, CheckCircle2, Navigation, X } from "lucide-react"

import restaurantData from "@/data/restaurant-info.json"
const allLocations = restaurantData.locations

const NOTIFICATION_MESSAGES = [
    "¡Bienvenido a La Salchipapería D.C.! 🍟",
    "¿Hambre de algo premium? Pide tu salchipapa favorita ahora. ✨",
    "¡9 sedes listas para atenderte! Bogotá, Miami y pronto Medellín. 📍",
    "Acompaña tu pedido con nuestras salsas artesanales. 🍯",
    "¿Sabías que somos la mejor salchipapa del país? ¡Pruébala ya! 🏆"
]

const NOTIFICATION_SOUND = "https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3"

export function WhatsAppFAB() {
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState("")
    const [foundLocation, setFoundLocation] = useState<any>(null)
    const [isReady, setIsReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [geoError, setGeoError] = useState(false)

    // Notification states
    const [currentMessage, setCurrentMessage] = useState<string | null>(null)
    const [showMessage, setShowMessage] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

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

    const handleClick = () => {
        setIsLoading(true)
        setProgress(0)
        setStatus("Esperando permiso de ubicación...")
        setFoundLocation(null)
        setIsReady(false)
        setError(null)
        setGeoError(false)
        setShowMessage(false)

        if (!navigator.geolocation) {
            setGeoError(true)
            const centroLoc = allLocations.find((l: any) => l.name === "Centro") || allLocations[0]
            setFoundLocation(centroLoc)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: userLat, longitude: userLng } = position.coords
                let closest = allLocations[0]
                let minDistance = Infinity

                allLocations.forEach((loc: any) => {
                    if (loc.lat && loc.lng) {
                        const dist = calculateDistance(userLat, userLng, loc.lat, loc.lng)
                        if (dist < minDistance) {
                            minDistance = dist
                            closest = loc
                        }
                    }
                })
                setFoundLocation(closest)
            },
            () => {
                setGeoError(true)
                const centroLoc = allLocations.find((l: any) => l.name === "Centro") || allLocations[0]
                setFoundLocation(centroLoc)
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        )
    }

    const playNotificationSound = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(NOTIFICATION_SOUND)
        }
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
    }, [])

    const triggerNotification = useCallback((index: number) => {
        setCurrentMessage(NOTIFICATION_MESSAGES[index])
        setShowMessage(true)
        playNotificationSound()

        // Auto hide after 6 seconds
        setTimeout(() => {
            setShowMessage(false)
        }, 6000)
    }, [playNotificationSound])

    useEffect(() => {
        // First message after 3 seconds
        const firstTimer = setTimeout(() => {
            triggerNotification(0)
        }, 3000)

        // Following messages every 30 seconds
        const timers: NodeJS.Timeout[] = []
        for (let i = 1; i < NOTIFICATION_MESSAGES.length; i++) {
            const timer = setTimeout(() => {
                triggerNotification(i)
            }, 3000 + i * 30000)
            timers.push(timer)
        }

        return () => {
            clearTimeout(firstTimer)
            timers.forEach(clearTimeout)
        }
    }, [triggerNotification])

    useEffect(() => {
        if (!isLoading) return

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1

                if (next === 10) setStatus(geoError ? "Localización no permitida" : "Permiso concedido. Escaneando...")
                if (next === 30) setStatus("Cruzando datos con satélites D.C. ...")
                if (next === 60) setStatus(geoError ? "Buscando sede principal..." : "Calculando ruta más rápida...")
                if (next === 90) {
                    if (foundLocation) {
                        setStatus(geoError ? "Conectando con Sede Centro..." : `¡Sede ${foundLocation.name} detectada!`)
                    } else {
                        setStatus("Sincronizando con satélite...")
                    }
                }

                if (next >= 100) {
                    if (!foundLocation) return 99

                    clearInterval(timer)
                    setStatus(geoError ? "No se pudo encontrar tu sede más cercana, te comunicarás con Sede Centro." : `Sede ${foundLocation.name} lista.`)
                    setIsReady(true)
                    return 100
                }
                return next
            })
        }, 30)

        return () => clearInterval(timer)
    }, [isLoading, foundLocation, geoError])

    return (
        <>
            {/* Notification Tooltip */}
            <div
                className={`fixed bottom-24 right-8 z-[70] max-w-[280px] transition-all duration-500 transform ${showMessage ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    }`}
            >
                <div className="relative glass-card rounded-2xl border-white/20 p-4 shadow-2xl bg-black/80 backdrop-blur-md">
                    <button
                        onClick={() => setShowMessage(false)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#25D366]/20 flex items-center justify-center border border-[#25D366]/30">
                            <span className="text-xl">🍟</span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">La Salchipapería D.C.</p>
                            <p className="text-xs font-medium text-white leading-relaxed">
                                {currentMessage}
                            </p>
                        </div>
                    </div>
                    {/* Tail */}
                    <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-black/80 border-r border-b border-white/20" />
                </div>
            </div>

            <button
                onClick={handleClick}
                className="fixed bottom-8 right-8 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-500 hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] active:scale-90 glow-green"
                aria-label="Contactar por WhatsApp"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
            </button>

            {/* High-Tech Loading Modal */}
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

                    <div className="glass-card relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border-white/20 p-8 text-center shadow-[0_0_100px_rgba(37,211,102,0.2)]">
                        <button
                            onClick={() => setIsLoading(false)}
                            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Scanning Effect */}
                        <div className="absolute top-0 left-0 h-1 w-full animate-scan bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-50" />

                        <div className="relative mb-8 flex justify-center">
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white/5 border border-white/10">
                                {progress < 100 ? (
                                    <>
                                        <div className="absolute inset-0 animate-spin-slow rounded-3xl border-2 border-dashed border-[#25D366]/30" />
                                        <Search className="h-10 w-10 text-[#25D366] animate-pulse" />
                                    </>
                                ) : (
                                    <CheckCircle2 className="h-12 w-12 text-[#25D366] animate-in zoom-in-50 duration-300" />
                                )}
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-2 -right-2 h-4 w-4 bg-primary rounded-full animate-ping opacity-75" />
                        </div>

                        <div className="space-y-2 mb-8">
                            <h3 className="text-xl font-black uppercase tracking-widest text-foreground">
                                {progress < 100 ? "Localizando Sede" : (geoError ? "Sede Principal" : "Sede Encontrada")}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground h-5 flex items-center justify-center gap-2">
                                {status.includes("¡") || status.includes("Centro") ? <MapPin className="h-3 w-3 text-[#25D366]" /> : <Loader2 className="h-3 w-3 animate-spin" />}
                                {status}
                            </p>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="relative h-12 w-full glass-card rounded-2xl p-1 overflow-hidden border-white/5 bg-black/40">
                            <div
                                className="h-full bg-gradient-to-r from-[#25D366]/40 via-[#25D366] to-[#25D366]/40 transition-all duration-300 ease-out flex items-center justify-center"
                                style={{ width: `${progress}%` }}
                            >
                                <span className="text-[10px] font-black text-white drop-shadow-md">
                                    {progress}%
                                </span>
                            </div>
                        </div>

                        {/* Radar/Grid Background Pattern */}
                        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
                            <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#25D366_1px,_transparent_1px)] bg-[length:20px_20px]" />
                        </div>

                        {foundLocation && (
                            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex items-center justify-center gap-2">
                                    <Navigation className="h-4 w-4 text-primary fill-primary" />
                                    <span className="text-xs font-black uppercase tracking-tighter text-foreground">
                                        D.C. {foundLocation.name} Detectada
                                    </span>
                                </div>

                                {isReady && (
                                    <a
                                        href={foundLocation.whatsapp || `https://api.whatsapp.com/send?phone=${restaurantData.contact.mainPhone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            // Close modal after a short delay so user sees the click feedback
                                            setTimeout(() => setIsLoading(false), 500)
                                        }}
                                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] active:scale-95 glow-green"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Chatear ahora
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
