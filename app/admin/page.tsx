import { MetricCard } from "@/components/admin/metric-card";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { adminSnapshot } from "@/lib/data/site";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl tracking-[-0.04em] text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">22 de marzo, 2026</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminSnapshot.metrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 0.08}>
            <MetricCard {...metric} />
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Reveal>
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="font-display text-2xl tracking-[-0.03em] text-foreground">Clientes recientes</h3>
            <div className="mt-4 space-y-2">
              {adminSnapshot.customers.map((customer) => (
                <div key={customer.name} className="flex items-center gap-3 rounded-md bg-secondary p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-xs font-medium text-foreground">
                    {customer.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{customer.name}</p>
                    <p className="text-xs text-muted-foreground">{customer.orders} pedidos &middot; {customer.note}</p>
                  </div>
                  <Badge variant={customer.status === "Activa" ? "default" : customer.status === "Pago fallido" ? "destructive" : "outline"} className="shrink-0">
                    {customer.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="font-display text-2xl tracking-[-0.03em] text-foreground">Inventario critico</h3>
            <div className="mt-4 space-y-2">
              {adminSnapshot.stock.map((item) => (
                <div
                  key={item.sku}
                  className={`flex items-center gap-3 rounded-md bg-secondary p-3 ${
                    item.available <= item.minimum ? "border-l-2 border-l-destructive" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sku} &middot; min. {item.minimum}</p>
                  </div>
                  <Badge variant={item.available <= item.minimum ? "destructive" : "default"}>
                    {item.available} disp.
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
