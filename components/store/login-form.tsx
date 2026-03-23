"use client";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        startTransition(async () => {
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl,
          });

          if (!result || result.error) {
            setError("Correo o contraseña invalidos.");
            return;
          }

          router.push(result.url ?? callbackUrl);
          router.refresh();
        });
      }}
    >
      <label className="grid gap-1.5 text-sm text-muted-foreground">
        Correo
        <Input required name="email" type="email" autoComplete="email" placeholder="correo@ejemplo.com" />
      </label>

      <label className="grid gap-1.5 text-sm text-muted-foreground">
        Contraseña
        <Input required name="password" type="password" autoComplete="current-password" placeholder="********" />
      </label>

      {error ? (
        <p className="rounded-md border border-destructive/20 bg-destructive/8 px-4 py-3 text-sm text-destructive">{error}</p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? "Ingresando..." : "Iniciar sesion"}
      </Button>
    </form>
  );
}
