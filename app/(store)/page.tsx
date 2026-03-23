import Link from "next/link";

import { ArrowRight, HeartHandshake, PackageCheck, ShieldCheck } from "lucide-react";

import { BundleCard } from "@/components/store/bundle-card";
import { ProductCard } from "@/components/store/product-card";
import { SectionTitle } from "@/components/store/section-title";
import { MediaFrame } from "@/components/shared/media-frame";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bundles, categories, products } from "@/lib/data/site";

const highlights = [
  { title: "Reposicion recurrente", copy: "Compra unica y suscripcion desde una misma narrativa de producto.", icon: PackageCheck },
  { title: "Curadoria clara", copy: "Categorias, bundles y fichas hechas para decidir sin ruido.", icon: HeartHandshake },
  { title: "Operacion visible", copy: "El panel admin acompaña stock, pedidos y clientes con la misma identidad.", icon: ShieldCheck },
];

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="page-shell py-10 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Reveal>
              <Badge variant="outline">Clinical care supply</Badge>
              <div className="mt-6 space-y-5">
                <p className="editorial-kicker">Proveedor establecido</p>
                <h1 className="font-display text-4xl leading-[0.9] tracking-[-0.04em] text-foreground md:text-6xl lg:text-7xl">
                  Cuidado personal con presencia serena y lista para recompra.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">
                  Diseñada para familias, cuidadores y equipos que necesitan comprar, reponer y seguir la operacion sin friccion.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" render={<Link href="/products" />}>
                  Explorar catalogo
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" render={<Link href="/bundles" />}>
                  Ver paquetes
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal delay={0.15}>
              <MediaFrame
                src="https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=1400&q=80"
                alt="Productos de cuidado personal organizados sobre superficie clara"
                priority
                className="aspect-[4/3] lg:aspect-[4/4.5]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="page-shell mt-8">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-foreground">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="page-shell mt-16 space-y-8">
        <Reveal>
          <SectionTitle
            eyebrow="Categorias"
            title="Una entrada de compra limpia para referencias esenciales."
            description="Las familias compran mas rapido cuando el catalogo no compite con la informacion."
            action={<Button variant="outline" size="sm" render={<Link href="/products" />}>Ver todo</Button>}
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => (
            <Reveal key={category.slug} delay={i * 0.08}>
              <div>
                <MediaFrame src={category.image} alt={category.name} label={`${category.count} ref.`} className="aspect-[4/3]" />
                <h3 className="mt-4 font-display text-2xl tracking-[-0.03em] text-foreground">{category.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="page-shell mt-16 space-y-8">
        <Reveal>
          <SectionTitle
            eyebrow="Productos"
            title="Referencias listas para compra puntual o recompra mensual."
            description="Las tarjetas priorizan fotografia, modo de compra y claridad de precio."
            action={<Button variant="outline" size="sm" render={<Link href="/products" />}>Catalogo completo</Button>}
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProducts.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bundles interstitial */}
      <section className="mt-16 bg-secondary">
        <div className="page-shell grid items-center gap-8 py-12 md:grid-cols-2 md:py-16">
          <Reveal>
            <div className="space-y-5">
              <p className="editorial-kicker">Paquetes curados</p>
              <h2 className="font-display text-4xl leading-[0.92] tracking-[-0.04em] text-foreground md:text-5xl">
                Deja de armar listas. Alguien ya penso en lo que necesitas.
              </h2>
              <p className="text-base leading-7 text-muted-foreground">
                Kits armados por frecuencia de uso real. Suscribete una vez y recibe todo en la puerta, mes a mes.
              </p>
              <Button size="lg" render={<Link href="/bundles" />}>
                Ver paquetes
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <MediaFrame
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1400&q=80"
              alt="Kit de higiene personal organizado"
              className="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>

      {/* Bundles */}
      <section className="page-shell mt-16 space-y-8">
        <Reveal>
          <SectionTitle
            eyebrow="Nuestros paquetes"
            title="Menos viajes, menos olvidos, mejor precio."
            description="Cada kit agrupa lo que mas se repone junto. Compra una vez o activa la suscripcion y ahorra cada mes."
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
    </div>
  );
}
