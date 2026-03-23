import { ProductCatalog } from "@/components/store/product-catalog";
import { SectionTitle } from "@/components/store/section-title";
import { Reveal } from "@/components/shared/reveal";
import { categories, products } from "@/lib/data/site";

export default function ProductsPage() {
  return (
    <div className="page-shell space-y-8 py-10 md:py-12">
      <Reveal>
        <SectionTitle
          eyebrow="Catalogo"
          title="Todo lo que necesitas, en un solo lugar."
          description="Busca, filtra y encuentra productos esenciales por categoria, precio o modalidad de compra."
        />
      </Reveal>

      <ProductCatalog products={products} categories={categories} />
    </div>
  );
}
