"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
    id: number
    name: string
    price: string
    quantity: number
    description: string
}

export interface OrderDetails {
    customerName: string
    address: string
    phone: string
    paymentMethod: string
    orderType: "delivery" | "pickup"
    locationId?: number
    locationName?: string
    notes?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: any) => void
    removeItem: (id: number) => void
    updateQuantity: (id: number, delta: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
    orderDetails: OrderDetails
    updateOrderDetails: (details: Partial<OrderDetails>) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        customerName: "",
        address: "",
        phone: "",
        paymentMethod: "Efectivo",
        orderType: "delivery",
    })

    // Sync with local storage
    useEffect(() => {
        const savedCart = localStorage.getItem("salchipaperia-cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Error parsing cart", e)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("salchipaperia-cart", JSON.stringify(items))
    }, [items])

    const addItem = (item: any) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
        setIsCartOpen(true)
    }

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id))
    }

    const updateQuantity = (id: number, delta: number) => {
        setItems((prev) =>
            prev.map((i) => {
                if (i.id === id) {
                    const newQty = Math.max(0, i.quantity + delta)
                    return { ...i, quantity: newQty }
                }
                return i
            }).filter(i => i.quantity > 0)
        )
    }

    const clearCart = () => {
        setItems([])
        localStorage.removeItem("salchipaperia-cart")
    }

    const updateOrderDetails = (details: Partial<OrderDetails>) => {
        setOrderDetails((prev) => ({ ...prev, ...details }))
    }

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

    const parsePrice = (priceStr: string) => {
        return parseInt(priceStr.replace(/[^0-9]/g, "")) || 0
    }

    const totalPrice = items.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isCartOpen,
                setIsCartOpen,
                orderDetails,
                updateOrderDetails,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
