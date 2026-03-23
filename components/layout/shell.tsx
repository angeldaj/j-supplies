import Link from "next/link";
import type { ReactNode } from "react";

import { ShoppingBag } from "lucide-react";

import { AuthControls } from "@/components/layout/auth-controls";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/products", label: "Catalogo" },
  { href: "/bundles", label: "Paquetes" },
  { href: "/account", label: "Cuenta" },
  { href: "/admin", label: "Admin" },
];

export async function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="page-shell flex items-center justify-between gap-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-card">
              <span className="font-display text-lg tracking-[-0.04em] text-foreground">JS</span>
            </div>
            <div>
              <p className="font-display text-2xl leading-none tracking-[-0.04em] text-foreground">J Supplies</p>
              <p className="mt-0.5 hidden text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground md:block">Clinical care supply</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" render={<Link href="/cart" />}>
              <ShoppingBag className="size-4" />
            </Button>
            <AuthControls />
            <MobileDrawer />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-border/60">
        <div className="page-shell grid gap-10 py-12 text-center md:grid-cols-[1.1fr_0.9fr] md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-card">
                <span className="font-display text-sm tracking-[-0.04em] text-foreground">JS</span>
              </div>
              <p className="font-display text-xl tracking-[-0.04em] text-foreground">J Supplies</p>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Atencion recurrente para familias, cuidadores e instituciones. Catalogo claro, bundles curados y operacion ordenada.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Atencion</p>
              <p className="mt-3 text-sm text-foreground">Asesoria para compra unica, reposicion y suscripciones.</p>
            </div>
            <div className="rounded-lg border border-border p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Cobertura</p>
              <p className="mt-3 text-sm text-foreground">Entrega programada y control de referencias criticas.</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40">
          <div className="page-shell py-4 text-center">
            <p className="text-xs text-muted-foreground">&copy; 2026 J Supplies. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
