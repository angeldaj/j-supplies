import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminSnapshot } from "@/lib/data/site";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker">Admin</p>
        <h1 className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">Clientes</h1>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Nota</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminSnapshot.customers.map((customer) => (
              <TableRow key={customer.name}>
                <TableCell className="font-medium text-foreground">{customer.name}</TableCell>
                <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>
                  <Badge variant={customer.status === "Activa" ? "default" : customer.status === "Pago fallido" ? "destructive" : "outline"}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-48 truncate">{customer.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {adminSnapshot.customers.map((customer) => (
          <div key={customer.name} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">{customer.name}</p>
              <Badge variant={customer.status === "Activa" ? "default" : customer.status === "Pago fallido" ? "destructive" : "outline"}>
                {customer.status}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{customer.email} &middot; {customer.orders} pedidos</p>
            <p className="mt-2 text-xs text-muted-foreground">{customer.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
