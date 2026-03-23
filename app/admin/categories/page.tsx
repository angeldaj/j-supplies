import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { categories } from "@/lib/data/site";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="editorial-kicker">Admin</p>
          <h1 className="mt-2 font-display text-4xl tracking-[-0.04em] text-foreground">Categorias</h1>
        </div>
        <Button>Nueva categoria</Button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Productos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.slug}>
                <TableCell className="font-medium text-foreground">{category.name}</TableCell>
                <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                <TableCell>
                  <Badge>{category.count}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {categories.map((category) => (
          <div key={category.slug} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-foreground">{category.name}</p>
              <Badge>{category.count} productos</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{category.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
