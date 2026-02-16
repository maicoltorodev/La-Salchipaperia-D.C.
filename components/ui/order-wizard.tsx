"use client"

import React, { useState } from "react"
import { useCart } from "@/context/cart-context"
import {
    X,
    ShoppingBag,
    ChevronRight,
    MapPin,
    User,
    CreditCard,
    Truck,
    Store,
    Plus,
    Minus,
    Trash2,
    Phone
} from "lucide-react"

// Import existing locations to find WA numbers
const bogotaLocations = [
    { id: 1, name: "Chapinero", whatsapp: "https://wa.me/573005946797" },
    { id: 2, name: "Cedritos", whatsapp: "https://wa.me/573132646467" },
    { id: 3, name: "Colina Campestre", whatsapp: "https://wa.me/573138812581" },
    { id: 4, name: "Chia", whatsapp: "https://wa.me/573138812581" },
    { id: 5, name: "Calle 80", whatsapp: "https://wa.me/573105553177" },
    { id: 6, name: "Salas - Fontibon", whatsapp: "https://wa.me/573133182103" },
    { id: 7, name: "Kennedy", whatsapp: "https://wa.me/573133182103" },
    { id: 8, name: "Modelia", whatsapp: "https://wa.me/573133182103" },
    { id: 9, name: "Cajica", whatsapp: "https://wa.me/573138812581" },
]

