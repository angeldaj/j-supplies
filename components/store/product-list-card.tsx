"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";

import { MediaFrame } from "@/components/shared/media-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProductCardData } from "@/lib/data/site";

export function ProductListCard({ product }: { product: ProductCardData }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="flex overflow-hidden rounded-lg border border-border bg-card">
        <div className="hidden shrink-0 overflow-hidden sm:block sm:w-40">
          <motion.div
            className="h-full transition-transform duration-500"
            whileHover={{ scale: 1.03 }}
          >
            <MediaFrame
              src={product.image}
              alt={product.name}
              className="aspect-auto min-h-0 h-full rounded-none"
            />
          </motion.div>
        </div>
        <div className="flex flex-1 items-center justify-between gap-3 p-3.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate font-display text-base leading-snug tracking-[-0.03em] text-foreground">
                {product.name}
              </h3>
              {product.featured ? <Badge className="shrink-0 text-[0.55rem] h-4 px-1.5">Top</Badge> : null}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{product.category}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium tracking-[-0.02em] text-foreground">{product.price}</p>
              {product.subscriptionPrice ? (
                <p className="flex items-center justify-end gap-1 text-[0.65rem] text-primary">
                  <RefreshCw className="size-2" />
                  {product.subscriptionPrice}
                </p>
              ) : null}
            </div>
            <ArrowRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
