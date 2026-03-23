import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { LogoutButton } from "@/components/layout/logout-button";
import { getServerAuthSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/account");
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card xl:flex">
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
          <div className="flex size-8 items-center justify-center rounded-md border border-border bg-background">
            <span className="font-display text-sm text-foreground">JS</span>
          </div>
          <span className="font-display text-lg tracking-[-0.03em] text-foreground">Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <AdminNav />
        </div>
        <div className="border-t border-border px-4 py-3">
          <p className="truncate text-sm text-foreground">{session.user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{session.user.email}</p>
          <div className="mt-2">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Tablet collapsed sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-16 flex-col border-r border-border bg-card lg:flex xl:hidden">
        <div className="flex items-center justify-center border-b border-border py-4">
          <div className="flex size-8 items-center justify-center rounded-md border border-border bg-background">
            <span className="font-display text-sm text-foreground">JS</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4">
          <AdminNav collapsed />
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          <AdminMobileNav />
          <span className="font-display text-lg text-foreground">JS Admin</span>
        </div>
        <p className="text-xs text-muted-foreground">{session.user.email}</p>
      </div>

      {/* Content */}
      <div className="lg:pl-16 xl:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
