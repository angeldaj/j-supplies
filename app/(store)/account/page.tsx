import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/auth";
import { accountSnapshot } from "@/lib/data/site";

export default async function AccountPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  return (
    <div className="page-shell space-y-8 py-10 md:py-12">
      {/* Header */}
      <div className="space-y-3">
        <Badge variant="secondary">Cuenta activa</Badge>
        <h1 className="font-display text-4xl tracking-[-0.04em] text-foreground md:text-5xl">
          {session.user.name ?? accountSnapshot.name}
        </h1>
        <p className="text-sm text-muted-foreground">{session.user.email ?? accountSnapshot.email}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Addresses */}
        <Card>
          <CardHeader className="pt-5">
            <h2 className="font-display text-2xl tracking-[-0.03em] text-foreground">Direcciones</h2>
          </CardHeader>
          <CardContent className="space-y-2 pb-5">
            {accountSnapshot.addresses.map((address) => (
              <div key={address} className="rounded-md bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
                {address}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Orders */}
        <Card>
          <CardHeader className="pt-5">
            <h2 className="font-display text-2xl tracking-[-0.03em] text-foreground">Pedidos recientes</h2>
          </CardHeader>
          <CardContent className="space-y-2 pb-5">
            {accountSnapshot.orders.map((order) => (
              <div key={order.number} className="flex items-center gap-3 rounded-md bg-secondary/50 px-4 py-3">
                <span className="text-sm font-medium text-foreground">{order.number}</span>
                <span className="text-xs text-muted-foreground">{order.date}</span>
                <Badge variant="outline" className="ml-auto">{order.status}</Badge>
                <span className="text-sm font-medium text-foreground">{order.total}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions */}
      <div>
        <h2 className="font-display text-2xl tracking-[-0.03em] text-foreground">Suscripciones</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {accountSnapshot.subscriptions.map((subscription) => (
            <Card key={subscription.name} className="border-l-2 border-l-primary">
              <CardContent className="space-y-4 py-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl tracking-[-0.03em] text-foreground">{subscription.name}</h3>
                  <Badge variant={subscription.status === "Activa" ? "default" : "outline"}>{subscription.status}</Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Proximo cobro: {subscription.nextCharge}</p>
                  <p>Proximo envio: {subscription.nextShipment}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Pausar</Button>
                  <Button variant="ghost" size="sm">Cancelar</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
