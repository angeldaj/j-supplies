"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  RefreshCw,
  X,
  ChevronDown,
  Package,
} from "lucide-react";

import { ProductCard } from "@/components/store/product-card";
import { ProductListCard } from "@/components/store/product-list-card";
import { Reveal } from "@/components/shared/reveal";
import { Input } from "@/components/ui/input";
import type { ProductCardData, CategoryData } from "@/lib/data/site";

type ViewMode = "grid" | "list";
type SortOption = "featured" | "price-asc" | "price-desc" | "name";
type PriceRange = "all" | "under10" | "10to20" | "over20";

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "under10", label: "< $10" },
  { value: "10to20", label: "$10 – $20" },
  { value: "over20", label: "> $20" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor" },
  { value: "price-desc", label: "Precio: mayor" },
  { value: "name", label: "Nombre A–Z" },
];

function parsePrice(price: string): number {
  return parseFloat(price.replace("$", ""));
}

function matchesPriceRange(price: string, range: PriceRange): boolean {
  if (range === "all") return true;
  const n = parsePrice(price);
  if (range === "under10") return n < 10;
  if (range === "10to20") return n >= 10 && n <= 20;
  return n > 20;
}

function sortProducts(products: ProductCardData[], sort: SortOption): ProductCardData[] {
  const sorted = [...products];
  switch (sort) {
    case "featured":
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    case "price-asc":
      return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case "price-desc":
      return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/* ─── Filter pill (shared) ─── */
function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
    >
      {children}
    </button>
  );
}

/* ─── Sidebar filter section label ─── */
function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </p>
  );
}

