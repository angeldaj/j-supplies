"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { MediaFrame } from "@/components/shared/media-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductCardData } from "@/lib/data/site";

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group h-full"
    >
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-hidden">
          <motion.div
            className="transition-transform duration-500"
            whileHover={{ scale: 1.03 }}
          >
            <MediaFrame src={product.image} alt={product.name} label={product.category} className="aspect-[3/2] min-h-0 rounded-none" />
          </motion.div>
        </div>
        <div className="flex flex-1 flex-col p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg leading-snug tracking-[-0.03em] text-foreground">{product.name}</h3>
            {product.featured ? <Badge className="shrink-0 text-[0.6rem]">Top</Badge> : null}
          </div>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div>
              <span className="text-base font-medium tracking-[-0.03em] text-foreground">{product.price}</span>
              {product.subscriptionPrice ? (
                <span className="ml-2 text-xs text-primary">{product.subscriptionPrice}/sus</span>
              ) : null}
            </div>
            <Button size="sm" variant="ghost" className="h-7 gap-1 px-2 text-xs" tabIndex={-1}>
              Ver
              <ArrowRight className="size-3" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
