import Image from "next/image";

import { cn } from "@/lib/utils";

export function MediaFrame({
  src,
  alt,
  label,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("photo-frame h-full min-h-64", className)}>
      <Image src={src} alt={alt} fill priority={priority} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      {label ? (
        <div className="absolute left-3 top-3 rounded-md bg-card/80 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-sm">
          {label}
        </div>
      ) : null}
    </div>
  );
}
