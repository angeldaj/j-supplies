import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Check, Package } from "lucide-react";

import { MediaFrame } from "@/components/shared/media-frame";
import { Reveal } from "@/components/shared/reveal";
import { BundleCard } from "@/components/store/bundle-card";
import { BundlePurchase } from "@/components/store/bundle-purchase";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getBundleBySlug, getRelatedBundles } from "@/lib/data/site";

export default async function BundleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);

  if (!bundle) {
    notFound();
  }

  const related = getRelatedBundles(slug, 3);

  return (
    <div className="page-shell py-8 md:py-12">
      {/* Breadcrumb */}
      <Reveal>
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            href="/bundles"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" />
            Paquetes
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{bundle.name}</span>
        </nav>
      </Reveal>

      {/* Main layout */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Left: Image */}
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <div className="relative">
              <MediaFrame
                src={bundle.image}
                alt={bundle.name}
                priority
                className="aspect-[4/5] md:aspect-[3/4]"
              />
              {bundle.savings && (
                <span className="absolute right-4 top-4 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-primary-foreground shadow-sm">
                  {bundle.savings}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* Right: Details */}
        <Reveal delay={0.1}>
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">
                <Package className="mr-0.5 size-3" />
                {bundle.includes.length} productos
              </Badge>
              <Badge variant="outline">{bundle.cadence}</Badge>
              {bundle.featured && <Badge>Popular</Badge>}
            </div>

            {/* Title + description */}
            <div>
              <h1 className="font-display text-3xl leading-[0.95] tracking-[-0.04em] text-foreground md:text-4xl">
                {bundle.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {bundle.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Ideal para: <span className="text-foreground">{bundle.idealFor}</span>
              </p>
            </div>

            <Separator />

            {/* Purchase section */}
            <BundlePurchase
              price={bundle.price}
              subscriptionPrice={bundle.subscriptionPrice}
              savings={bundle.savings}
              cadence={bundle.cadence}
            />

            <Separator />

            {/* What's inside */}
            <div>
              <details className="group rounded-lg border border-border" open>
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                  Que incluye este paquete
                  <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-border px-4 py-3">
                  <ul className="space-y-2">
                    {bundle.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="size-3 text-primary" />
                        </span>
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="group mt-2 rounded-lg border border-border">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                  Como funciona la suscripcion
                  <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <p>
                    Al suscribirte, recibes este paquete automaticamente segun la frecuencia seleccionada.
                    El cobro se realiza antes de cada envio. Puedes pausar, modificar o cancelar
                    desde tu cuenta en cualquier momento, sin penalidades.
                  </p>
                </div>
              </details>

              <details className="group mt-2 rounded-lg border border-border">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                  Envio y devoluciones
                  <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <p>Envio estandar en 3–5 dias habiles. Envio express disponible al checkout.</p>
                  <p className="mt-1.5">
                    Devoluciones aceptadas dentro de los primeros 15 dias si los productos no han sido abiertos.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Related bundles */}
      {related.length > 0 && (
        <div className="mt-16 md:mt-20">
          <Reveal>
            <Separator className="mb-8" />
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="editorial-kicker">Otros paquetes</p>
                <h2 className="mt-1 font-display text-2xl tracking-[-0.04em] text-foreground md:text-3xl">
                  Explora mas opciones
                </h2>
              </div>
              <Link
                href="/bundles"
                className="hidden shrink-0 text-xs font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground sm:inline"
              >
                Ver todos
              </Link>
            </div>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.06}>
                <BundleCard bundle={b} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
