"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if device is mobile to disable custom cursor (better UX)
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)

        const mouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true)
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const mouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            // Hide cursor when hovering over iframes (like maps)
            if (target.tagName === "IFRAME" || target.closest("iframe")) {
                setIsVisible(false)
                return
            }

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

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener("mousemove", mouseMove)
        window.addEventListener("mouseover", mouseOver)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            window.removeEventListener("mousemove", mouseMove)
            window.removeEventListener("mouseover", mouseOver)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
            window.removeEventListener("resize", checkMobile)
        }
    }, [isVisible])

    if (isMobile) return null

    return (
        <div
            className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Precision Dot */}
            <div
                className="fixed h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-100 ease-out"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
                }}
            />
            {/* Outer Glow Ring */}
            <div
                className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 mix-blend-difference transition-all duration-300 ease-out"
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
        </div>
    )
}
