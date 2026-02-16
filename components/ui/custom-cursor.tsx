"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if device is mobile to disable custom cursor (better UX)
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)

        const mouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const mouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("clickable")
            ) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", mouseMove)
        window.addEventListener("mouseover", mouseOver)

        return () => {
            window.removeEventListener("mousemove", mouseMove)
            window.removeEventListener("mouseover", mouseOver)
            window.removeEventListener("resize", checkMobile)
        }
    }, [])

    if (isMobile) return null

    return (
        <>
            {/* Precision Dot */}
            <div
                className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-100 ease-out"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
                }}
            />
            {/* Outer Glow Ring */}
            <div
                className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 mix-blend-difference transition-all duration-300 ease-out"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: isHovering ? "60px" : "32px",
                    height: isHovering ? "60px" : "32px",
                    backgroundColor: isHovering ? "rgba(245, 197, 24, 0.1)" : "transparent",
                    borderColor: isHovering ? "var(--primary)" : "rgba(245, 197, 24, 0.3)",
                    boxShadow: isHovering ? "0 0 20px rgba(245, 197, 24, 0.2)" : "none",
                }}
            />
        </>
    )
}
