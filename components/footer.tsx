import Image from "next/image"
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react"
import restaurantData from "@/data/restaurant-info.json"

const footerLinks = {
  menu: [
    { label: "Clasicas", href: "#menu" },
    { label: "Premium", href: "#menu" },
    { label: "Especiales", href: "#menu" },
    { label: "Combos", href: "#menu" },
    { label: "Bebidas", href: "#menu" },
  ],
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Sedes", href: "#sedes" },
    { label: "Franquicias", href: "#contacto" },
    { label: "Trabaja con Nosotros", href: "#contacto" },
  ],
  legal: [
    { label: "Terminos y Condiciones", href: "#" },
    { label: "Politica de Privacidad", href: "#" },
    { label: "Proteccion de Datos", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="La Salchipaperia D.C. Logo"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-foreground">{"La Salchipaperia D.C."}</span>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {"La experiencia premium de salchipapas. 9 sedes en Bogota, presencia en Miami y proximamente en Medellin."}
            </p>
            <div className="flex gap-3">
              <a
                href={restaurantData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={restaurantData.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-foreground uppercase">
              Menu
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-foreground uppercase">
              Empresa
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-foreground uppercase">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={`tel:+${restaurantData.contact.mainPhone}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  +{restaurantData.contact.mainPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${restaurantData.contact.email}`}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {restaurantData.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Bogota D.C. + Miami, USA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {"© 2026 La Salchipaperia D.C. Todos los derechos reservados."}
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
