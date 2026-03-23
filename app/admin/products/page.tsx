import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { products } from "@/lib/data/site";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="editorial-kicker">Admin</p>
          <h1 className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">Productos</h1>
        </div>
        <Button>Nuevo producto</Button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Suscripcion</TableHead>
              <TableHead>Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.slug}>
                <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.subscriptionPrice ?? "—"}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div key={product.slug} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-foreground">{product.name}</p>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Precio</p>
                <p className="mt-0.5 text-foreground">{product.price}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Suscripcion</p>
                <p className="mt-0.5 text-foreground">{product.subscriptionPrice ?? "—"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Stock</p>
                <p className="mt-0.5 text-foreground">{product.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