export function OrderWizard() {
    const {
        items,
        isCartOpen,
        setIsCartOpen,
        totalPrice,
        updateQuantity,
        removeItem,
        orderDetails,
        updateOrderDetails
    } = useCart()

    const [step, setStep] = useState(1)

    if (!isCartOpen) return null

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(val)
    }

    const handleNext = () => setStep(s => s + 1)
    const handleBack = () => setStep(s => s - 1)

    const generateWhatsAppMessage = () => {
        let message = `*¡NUEVO PEDIDO D.C.!* 🔥\n\n`
        message += `👤 *Cliente:* ${orderDetails.customerName}\n`
        message += `📞 *Teléfono:* ${orderDetails.phone}\n`
        message += `📍 *Tipo:* ${orderDetails.orderType === 'delivery' ? 'Domicilio' : 'Recoger en Sede'}\n`
        if (orderDetails.orderType === 'delivery') {
            message += `🏠 *Dirección:* ${orderDetails.address}\n`
        } else {
            message += `🏢 *Sede:* ${orderDetails.locationName}\n`
        }
        message += `💳 *Pago:* ${orderDetails.paymentMethod}\n\n`
        message += `🛒 *DETALLE DEL PEDIDO:*\n`

        items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (${item.price} c/u)\n`
        })

        message += `\n💰 *TOTAL:* ${formatCurrency(totalPrice)}\n`
        if (orderDetails.notes) {
            message += `\n📝 *Notas:* ${orderDetails.notes}`
        }

        const encoded = encodeURIComponent(message)
        const store = bogotaLocations.find(l => l.id === orderDetails.locationId) || bogotaLocations[0]
        return `${store.whatsapp}?text=${encoded}`
    }

    return (
        <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative h-full w-full max-w-md bg-background shadow-2xl transition-all duration-500 animate-in slide-in-from-right">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 p-6 bg-card/50">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <ShoppingBag className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-black text-foreground">Tu Pedido</h2>
                        </div>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="rounded-full p-2 hover:bg-white/5"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Stepper Content */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">

                        {/* Step 1: Review Items */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-black text-foreground">1. Revisa tus productos</h3>
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/20" />
                                        <p className="text-muted-foreground">Tu carrito está vacío</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="glass-card flex items-center gap-4 rounded-2xl p-4">
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-foreground">{item.name}</h4>
                                                    <p className="text-sm text-primary font-black">{item.price}</p>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="text-muted-foreground hover:text-primary"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="text-muted-foreground hover:text-primary"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Location & Delivery Type */}
                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-lg font-black text-foreground">2. Sede y Entrega</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => updateOrderDetails({ orderType: 'delivery' })}
                                        className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all ${orderDetails.orderType === 'delivery'
                                                ? 'border-primary bg-primary/10'
                                                : 'border-white/5 bg-white/3'
                                            }`}
                                    >
                                        <Truck className={`h-8 w-8 ${orderDetails.orderType === 'delivery' ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <span className="text-xs font-black uppercase tracking-widest">A domicilio</span>
                                    </button>
                                    <button
                                        onClick={() => updateOrderDetails({ orderType: 'pickup' })}
                                        className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all ${orderDetails.orderType === 'pickup'
                                                ? 'border-primary bg-primary/10'
                                                : 'border-white/5 bg-white/3'
                                            }`}
                                    >
                                        <Store className={`h-8 w-8 ${orderDetails.orderType === 'pickup' ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <span className="text-xs font-black uppercase tracking-widest">Para recoger</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Selecciona la sede más cercana</label>
                                    <div className="grid gap-2">
                                        {bogotaLocations.map(loc => (
                                            <button
                                                key={loc.id}
                                                onClick={() => updateOrderDetails({ locationId: loc.id, locationName: loc.name })}
                                                className={`flex items-center justify-between rounded-xl p-4 text-left transition-all ${orderDetails.locationId === loc.id
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-white/5 text-foreground hover:bg-white/10'
                                                    }`}
                                            >
                                                <span className="text-sm font-bold">{loc.name}</span>
                                                {orderDetails.locationId === loc.id && <ChevronRight className="h-4 w-4" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Customer Info */}
                        {step === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex flex-col gap-6">
                                    <h3 className="text-lg font-black text-foreground text-center">3. Tus Datos</h3>

                                    <div className="space-y-4">
                                        <div className="group space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                                <User className="h-3 w-3" /> Nombre Completo
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Ej: Maicol Toro"
                                                value={orderDetails.customerName}
                                                onChange={(e) => updateOrderDetails({ customerName: e.target.value })}
                                                className="w-full rounded-2xl bg-white/5 p-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-white/5"
                                            />
                                        </div>

                                        <div className="group space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                                <Phone className="h-3 w-3" /> Teléfono WhatsApp
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="Ej: 3101234567"
                                                value={orderDetails.phone}
                                                onChange={(e) => updateOrderDetails({ phone: e.target.value })}
                                                className="w-full rounded-2xl bg-white/5 p-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-white/5"
                                            />
                                        </div>

                                        {orderDetails.orderType === 'delivery' && (
                                            <div className="group space-y-2">
                                                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                                    <MapPin className="h-3 w-3" /> Dirección de Entrega
                                                </label>
                                                <textarea
                                                    placeholder="Calle, ciudad, barrio, apto..."
                                                    value={orderDetails.address}
                                                    onChange={(e) => updateOrderDetails({ address: e.target.value })}
                                                    className="w-full rounded-2xl bg-white/5 p-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-white/5 min-h-[100px]"
                                                />
                                            </div>
                                        )}

                                        <div className="group space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                                Notas o Alergias
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Sin cebolla, extra salsa..."
                                                value={orderDetails.notes}
                                                onChange={(e) => updateOrderDetails({ notes: e.target.value })}
                                                className="w-full rounded-2xl bg-white/5 p-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-white/5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Payment */}
                        {step === 4 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-lg font-black text-foreground text-center">4. Método de Pago</h3>

                                <div className="grid gap-3">
                                    {['Efectivo', 'Nequi / Daviplata', 'Tarjeta (Datafono)'].map(method => (
                                        <button
                                            key={method}
                                            onClick={() => updateOrderDetails({ paymentMethod: method })}
                                            className={`flex items-center justify-between rounded-2xl p-6 text-left transition-all border-2 ${orderDetails.paymentMethod === method
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-white/5 bg-white/3 hover:bg-white/5'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <CreditCard className={`h-6 w-6 ${orderDetails.paymentMethod === method ? 'text-primary' : 'text-muted-foreground'}`} />
                                                <span className="font-bold">{method}</span>
                                            </div>
                                            {orderDetails.paymentMethod === method && <div className="h-4 w-4 rounded-full bg-primary" />}
                                        </button>
                                    ))}
                                </div>

                                <div className="glass-card rounded-[2rem] p-8 space-y-4">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Envío</span>
                                        <span className="text-green-500 font-bold">A convenir</span>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex justify-between text-2xl font-black text-foreground">
                                        <span>Total</span>
                                        <span className="text-primary">{formatCurrency(totalPrice)}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Footer Navigation */}
                    <div className="border-t border-white/5 bg-card/50 p-6 space-y-4">
                        <div className="flex items-center justify-between font-bold">
                            <span className="text-muted-foreground">Total:</span>
                            <span className="text-2xl font-black text-primary">{formatCurrency(totalPrice)}</span>
                        </div>

                        <div className="flex gap-3">
                            {step > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="flex-1 rounded-2xl bg-white/5 py-4 text-sm font-black uppercase tracking-widest text-foreground hover:bg-white/10"
                                >
                                    Atrás
                                </button>
                            )}

                            {step < 4 ? (
                                <button
                                    disabled={items.length === 0}
                                    onClick={handleNext}
                                    className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-2xl glow-yellow disabled:opacity-50 disabled:grayscale transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    Siguiente <ChevronRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <a
                                    href={generateWhatsAppMessage()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-sm font-black uppercase tracking-widest text-white shadow-2xl glow-green hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    <Phone className="h-4 w-4 fill-white" />
                                    Enviar Pedido
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
