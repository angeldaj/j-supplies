import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminSnapshot } from "@/lib/data/site";

function statusVariant(status: string) {
  if (status === "Activa") return "default" as const;
  if (status === "Pago fallido") return "destructive" as const;
  return "outline" as const;
}

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker">Admin</p>
        <h1 className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">Suscripciones</h1>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Bundle</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Proximo cobro</TableHead>
              <TableHead>Proximo envio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminSnapshot.subscriptions.map((sub) => (
              <TableRow key={`${sub.customer}-${sub.bundle}`}>
                <TableCell className="font-medium text-foreground">{sub.customer}</TableCell>
                <TableCell>{sub.bundle}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(sub.status)}>{sub.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{sub.nextCharge}</TableCell>
                <TableCell className="text-muted-foreground">{sub.nextShipment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {adminSnapshot.subscriptions.map((sub) => (
          <div key={`${sub.customer}-${sub.bundle}`} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">{sub.customer}</p>
              <Badge variant={statusVariant(sub.status)}>{sub.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{sub.bundle}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Cobro</p>
                <p className="mt-0.5 text-foreground">{sub.nextCharge}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Envio</p>
                <p className="mt-0.5 text-foreground">{sub.nextShipment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