/* ─── Sidebar content (shared between desktop sidebar and mobile panel) ─── */
function FilterContent({
  categories,
  activeCategory,
  setActiveCategory,
  priceRange,
  setPriceRange,
  subscriptionOnly,
  setSubscriptionOnly,
  sort,
  setSort,
  hasActiveFilters,
  clearAll,
}: {
  categories: CategoryData[];
  activeCategory: string | null;
  setActiveCategory: (v: string | null) => void;
  priceRange: PriceRange;
  setPriceRange: (v: PriceRange) => void;
  subscriptionOnly: boolean;
  setSubscriptionOnly: (v: boolean) => void;
  sort: SortOption;
  setSort: (v: SortOption) => void;
  hasActiveFilters: boolean;
  clearAll: () => void;
}) {
  return (
    <div className="space-y-5">
      {/* Categories */}
      <div>
        <FilterLabel>Categoria</FilterLabel>
        <div className="flex flex-wrap gap-1.5">
          <FilterPill active={activeCategory === null} onClick={() => setActiveCategory(null)}>
            Todos
          </FilterPill>
          {categories.map((cat) => (
            <FilterPill
              key={cat.slug}
              active={activeCategory === cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
            >
              {cat.name}
              <span className="ml-1 opacity-40">{cat.count}</span>
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <FilterLabel>Precio</FilterLabel>
        <div className="flex flex-wrap gap-1.5">
          {priceRanges.map((r) => (
            <FilterPill
              key={r.value}
              active={priceRange === r.value}
              onClick={() => setPriceRange(priceRange === r.value ? "all" : r.value)}
            >
              {r.label}
            </FilterPill>
          ))}
        </div>
      </div>

      {/* Subscription */}
      <div>
        <FilterLabel>Modalidad</FilterLabel>
        <button
          onClick={() => setSubscriptionOnly(!subscriptionOnly)}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
            subscriptionOnly
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <RefreshCw className="size-3" />
          Solo suscripcion
        </button>
      </div>

      {/* Sort */}
      <div>
        <FilterLabel>Ordenar por</FilterLabel>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-8 w-full cursor-pointer appearance-none rounded-md border border-border bg-card py-1 pl-3 pr-8 text-xs text-foreground transition-colors hover:border-ring focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full rounded-md border border-border py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

/* ─── Main catalog ─── */
export function ProductCatalog({
  products,
  categories,
}: {
  products: ProductCardData[];
  categories: CategoryData[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [subscriptionOnly, setSubscriptionOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters =
    activeCategory !== null || priceRange !== "all" || subscriptionOnly || search.length > 0;

  const filtered = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (priceRange !== "all") {
      result = result.filter((p) => matchesPriceRange(p.price, priceRange));
    }

    if (subscriptionOnly) {
      result = result.filter((p) => p.subscriptionPrice);
    }

    return sortProducts(result, sort);
  }, [products, search, activeCategory, priceRange, subscriptionOnly, sort]);

  function clearAll() {
    setSearch("");
    setActiveCategory(null);
    setPriceRange("all");
    setSubscriptionOnly(false);
    setSort("featured");
  }

  const filterProps = {
    categories,
    activeCategory,
    setActiveCategory,
    priceRange,
    setPriceRange,
    subscriptionOnly,
    setSubscriptionOnly,
    sort,
    setSort,
    hasActiveFilters,
    clearAll,
  };

  return (
    <div className="flex gap-8">
      {/* ─── Desktop sidebar ─── */}
      <Reveal delay={0.1} className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 pr-8 text-xs"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          <div className="h-px bg-border" />

          <FilterContent {...filterProps} />
        </div>
      </Reveal>

      {/* ─── Main content ─── */}
      <div className="min-w-0 flex-1 space-y-4">
        {/* Mobile toolbar */}
        <Reveal delay={0.1} className="lg:hidden">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 pl-9 pr-8 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className={`flex h-10 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors ${
                mobileFiltersOpen || hasActiveFilters
                  ? "border-primary/40 bg-primary/5 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="size-3.5" />
              Filtros
            </button>
          </div>
        </Reveal>

        {/* Mobile filter panel */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="rounded-lg border border-border bg-card p-4">
                <FilterContent {...filterProps} />
                {/* View toggle inside mobile panel */}
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`rounded-md p-1.5 transition-colors ${
                        viewMode === "grid"
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <LayoutGrid className="size-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`rounded-md p-1.5 transition-colors ${
                        viewMode === "list"
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <List className="size-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-xs text-muted-foreground underline underline-offset-2"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar: result count + view toggle (desktop) */}
        <Reveal delay={0.15}>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
              </span>

              {/* Active filter pills */}
              {hasActiveFilters && (
                <>
                  <div className="h-3 w-px bg-border" />
                  {activeCategory && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[0.65rem] text-secondary-foreground">
                      {activeCategory}
                      <button onClick={() => setActiveCategory(null)} className="opacity-50 hover:opacity-100">
                        <X className="size-2.5" />
                      </button>
                    </span>
                  )}
                  {priceRange !== "all" && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[0.65rem] text-secondary-foreground">
                      {priceRanges.find((r) => r.value === priceRange)?.label}
                      <button onClick={() => setPriceRange("all")} className="opacity-50 hover:opacity-100">
                        <X className="size-2.5" />
                      </button>
                    </span>
                  )}
                  {subscriptionOnly && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[0.65rem] text-primary">
                      Suscripcion
                      <button onClick={() => setSubscriptionOnly(false)} className="opacity-50 hover:opacity-100">
                        <X className="size-2.5" />
                      </button>
                    </span>
                  )}
                  {search && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[0.65rem] text-secondary-foreground">
                      &ldquo;{search}&rdquo;
                      <button onClick={() => setSearch("")} className="opacity-50 hover:opacity-100">
                        <X className="size-2.5" />
                      </button>
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Desktop view toggle */}
            <div className="hidden items-center gap-1 rounded-lg border border-border p-0.5 lg:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Vista cuadricula"
              >
                <LayoutGrid className="size-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === "list"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Vista lista"
              >
                <List className="size-3.5" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Product grid/list */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center py-16 text-center"
            >
              <Package className="size-8 text-muted-foreground/30" />
              <p className="mt-3 font-display text-lg tracking-[-0.03em] text-foreground">
                Sin resultados
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Intenta con otros filtros o busca algo diferente.
              </p>
              <button
                onClick={clearAll}
                className="mt-3 text-xs text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
              >
                Limpiar filtros
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 gap-3 md:grid-cols-3"
                  : "flex flex-col gap-2.5"
              }
            >
              {filtered.map((product, i) => (
                <Reveal key={product.slug} delay={i * 0.04}>
                  {viewMode === "grid" ? (
                    <ProductCard product={product} />
                  ) : (
                    <ProductListCard product={product} />
                  )}
                </Reveal>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
