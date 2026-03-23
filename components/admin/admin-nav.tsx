"use client";

import {
  Boxes,
  CalendarClock,
  ClipboardList,
  LayoutDashboard,
  Package,
  Tag,
  Users,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const icons = {
  LayoutDashboard,
  Package,
  Tag,
  Boxes,
  Users,
  ClipboardList,
  CalendarClock,
  Warehouse,
} as const;

const sections = [
  { href: "/admin", label: "Overview", icon: "LayoutDashboard" },
  { href: "/admin/products", label: "Productos", icon: "Package" },
  { href: "/admin/categories", label: "Categorias", icon: "Tag" },
  { href: "/admin/bundles", label: "Paquetes", icon: "Boxes" },
  { href: "/admin/customers", label: "Clientes", icon: "Users" },
  { href: "/admin/orders", label: "Pedidos", icon: "ClipboardList" },
  { href: "/admin/subscriptions", label: "Suscripciones", icon: "CalendarClock" },
  { href: "/admin/inventory", label: "Inventario", icon: "Warehouse" },
] as const;

export function AdminNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {sections.map((section) => {
        const isActive = pathname === section.href;
        const Icon = icons[section.icon as keyof typeof icons];

        return (
          <Link
            key={section.href}
            href={section.href}
            className={cn(
              "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors",
              isActive
                ? "bg-secondary text-foreground before:absolute before:left-0 before:top-1/2 before:h-4 before:-translate-y-1/2 before:w-0.5 before:rounded-full before:bg-primary"
                : "hover:bg-secondary hover:text-foreground",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? section.label : undefined}
          >
            <Icon className="size-4 shrink-0" />
            {!collapsed && <span>{section.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
