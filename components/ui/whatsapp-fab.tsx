import { useState, useEffect } from "react"
import { Loader2, MapPin, Search, CheckCircle2, Navigation } from "lucide-react"

const bogotaLocations = [
    { id: 1, name: "Chapinero", whatsapp: "573005946797" },
    { id: 2, name: "Cedritos", whatsapp: "573132646467" },
    { id: 3, name: "Colina Campestre", whatsapp: "573138812581" },
    { id: 4, name: "Calle 80", whatsapp: "573105553177" },
    { id: 5, name: "Kennedy", whatsapp: "573133182103" },
]

export function WhatsAppFAB() {
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [status, setStatus] = useState("")
    const [foundLocation, setFoundLocation] = useState<any>(null)

    const handleClick = () => {
        setIsLoading(true)
        setProgress(0)
        setStatus("Iniciando escaneo satelital...")
        setFoundLocation(null)
    }

    useEffect(() => {
        if (!isLoading) return

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1

                if (next === 20) setStatus("Detectando coordenadas GPS...")
                if (next === 45) setStatus("Cruzando datos con sedes D.C. ...")
                if (next === 75) setStatus("Calculando ruta más rápida...")
                if (next === 90) {
                    const randomLoc = bogotaLocations[Math.floor(Math.random() * bogotaLocations.length)]
                    setFoundLocation(randomLoc)
                    setStatus(`¡Sede ${randomLoc.name} detectada!`)
                }

                if (next >= 100) {
                    clearInterval(timer)
                    setTimeout(() => {
                        const win = window.open(`https://wa.me/${foundLocation?.whatsapp || "573005946797"}`, "_blank")
                        if (win) win.focus()
                        setIsLoading(false)
                    }, 1000)
                    return 100
                }
                return next
            })
        }, 30)

        return () => clearInterval(timer)
    }, [isLoading, foundLocation])

    return (
        <>
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
                                {progress < 100 ? "Localizando Sede" : "Sede Encontrada"}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground h-5 flex items-center justify-center gap-2">
                                {status.includes("¡") ? <MapPin className="h-3 w-3 text-[#25D366]" /> : <Loader2 className="h-3 w-3 animate-spin" />}
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
                            <div className="mt-6 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
                                <Navigation className="h-4 w-4 text-primary fill-primary" />
                                <span className="text-xs font-black uppercase tracking-tighter text-foreground">
                                    Conectando con D.C. {foundLocation.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
