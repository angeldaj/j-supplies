"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, RefreshCw } from "lucide-react";

import { MediaFrame } from "@/components/shared/media-frame";
import { Badge } from "@/components/ui/badge";
import type { BundleCardData } from "@/lib/data/site";

export function BundleCard({ bundle }: { bundle: BundleCardData }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group h-full"
    >
      <Link
        href={`/bundles/${bundle.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card"
      >
        <div className="relative overflow-hidden">
          <motion.div
            className="transition-transform duration-500"
            whileHover={{ scale: 1.03 }}
          >
            <MediaFrame
              src={bundle.image}
              alt={bundle.name}
              className="aspect-[3/2] min-h-0 rounded-none"
            />
          </motion.div>
          {bundle.savings && (
            <span className="absolute right-3 top-3 rounded-md bg-primary px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-primary-foreground">
              {bundle.savings}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="text-[0.6rem]">
              <Package className="mr-0.5 size-2.5" />
              {bundle.includes.length} productos
            </Badge>
            <Badge variant="outline" className="text-[0.6rem]">
              <RefreshCw className="mr-0.5 size-2.5" />
              {bundle.cadence}
            </Badge>
          </div>

          <h3 className="mt-2 font-display text-lg leading-snug tracking-[-0.03em] text-foreground">
            {bundle.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {bundle.description}
          </p>

          <p className="mt-2 text-[0.65rem] text-muted-foreground">{bundle.idealFor}</p>

          <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-3 mt-3">
            <div>
              <span className="text-base font-medium tracking-[-0.03em] text-foreground">
                {bundle.subscriptionPrice ?? bundle.price}
              </span>
              {bundle.subscriptionPrice && (
                <span className="ml-1.5 text-xs text-muted-foreground line-through">
                  {bundle.price}
                </span>
              )}
              {bundle.subscriptionPrice && (
                <span className="ml-1 text-[0.6rem] text-primary">/mes</span>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              Ver paquete
              <ArrowRight className="size-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
