import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminSnapshot } from "@/lib/data/site";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="editorial-kicker">Admin</p>
        <h1 className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">Inventario</h1>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead>Minimo</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminSnapshot.stock.map((item) => (
              <TableRow
                key={item.sku}
                className={item.available <= item.minimum ? "border-l-2 border-l-destructive" : ""}
              >
                <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                <TableCell>
                  <Badge variant={item.available <= item.minimum ? "destructive" : "default"}>
                    {item.available}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.minimum}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Ajustar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {adminSnapshot.stock.map((item) => (
          <div
            key={item.sku}
            className={`rounded-lg border border-border bg-card p-4 ${
              item.available <= item.minimum ? "border-l-2 border-l-destructive" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">{item.name}</p>
              <Badge variant={item.available <= item.minimum ? "destructive" : "default"}>
                {item.available} disp.
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.sku} &middot; min. {item.minimum}</p>
            <div className="mt-3">
              <Button variant="outline" size="sm">Ajustar stock</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
