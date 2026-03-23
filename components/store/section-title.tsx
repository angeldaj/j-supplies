import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl space-y-4">
        <p className="editorial-kicker">{eyebrow}</p>
        <h2 className="font-display text-4xl leading-[0.96] tracking-[-0.04em] text-foreground md:text-5xl">{title}</h2>
        <p className="editorial-copy">{description}</p>
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
      <Separator />
    </div>
  );
}
