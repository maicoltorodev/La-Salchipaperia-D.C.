"use client"

import { useState, useRef, useEffect } from "react"
import {
  Flame,
  Star,
  Sparkles,
  Baby,
  Beef,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Dog,
  Drumstick,
  Sandwich,
  Salad,
  GlassWater,
  Beer,
  ShoppingBag,
} from "lucide-react"

import { useCart } from "@/context/cart-context"

/* ─── Data Types ─── */
interface MenuItem {
  id: number
  name: string
  price: string
  description: string
  badge?: string
  badgeColor?: string
}

interface MenuCategory {
  id: string
  label: string
  icon: React.ReactNode
  subtitle: string
  note?: string
  items: MenuItem[]
}

/* ─── Full Menu Data ─── */
const menuData: MenuCategory[] = [
  /* ── 1. SALCHIPAPAS ── */
  {
    id: "salchipapas",
    label: "Salchipapas",
    icon: <Flame className="h-4 w-4" />,
    subtitle: "Nuestros clasicos que enamoran",
    note: "Escoge tus papas: Francesa, Casco o Criolla",
    items: [
      {
        id: 1,
        name: "Papiclasica",
        price: "$15.900",
        description:
          "Papas, salchicha, queso, papita ripio y tocineta.",
        badge: "Popular",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 2,
        name: "Papicarne",
        price: "$27.900",
        description:
          "Papas, salchicha, carne en salsa criolla, papita ripio y queso.",
      },
      {
        id: 3,
        name: "Papimexicana",
        price: "$31.900",
        description:
          "Papas, salchicha, carne, guacamole, pico de gallo, nachos, papita ripio y sour cream (picante al gusto).",
        badge: "Favorita",
        badgeColor: "bg-accent text-accent-foreground",
      },
      {
        id: 4,
        name: "Papimaduro",
        price: "$27.900",
        description:
          "Papas, salchicha, tocineta, maduro, papita ripio, maiz dulce y queso.",
      },
      {
        id: 5,
        name: "Papicostilla",
        price: "$36.900",
        description:
          "Papas, salchicha, costillas BBQ, tocineta, papita ripio, pina caramelizada y queso.",
      },
      {
        id: 6,
        name: "Papicasa",
        price: "$38.900",
        description:
          "Papas, salchicha, pollo, chorizo, lechuga, queso costeno, papita ripio, salsa de ajo.",
      },
      {
        id: 7,
        name: "Papipollo",
        price: "$32.900",
        description:
          "Papas, salchicha, pollo, lechuga, queso costeno, papita ripio, salsa de ajo.",
      },
      {
        id: 8,
        name: "Papitodo",
        price: "$39.900",
        description:
          "Papas, salchicha, tocineta, pollo, carne, maduritos, papita ripio, maiz dulce, banada en quesos de la casa.",
        badge: "Best Seller",
        badgeColor: "bg-primary text-primary-foreground",
      },
    ],
  },

  /* ── 2. PAPAS ESPECIALES ── */
  {
    id: "especiales",
    label: "Papas Especiales",
    icon: <Star className="h-4 w-4" />,
    subtitle: "Para los verdaderos fans",
    note: "Escoge tus papas: Francesa, Casco o Criolla",
    items: [
      {
        id: 9,
        name: "Papicostena",
        price: "$41.900",
        description:
          "Papas, salchicha, pollo, carne, lechuga, chorizo, tocineta, butifarra, papita ripio, suero y queso costeno.",
      },
      {
        id: 10,
        name: "Papiranch",
        price: "$31.900",
        description:
          "Papas, salchicha, carne en salsa criolla, chorizo, queso cheddar, papita ripio, huevo y cebollin.",
      },
      {
        id: 11,
        name: "Papicrispy",
        price: "$31.900",
        description:
          "Papas, salchicha, pollo crispy, mermelada de pimenton, cebolla crispy, papita ripio, crema de queso y pepinillo agridulce.",
        badge: "Nuevo",
        badgeColor: "bg-accent text-accent-foreground",
      },
      {
        id: 12,
        name: "Papimix",
        price: "$46.900",
        description:
          "Papas, salchicha, costillas en salsa BBQ, pollo en salsa bechamel, madurito, papita ripio, banada en queso y guacamole.",
      },
      {
        id: 13,
        name: "Papibox",
        price: "$69.900",
        description:
          "Papas, salchicha, queso, chorizo, pulled pork, guacamole, maiz, chicharron, papita ripio y madurito.",
        badge: "Premium",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 14,
        name: "Papichambo",
        price: "$69.900",
        description:
          "Papas, papita ripio, salchicha, pollo, carne, madurito, tocineta, queso costeno, lechuga, maiz, banada en quesos de la casa.",
      },
      {
        id: 15,
        name: "Papimonda",
        price: "$76.900",
        description:
          "Papas, papita ripio, salchicha, pollo, carne, lechuga, queso costeno, chorizo, butifarra, chicharron, banada en quesos de la casa y salsa de ajo.",
        badge: "Top",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 16,
        name: "PapiQUEEN",
        price: "$105.900",
        description:
          "Papas, salchicha, papita ripio, pollo, chorizo, lechuga, queso costeno, maiz, tocineta, salsa de ajo y salsa de pina.",
        badge: "La Reina",
        badgeColor: "bg-[#F5C518] text-[#000]",
      },
    ],
  },

  /* ── 3. QUE PERROS (Hot Dogs) ── */
  {
    id: "hotdogs",
    label: "Que Perros",
    icon: <Dog className="h-4 w-4" />,
    subtitle: "Hot dogs con actitud D.C.",
    note: "Escoge tus papas: Francesa, Cascos, Criolla o Yuquitas. Bebida incluida: Gaseosa, Te o Agua",
    items: [
      {
        id: 100,
        name: "Bechamel",
        price: "$21.900",
        description:
          "Pan de mantequilla, salchicha, cebolla caramelizada, papita ripio, queso, pollo en salsa bechamel.",
      },
      {
        id: 101,
        name: "Criollo",
        price: "$21.900",
        description:
          "Pan de mantequilla, salchicha, cebolla caramelizada, papita ripio, queso, tocineta, carne, queso y madurito.",
        badge: "Popular",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 102,
        name: "Hawaiano",
        price: "$21.900",
        description:
          "Pan de mantequilla, salchicha, cebolla caramelizada, tocineta, papita ripio, pina y queso.",
      },
      {
        id: 103,
        name: "Mexicano",
        price: "$23.900",
        description:
          "Pan de mantequilla, salchicha, queso, nachos, carne desmechada, guacamole, papita ripio, pico de gallo y sour cream (picante al gusto).",
        badge: "Favorita",
        badgeColor: "bg-accent text-accent-foreground",
      },
      {
        id: 104,
        name: "Costicrispy",
        price: "$22.900",
        description:
          "Pan de mantequilla, salchicha, papita ripio, banado de queso, costillitas en salsa BBQ y cebolla crispy.",
        badge: "Nuevo",
        badgeColor: "bg-accent text-accent-foreground",
      },
    ],
  },

  /* ── 4. ALITAS DE POLLO ── */
  {
    id: "alitas",
    label: "Alitas",
    icon: <Drumstick className="h-4 w-4" />,
    subtitle: "Crujientes y adictivas",
    note: "Incluyen papas + apio + zanahoria. Salsas: BBQ, Golding (BBQ y mostaza), BBQ miel ajonjoli",
    items: [
      {
        id: 200,
        name: "Alitas x8",
        price: "$23.900",
        description:
          "8 piezas de alitas de pollo con papas, apio y zanahoria. Elige tu salsa: BBQ, Golding o BBQ miel ajonjoli.",
        badge: "Popular",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 201,
        name: "Alitas x20",
        price: "$42.900",
        description:
          "20 piezas de alitas de pollo con papas, apio y zanahoria. Elige tu salsa: BBQ, Golding o BBQ miel ajonjoli.",
        badge: "Para compartir",
        badgeColor: "bg-accent text-accent-foreground",
      },
    ],
  },

  /* ── 5. SANDWICH D.C. ── */
  {
    id: "sandwich",
    label: "Sandwich D.C.",
    icon: <Sandwich className="h-4 w-4" />,
    subtitle: "El sabor de la capital en pan artesanal",
    items: [
      {
        id: 300,
        name: "Sandwich D.C.",
        price: "$23.900",
        description:
          "Pan artesanal, carne, pollo, papita ripio, vegetales y queso. Salsa de ajo.",
        badge: "Unico",
        badgeColor: "bg-primary text-primary-foreground",
      },
    ],
  },

  /* ── 6. BURGERS ARTESANALES ── */
  {
    id: "burgers",
    label: "Burgers",
    icon: <Beef className="h-4 w-4" />,
    subtitle: "Hamburguesas hechas con amor",
    items: [
      {
        id: 18,
        name: "Clasica",
        price: "$16.900",
        description:
          "Pan de mantequilla, 160 g de carne, vegetales, cebolla caramelizada y queso.",
      },
      {
        id: 19,
        name: "Criolla",
        price: "$26.900",
        description:
          "Pan de mantequilla, 160 g de carne, vegetales, cebolla caramelizada, tocineta, madurito, huevo, maiz dulce y queso.",
        badge: "Popular",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 20,
        name: "Bechamel",
        price: "$26.900",
        description:
          "Pan de mantequilla, 160 g de carne, vegetales, cebolla caramelizada, pollo en salsa bechamel.",
      },
      {
        id: 21,
        name: "Hawaiana",
        price: "$26.900",
        description:
          "Pan de mantequilla, 160 g de carne, vegetales, cebolla caramelizada, tocineta, pina y queso.",
      },
      {
        id: 22,
        name: "Mexicana",
        price: "$26.900",
        description:
          "Pan de mantequilla, 160 g de carne, queso, nachos, guacamole, pico de gallo y sour cream (picante al gusto).",
      },
      {
        id: 23,
        name: "Porkostena",
        price: "$28.900",
        description:
          "Pan de mantequilla, 160 g de carne, vegetales, pulled pork, queso americano, queso mozzarella y queso costeno frito.",
        badge: "Nuevo",
        badgeColor: "bg-accent text-accent-foreground",
      },
      {
        id: 24,
        name: "Cheeseburger",
        price: "$28.900",
        description:
          "Pan de mantequilla, 160 g de carne, vegetales, cebolla caramelizada, madurito, tocineta, banada en quesos de la casa.",
        badge: "Best Seller",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 25,
        name: "Doblecarne",
        price: "$29.900",
        description:
          "Pan de mantequilla, 2 carnes de 180 g, rellenas de queso, vegetales, cebolla caramelizada y tocineta.",
      },
      {
        id: 26,
        name: "Pollo Crispy",
        price: "$26.900",
        description:
          "Pan de mantequilla, pollo crispy, mermelada de pimenton, crema de queso, cebolla crispy y pepinillo agridulce.",
      },
    ],
  },

  /* ── 7. PARA NINOS ── */
  {
    id: "kids",
    label: "Para Ninos",
    icon: <Baby className="h-4 w-4" />,
    subtitle: "Los mas peques tambien disfrutan",
    items: [
      {
        id: 17,
        name: "Papikids",
        price: "$21.900",
        description: "Papas, salchicha, nuggets y jugo en caja.",
        badge: "Kids",
        badgeColor: "bg-primary text-primary-foreground",
      },
    ],
  },

  /* ── 8. PAPITAS PARA QUE SE REPITA (Entradas) ── */
  {
    id: "entradas",
    label: "Entradas",
    icon: <Salad className="h-4 w-4" />,
    subtitle: "Ideales para entrada o para acompañar",
    items: [
      {
        id: 400,
        name: "Bolas de Queso",
        price: "$13.900",
        description:
          "Bolitas de queso banadas en queso cheddar, cebollin y tocineta.",
        badge: "Popular",
        badgeColor: "bg-primary text-primary-foreground",
      },
      {
        id: 401,
        name: "Papitas Cheddar",
        price: "$13.900",
        description: "Papas, queso cheddar, tocineta y cebollin.",
      },
      {
        id: 402,
        name: "Papitas Costenas",
        price: "$13.900",
        description: "Papas, queso costeno, pina y salsa de ajo.",
      },
      {
        id: 403,
        name: "Papicharron",
        price: "$22.900",
        description: "Papas criolla, chicharron y guacamole.",
        badge: "Top",
        badgeColor: "bg-primary text-primary-foreground",
      },
    ],
  },

  /* ── 9. ADICIONES ── */
  {
    id: "adiciones",
    label: "Adiciones",
    icon: <Plus className="h-4 w-4" />,
    subtitle: "Personaliza tu pedido como quieras",
    items: [
      { id: 500, name: "Queso costeno", price: "$6.900", description: "Porcion de queso costeno." },
      { id: 501, name: "Cebolla crispy", price: "$6.900", description: "Cebolla crocante frita." },
      { id: 502, name: "Pico de gallo", price: "$7.900", description: "Tomate, cebolla, cilantro y limon." },
      { id: 503, name: "Guacamole", price: "$7.900", description: "Guacamole fresco hecho en casa." },
      { id: 504, name: "Cebolla caramelizada", price: "$6.900", description: "Cebolla dulce caramelizada." },
      { id: 505, name: "Costillitas BBQ", price: "$13.900", description: "Costillitas en salsa BBQ." },
      { id: 506, name: "Bano de queso", price: "$12.900", description: "Bano generoso de quesos de la casa." },
      { id: 507, name: "Porcion de papas", price: "$7.900", description: "Porcion adicional de papas a eleccion." },
      { id: 508, name: "Salchichas", price: "$7.900", description: "Porcion adicional de salchichas." },
      { id: 509, name: "Madurito", price: "$6.900", description: "Tajadas de maduro frito." },
      { id: 510, name: "Maiz dulce", price: "$6.900", description: "Porcion de maiz dulce." },
      { id: 511, name: "Huevo frito", price: "$3.900", description: "Huevo frito al punto." },
      { id: 512, name: "Huevos de codorniz (5)", price: "$5.900", description: "5 unidades de huevos de codorniz." },
      { id: 513, name: "Chicharron", price: "$17.900", description: "Porcion de chicharron crocante." },
      { id: 514, name: "Pulled pork", price: "$13.900", description: "Cerdo desmechado estilo pulled pork." },
      { id: 515, name: "Tocineta", price: "$7.900", description: "Tiras de tocineta crocante." },
      { id: 516, name: "Nuggets (4)", price: "$7.900", description: "4 nuggets de pollo." },
      { id: 517, name: "Yuquitas", price: "$7.900", description: "Bastones de yuca fritos." },
      { id: 518, name: "Papitas (4)", price: "$7.900", description: "4 bolitas de papa rellenas." },
      { id: 519, name: "Chorizos", price: "$7.900", description: "Porcion de chorizo." },
      { id: 520, name: "Queso cheddar", price: "$6.900", description: "Porcion de queso cheddar." },
      { id: 521, name: "Pollo crispy", price: "$12.900", description: "Porcion de pollo crispy." },
      { id: 522, name: "Pepinillos", price: "$6.900", description: "Pepinillos agridulces." },
      { id: 523, name: "Butifarra", price: "$7.900", description: "Porcion de butifarra." },
      { id: 524, name: "Carne en salsa criolla o bechamel", price: "$13.900", description: "Porcion de carne en tu salsa preferida." },
      { id: 525, name: "Pollo en salsa criolla o bechamel", price: "$13.900", description: "Porcion de pollo en tu salsa preferida." },
      {
        id: 526,
        name: "Show de Explosion",
        price: "Desde $8.900",
        description:
          "Cheddar + Tocineta o Doritos. $11.900 en papas / $8.900 en hamburguesas.",
        badge: "Show",
        badgeColor: "bg-accent text-accent-foreground",
      },
      {
        id: 527,
        name: "Arma tu Combo",
        price: "$9.900",
        description:
          "Papas (francesa, casco, criolla o yuquitas) + bebida (gaseosa, te o agua).",
        badge: "Combo",
        badgeColor: "bg-primary text-primary-foreground",
      },
    ],
  },

  /* ── 10. BEBIDAS ── */
  {
    id: "bebidas",
    label: "Bebidas",
    icon: <GlassWater className="h-4 w-4" />,
    subtitle: "Refrescate con nuestras opciones",
    items: [
      /* Postobon */
      { id: 600, name: "Gaseosa", price: "$5.900", description: "Productos Postobon. Variedad de sabores." },
      { id: 601, name: "Te Hatsu sin calorias", price: "$8.900", description: "Te premium Hatsu sin calorias." },
      { id: 602, name: "Mr. Te", price: "$5.900", description: "Te Mr. Te refrescante." },
      { id: 603, name: "Sodas Hatsu con gas", price: "$6.900", description: "Soda Hatsu con gas en variedad de sabores." },
      { id: 604, name: "Agua sin gas", price: "$4.900", description: "Agua pura sin gas." },
      { id: 605, name: "Agua con gas", price: "$4.900", description: "Agua con gas refrescante." },
      /* Limonadas */
      { id: 606, name: "Limonada Natural", price: "$6.900", description: "Limonada natural hecha al momento." },
      { id: 607, name: "Limonada de Cereza", price: "$8.900", description: "Limonada con cereza fresca.", badge: "Popular", badgeColor: "bg-primary text-primary-foreground" },
      { id: 608, name: "Limonada de Mango", price: "$8.900", description: "Limonada tropical con mango." },
      { id: 609, name: "Limonada de Coco", price: "$8.900", description: "Limonada cremosa de coco." },
      { id: 610, name: "Limonada de Panela", price: "$7.900", description: "Limonada con panela, bien colombiana." },
      /* Jugos Naturales */
      { id: 611, name: "Jugo Natural en Agua", price: "$7.900", description: "Sabores: Feijoa, Fresa, Guanabana, Lulo, Mango, Maracuya, Mora." },
      { id: 612, name: "Jugo Natural en Leche", price: "$8.900", description: "Sabores: Feijoa, Fresa, Guanabana, Lulo, Mango, Maracuya, Mora." },
    ],
  },

  /* ── 11. CERVEZAS ── */
  {
    id: "cervezas",
    label: "Cervezas",
    icon: <Beer className="h-4 w-4" />,
    subtitle: "Para brindar por el sabor",
    items: [
      { id: 700, name: "3 Cordilleras", price: "$9.900", description: "Cerveza artesanal colombiana 3 Cordilleras.", badge: "Artesanal", badgeColor: "bg-primary text-primary-foreground" },
      { id: 701, name: "Heineken", price: "$7.900", description: "Cerveza premium importada Heineken." },
      { id: 702, name: "Sol", price: "$8.900", description: "Cerveza mexicana Sol, ligera y refrescante." },
      { id: 703, name: "Michela tu Cerveza", price: "+$3.000", description: "Convierte cualquier cerveza en michelada. Adicional sobre el precio de la cerveza.", badge: "Add-on", badgeColor: "bg-accent text-accent-foreground" },
    ],
  },
]

