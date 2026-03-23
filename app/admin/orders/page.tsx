import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminSnapshot } from "@/lib/data/site";

function statusVariant(status: string) {
  if (status === "Pagado") return "default" as const;
  if (status === "Pendiente") return "outline" as const;
  return "destructive" as const;
}

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker">Admin</p>
        <h1 className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">Pedidos</h1>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminSnapshot.orders.map((order) => (
              <TableRow key={order.number}>
                <TableCell className="font-medium text-foreground">{order.number}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {adminSnapshot.orders.map((order) => (
          <div key={order.number} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">{order.number}</p>
              <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{order.customer} &middot; {order.type}</p>
            <p className="mt-2 text-base font-medium text-foreground">{order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
