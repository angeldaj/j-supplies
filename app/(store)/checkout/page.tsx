import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const fields = ["Nombre completo", "Correo", "Telefono", "Direccion"];

export default function CheckoutPage() {
  return (
    <div className="page-shell py-10 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="editorial-kicker">Checkout</p>
          <h1 className="mt-3 font-display text-4xl tracking-[-0.04em] text-foreground md:text-5xl">Entrega y pago.</h1>
          <div className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((label) => (
                <label key={label} className="grid gap-1.5 text-sm text-muted-foreground">
                  {label}
                  <Input placeholder={label} />
                </label>
              ))}
            </div>
            <p className="rounded-lg bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
              El precio final se recalcula en servidor antes de crear la orden y el intento de pago.
            </p>
            <Button size="lg" className="w-full sm:w-auto">Pagar compra</Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <p className="editorial-kicker">Pedido</p>
          <h2 className="mt-2 font-display text-3xl tracking-[-0.04em] text-foreground">Resumen</h2>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Pañal RespiraFlex M x2</span>
              <span className="text-foreground">$36</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Toallas Humedas Suaves x1</span>
              <span className="text-foreground">$7</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground">Crema Barrera x1</span>
              <span className="text-foreground">$13</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-medium text-foreground">$56</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
