import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { MediaFrame } from "@/components/shared/media-frame";
import { Reveal } from "@/components/shared/reveal";
import { ProductCard } from "@/components/store/product-card";
import { ProductPurchase } from "@/components/store/product-purchase";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/site";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(slug, 4);

  return (
    <div className="page-shell py-8 md:py-12">
      {/* Breadcrumb */}
      <Reveal>
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/products" className="flex items-center gap-1 transition-colors hover:text-foreground">
            <ArrowLeft className="size-3" />
            Catalogo
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </Reveal>

      {/* Main layout */}
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Left: Image */}
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <MediaFrame
              src={product.image}
              alt={product.name}
              priority
              className="aspect-[4/5] md:aspect-[3/4]"
            />
          </div>
        </Reveal>

        {/* Right: Details */}
        <Reveal delay={0.1}>
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">{product.category}</Badge>
              {product.featured ? <Badge>Destacado</Badge> : null}
            </div>

            {/* Title + description */}
            <div>
              <h1 className="font-display text-3xl leading-[0.95] tracking-[-0.04em] text-foreground md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Purchase section */}
            <ProductPurchase
              price={product.price}
              subscriptionPrice={product.subscriptionPrice}
              stock={product.stock}
              note={product.note}
            />

            <Separator />

            {/* Product details accordion-style blocks */}
            <div className="space-y-3">
              <details className="group rounded-lg border border-border" open>
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                  Detalles del producto
                  <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <ul className="space-y-1.5">
                    <li className="flex justify-between">
                      <span>Categoria</span>
                      <span className="text-foreground">{product.category}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Precio unitario</span>
                      <span className="text-foreground">{product.price}</span>
                    </li>
                    {product.subscriptionPrice && (
                      <li className="flex justify-between">
                        <span>Precio suscripcion</span>
                        <span className="text-primary">{product.subscriptionPrice}/mes</span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span>Disponibilidad</span>
                      <span className="text-foreground">{product.stock} unidades</span>
                    </li>
                  </ul>
                </div>
              </details>

              <details className="group rounded-lg border border-border">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                  Envio y devoluciones
                  <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <p>Envio estandar en 3–5 dias habiles. Envio express disponible al checkout.</p>
                  <p className="mt-1.5">Devoluciones aceptadas dentro de los primeros 15 dias si el producto no ha sido abierto.</p>
                </div>
              </details>

              <details className="group rounded-lg border border-border">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-foreground">
                  Sobre suscripciones
                  <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <p>Las suscripciones se cobran y envian automaticamente cada mes. Puedes pausar, cambiar la frecuencia o cancelar desde tu cuenta en cualquier momento.</p>
                </div>
              </details>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16 md:mt-20">
          <Reveal>
            <Separator className="mb-8" />
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="editorial-kicker">Tambien te puede interesar</p>
                <h2 className="mt-1 font-display text-2xl tracking-[-0.04em] text-foreground md:text-3xl">
                  Productos relacionados
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden shrink-0 text-xs font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground sm:inline"
              >
                Ver todos
              </Link>
            </div>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