/* ── Total items counter ── */
const totalItems = menuData.reduce((acc, cat) => acc + cat.items.length, 0)

/* ─── Component ─── */
export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("salchipapas")
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const tabsRef = useRef<HTMLDivElement>(null)

  const currentIndex = menuData.findIndex((c) => c.id === activeCategory)

  const nextCategory = () => {
    const nextIndex = (currentIndex + 1) % menuData.length
    setActiveCategory(menuData[nextIndex].id)
    setExpandedItems({})
  }

  const prevCategory = () => {
    const prevIndex = (currentIndex - 1 + menuData.length) % menuData.length
    setActiveCategory(menuData[prevIndex].id)
    setExpandedItems({})
  }

  const activeData = menuData.find((c) => c.id === activeCategory)

  const toggleExpand = (catId: string) => {
    setExpandedItems((prev) => ({ ...prev, [catId]: !prev[catId] }))
  }

  const showAll = expandedItems[activeCategory]
  const INITIAL_SHOW = 6
  const displayItems = activeData
    ? showAll
      ? activeData.items
      : activeData.items.slice(0, INITIAL_SHOW)
    : []
  const hasMore = (activeData?.items.length ?? 0) > INITIAL_SHOW

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.05 }
    )

    const reveals = containerRef.current?.querySelectorAll(".scroll-reveal")
    reveals?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeCategory, showAll])

  const { addItem, totalItems, setIsCartOpen } = useCart()
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section id="menu" ref={containerRef} className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-[0.03]">
        <div className="absolute top-[10%] left-[5%] h-64 w-64 animate-rotate-slow rounded-full bg-primary blur-3xl" />
        <div className="absolute top-[40%] right-[5%] h-64 w-64 animate-rotate-slow rounded-full bg-accent blur-3xl" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="scroll-reveal mb-16 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase">
              Nuestra Carta
            </span>
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <h2 className="mb-6 text-4xl font-black tracking-tighter text-foreground sm:text-6xl md:text-7xl">
            Sabores que <span className="text-gradient drop-shadow-[0_0_20px_rgba(245,197,24,0.3)]">Enamoran</span>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {"Cada preparación es una obra de arte. Ingredientes seleccionados y combinaciones únicas que redefinen el street food premium."}
          </p>
        </div>

        {/* Category Selector - Mobile Carousel / Desktop Grid */}
        <div className="scroll-reveal relative mb-16" style={{ transitionDelay: '200ms' }}>
          {/* Desktop View: Grid/Scroll */}
          <div
            ref={tabsRef}
            className="hidden sm:flex no-scrollbar flex-wrap justify-center gap-3 px-1 pb-4"
          >
            {menuData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setExpandedItems({})
                }}
                className={`flex shrink-0 items-center gap-3 rounded-[1.2rem] px-6 py-3.5 text-xs font-black tracking-wider uppercase transition-all duration-300 ${activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(245,197,24,0.4)] scale-105"
                  : "glass-card text-muted-foreground hover:bg-white/10"
                  }`}
              >
                <div className={`${activeCategory === cat.id ? 'text-primary-foreground' : 'text-primary'}`}>
                  {cat.icon}
                </div>
                <span>{cat.label}</span>
                <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${activeCategory === cat.id ? 'bg-black/20' : 'bg-primary/10 text-primary'
                  }`}>
                  {cat.items.length}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile View: Carousel with Arrows */}
          <div className="flex items-center justify-between gap-4 sm:hidden">
            <button
              onClick={prevCategory}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-card text-primary transition-all active:scale-90"
              aria-label="Anterior categoría"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="relative flex-1 overflow-hidden">
              <div className="flex justify-center transition-all duration-500">
                {activeData && (
                  <div
                    key={activeCategory}
                    className="flex animate-in fade-in slide-in-from-right-4 items-center gap-3 rounded-[1.2rem] bg-primary px-6 py-4 text-xs font-black tracking-wider uppercase text-primary-foreground shadow-[0_10px_30px_rgba(245,197,24,0.4)] w-full justify-center"
                  >
                    <div className="text-primary-foreground">
                      {activeData.icon}
                    </div>
                    <span>{activeData.label}</span>
                    <span className="ml-1 rounded-full bg-black/20 px-2 py-0.5 text-[10px]">
                      {activeData.items.length}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={nextCategory}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-card text-primary transition-all active:scale-90"
              aria-label="Siguiente categoría"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Active Category Header */}
        {activeData && (
          <div className="scroll-reveal mb-12 flex flex-col items-center gap-3 text-center" style={{ transitionDelay: '300ms' }}>
            <h3 className="hidden sm:block text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {activeData.label}
            </h3>
            <p className="max-w-xl text-sm italic text-muted-foreground">{activeData.subtitle}</p>
            {activeData.note && (
              <div className="glass-card mt-2 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5">
                <UtensilsCrossed className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold text-foreground uppercase tracking-widest">
                  {activeData.note}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Menu Grid - Highly Animated */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item, idx) => (
            <div
              key={item.id}
              className="scroll-reveal glass-card group relative flex flex-col overflow-hidden rounded-[2rem] p-6 transition-all duration-500 hover:scale-[1.03] hover:bg-white/10"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {/* Top row: Badge + Price */}
              <div className="mb-6 flex items-center justify-between">
                {item.id % 2 === 0 ? (
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-1 w-4 rounded-full bg-primary/20" />
                    ))}
                  </div>
                ) : <div />}

                <span className="text-xl font-black tracking-tighter text-primary sm:text-2xl">
                  {item.price}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex items-center gap-2">
                  <h4 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                  {item.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground/80">
                  {item.description}
                </p>

                <button
                  onClick={() => addItem(item)}
                  className="flex w-full items-center justify-center gap-2 rounded-[1rem] bg-secondary/50 py-3 text-xs font-black uppercase tracking-widest text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  Lo quiero
                </button>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-primary/10 to-transparent blur-2xl" />
            </div>
          ))}
        </div>

        {/* Show More Actions */}
        {hasMore && (
          <div className="scroll-reveal mt-16 flex flex-col items-center gap-4 transition-all duration-1000" style={{ transitionDelay: '400ms' }}>
            <button
              onClick={() => toggleExpand(activeCategory)}
              className="glow-yellow flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-sm font-black uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {showAll ? (
                <>
                  Ver Menos <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Ver Todos ({activeData?.items.length ?? 0}) <Plus className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
              Mostrando {displayItems.length} de {activeData?.items.length}
            </p>
          </div>
        )}
        {/* Floating Cart integration */}
        <FloatingCart totalItems={totalItems} setIsCartOpen={setIsCartOpen} />
      </div>
    </section>
  )
}

function FloatingCart({ totalItems, setIsCartOpen }: { totalItems: number, setIsCartOpen: (v: boolean) => void }) {
  if (totalItems === 0) return null

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-8 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-primary px-8 py-4 shadow-[0_20px_50px_rgba(245,197,24,0.4)] transition-all duration-500 hover:scale-105 hover:bg-primary/90 glow-yellow animate-in fade-in slide-in-from-bottom-10"
    >
      <div className="relative">
        <ShoppingBag className="h-6 w-6 text-primary-foreground" />
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-accent-foreground ring-2 ring-primary">
          {totalItems}
        </span>
      </div>
      <span className="text-sm font-black uppercase tracking-widest text-primary-foreground">
        Ver mi pedido
      </span>
    </button>
  )
}
