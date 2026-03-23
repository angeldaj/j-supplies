"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const storeLinks = [
  { href: "/", label: "Inicio" },
  { href: "/products", label: "Catalogo" },
  { href: "/bundles", label: "Paquetes" },
  { href: "/cart", label: "Carrito" },
  { href: "/account", label: "Cuenta" },
  { href: "/admin", label: "Admin" },
];

export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon-sm" onClick={() => setOpen(true)} className="lg:hidden">
        <Menu className="size-5" />
      </Button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background p-6"
            >
              <div className="flex justify-end">
                <Button variant="ghost" size="icon-sm" onClick={() => setOpen(false)}>
                  <X className="size-5" />
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-2">
                {storeLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i + 0.15, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-4xl tracking-[-0.04em] text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
