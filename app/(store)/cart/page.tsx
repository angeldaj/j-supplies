import Link from "next/link";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const items = [
  { name: "Pañal RespiraFlex M", mode: "Compra unica", quantity: 2, total: "$36" },
  { name: "Toallas Humedas Suaves", mode: "Compra unica", quantity: 1, total: "$7" },
  { name: "Crema Barrera Protectora", mode: "Suscripcion", quantity: 1, total: "$13" },
];

export default function CartPage() {
  return (
    <div className="page-shell py-10 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="editorial-kicker">Carrito</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.04em] text-foreground md:text-5xl">Tu seleccion.</h1>
          <div className="mt-8 space-y-3">
            {items.map((item) => (
              <div key={item.name} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.mode}</p>
                </div>
                <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                <p className="text-base font-medium tracking-[-0.03em] text-foreground">{item.total}</p>
                <Button variant="ghost" size="icon-xs">
                  <Trash2 className="size-3.5 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">Resumen</p>
          <p className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">$56</p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">$51</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Envio</span>
              <span className="text-foreground">$5</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Impuestos</span>
              <span className="text-foreground">$0</span>
            </div>
          </div>
          <Separator className="my-5" />
          <Button size="lg" className="w-full" render={<Link href="/checkout" />}>
            Continuar al checkout
          </Button>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-4 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-medium tracking-[-0.03em] text-foreground">$56</p>
          </div>
          <Button size="lg" render={<Link href="/checkout" />}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
