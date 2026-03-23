"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon-sm" onClick={() => setOpen(true)} className="xl:hidden">
        <Menu className="size-5" />
      </Button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card border-r border-border p-5"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-md border border-border bg-background">
                    <span className="font-display text-sm text-foreground">JS</span>
                  </div>
                  <span className="font-display text-lg text-foreground">Admin</span>
                </div>
                <Button variant="ghost" size="icon-xs" onClick={() => setOpen(false)}>
                  <X className="size-4" />
                </Button>
              </div>
              <AdminNav />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
