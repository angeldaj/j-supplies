"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  ShoppingBag,
  CalendarClock,
  ArrowRight,
  Check,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type PurchaseMode = "once" | "subscription";

export function ProductPurchase({
  price,
  subscriptionPrice,
  stock,
  note,
}: {
  price: string;
  subscriptionPrice?: string;
  stock: number;
  note: string;
}) {
  const [mode, setMode] = useState<PurchaseMode>(subscriptionPrice ? "subscription" : "once");
  const [qty, setQty] = useState(1);

  const activePrice = mode === "subscription" && subscriptionPrice ? subscriptionPrice : price;
  const lowStock = stock <= 15;

  return (
    <div className="space-y-5">
      {/* Purchase mode toggle */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode("once")}
          className={`relative rounded-lg border p-3.5 text-left transition-all ${
            mode === "once"
              ? "border-foreground bg-card ring-1 ring-foreground/10"
              : "border-border bg-card hover:border-foreground/20"
          }`}
        >
          {mode === "once" && (
            <span className="absolute right-2.5 top-2.5 flex size-4 items-center justify-center rounded-full bg-foreground">
              <Check className="size-2.5 text-background" />
            </span>
          )}
          <ShoppingBag className="size-4 text-muted-foreground" />
          <p className="mt-2 text-xs font-medium text-foreground">Compra unica</p>
          <p className="mt-0.5 text-lg font-medium tracking-[-0.03em] text-foreground">{price}</p>
        </button>

        {subscriptionPrice ? (
          <button
            onClick={() => setMode("subscription")}
            className={`relative rounded-lg border p-3.5 text-left transition-all ${
              mode === "subscription"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            {mode === "subscription" && (
              <span className="absolute right-2.5 top-2.5 flex size-4 items-center justify-center rounded-full bg-primary">
                <Check className="size-2.5 text-primary-foreground" />
              </span>
            )}
            <CalendarClock className="size-4 text-primary" />
            <p className="mt-2 text-xs font-medium text-foreground">Suscripcion</p>
            <p className="mt-0.5 text-lg font-medium tracking-[-0.03em] text-primary">{subscriptionPrice}</p>
            <p className="mt-0.5 text-[0.6rem] text-muted-foreground">Envio mensual automatico</p>
          </button>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-border p-3.5">
            <p className="text-xs text-muted-foreground">Suscripcion no disponible</p>
          </div>
        )}
      </div>

      {/* Subscription benefit hint */}
      <AnimatePresence mode="wait">
        {mode === "subscription" && subscriptionPrice && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 rounded-md bg-primary/5 px-3 py-2">
              <RefreshCw className="size-3 shrink-0 text-primary" />
              <p className="text-xs text-primary">
                Ahorras cada mes. Cancela o pausa cuando quieras.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quantity + CTA */}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            disabled={qty <= 1}
            className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-10 text-center text-sm font-medium tabular-nums text-foreground">{qty}</span>
          <button
            onClick={() => setQty(Math.min(stock, qty + 1))}
            disabled={qty >= stock}
            className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        <Button size="lg" className="flex-1" render={<Link href="/cart" />}>
          {mode === "subscription" ? "Suscribirme" : "Añadir al carrito"}
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>

      {/* Stock + shipping info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`size-1.5 rounded-full ${lowStock ? "bg-destructive" : "bg-green-600"}`}
          />
          <p className="text-xs text-muted-foreground">
            {lowStock ? `Quedan ${stock} unidades` : `${stock} unidades disponibles`}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Truck className="size-3 shrink-0" />
          <span>{note}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="size-3 shrink-0" />
          <span>Pago seguro. Satisfaccion garantizada.</span>
        </div>
      </div>
    </div>
  );
}
