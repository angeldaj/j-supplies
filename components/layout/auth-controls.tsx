import Link from "next/link";

import { LogoutButton } from "@/components/layout/logout-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";

export async function AuthControls() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return (
      <Button size="sm" render={<Link href="/login" />}>
        Iniciar sesion
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-3 md:flex">
        <Badge variant="secondary">{session.user.role === "ADMIN" ? "Admin" : "Cuenta"}</Badge>
        <Link href={session.user.role === "ADMIN" ? "/admin" : "/account"} className="text-sm text-muted-foreground hover:text-foreground">
          {session.user.email}
        </Link>
      </div>
      <LogoutButton />
    </div>
  );
}
