import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bundles } from "@/lib/data/site";

export default function AdminBundlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="editorial-kicker">Admin</p>
          <h1 className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">Paquetes</h1>
        </div>
        <Button>Nuevo paquete</Button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Suscripcion</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Cadencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bundles.map((bundle) => (
              <TableRow key={bundle.slug}>
                <TableCell className="font-medium text-foreground">{bundle.name}</TableCell>
                <TableCell>{bundle.price}</TableCell>
                <TableCell>{bundle.subscriptionPrice ?? "—"}</TableCell>
                <TableCell>
                  <Badge>{bundle.includes.length}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{bundle.cadence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {bundles.map((bundle) => (
          <div key={bundle.slug} className="rounded-lg border border-border bg-card p-4">
            <p className="font-medium text-foreground">{bundle.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{bundle.cadence}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Precio</p>
                <p className="mt-0.5 text-foreground">{bundle.price}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Suscripcion</p>
                <p className="mt-0.5 text-foreground">{bundle.subscriptionPrice ?? "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Items</p>
                <p className="mt-0.5 text-foreground">{bundle.includes.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
