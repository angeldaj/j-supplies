import { redirect } from "next/navigation";

import { LoginForm } from "@/components/store/login-form";
import { MediaFrame } from "@/components/shared/media-frame";
import { Badge } from "@/components/ui/badge";
import { getServerAuthSession } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await getServerAuthSession();
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/account";

  if (session?.user) {
    redirect(session.user.role === "ADMIN" ? "/admin" : callbackUrl);
  }

  return (
    <div className="page-shell py-10 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="hidden lg:block">
          <MediaFrame
            src="https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=1400&q=80"
            alt="Productos de cuidado personal"
            priority
            className="aspect-[3/4]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <Badge variant="outline" className="w-fit">Acceso protegido</Badge>
          <h1 className="mt-4 font-display text-4xl leading-[0.92] tracking-[-0.04em] text-foreground md:text-5xl">
            Iniciar sesion
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Accede a tu cuenta para ver pedidos, suscripciones y gestionar tus datos.
          </p>
          <div className="mt-8">
            <LoginForm callbackUrl={callbackUrl} />
          </div>
          <div className="mt-6 rounded-md bg-secondary/50 px-4 py-3 text-xs text-muted-foreground">
            <span className="font-medium">Demo:</span> angeljanton@gmail.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
}
