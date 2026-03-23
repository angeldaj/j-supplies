import Link from "next/link";
import { Package, CalendarClock, Truck, ArrowRight } from "lucide-react";

import { BundleCard } from "@/components/store/bundle-card";
import { SectionTitle } from "@/components/store/section-title";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { bundles } from "@/lib/data/site";

const steps = [
  {
    icon: Package,
    title: "Elige tu paquete",
    copy: "Selecciona el kit que mejor se ajuste a tu rutina o la de quien cuidas.",
  },
  {
    icon: CalendarClock,
    title: "Define la frecuencia",
    copy: "Compra unica o suscripcion mensual con precio reducido. Tu decides.",
  },
  {
    icon: Truck,
    title: "Recibe sin pensar",
    copy: "Te llega a la puerta. Sin listas, sin olvidos, sin vueltas al supermercado.",
  },
];

export default function BundlesPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="page-shell py-10 md:py-14">
        <Reveal>
          <div className="max-w-2xl">
            <p className="editorial-kicker">Paquetes curados</p>
            <h1 className="mt-3 font-display text-4xl leading-[0.92] tracking-[-0.04em] text-foreground md:text-5xl">
              Menos decisiones, mas tiempo para lo que importa.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Cada paquete agrupa los productos que mas se reponen juntos. Armados por frecuencia de uso
              real, no por inventario. Suscribete y olvidate de la lista.
            </p>
          </div>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="page-shell">
        <Reveal>
          <Separator className="mb-8" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="flex items-start gap-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <step.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bundles grid */}
      <section className="page-shell mt-12 space-y-8">
        <Reveal>
          <SectionTitle
            eyebrow="Todos los paquetes"
            title="Encuentra el kit para tu rutina."
            description="Familias, cuidadores o centros: hay un paquete pensado para cada necesidad."
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {bundles.map((bundle, i) => (
            <Reveal key={bundle.slug} delay={i * 0.06}>
              <BundleCard bundle={bundle} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="page-shell mt-16">
        <Reveal>
          <div className="rounded-lg border border-border bg-card p-6 text-center md:p-10">
            <p className="editorial-kicker">No encuentras lo que buscas?</p>
            <h2 className="mt-2 font-display text-2xl tracking-[-0.04em] text-foreground md:text-3xl">
              Explora todo el catalogo y arma tu propio pedido.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Puedes comprar productos sueltos, combinarlos como quieras y activar suscripcion en los que mas repones.
            </p>
            <div className="mt-6">
              <Button render={<Link href="/products" />}>
                Ver catalogo completo
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
