import Image from "next/image";
import Link from "next/link";
import { EMPRESA } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Logotipo completo del cliente (PNG transparente). Solo sobre fondos claros:
 * el gris de «DISTRIBUIDORA» no tiene contraste suficiente sobre oscuro.
 */
export function Logo({ className, preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Image
      src="/brand/logo.png"
      alt="ESCRISUR Distribuidora — Materiales de escritorio y ferretería"
      width={1154}
      height={263}
      preload={preload}
      className={cn("h-auto w-auto", className)}
    />
  );
}

/**
 * Versión compacta: icono del logo + nombre en texto vivo.
 * Funciona en cualquier fondo y a cualquier tamaño.
 */
export function Marca({
  tono = "claro",
  className,
  conEnlace = true,
}: {
  tono?: "claro" | "oscuro";
  className?: string;
  conEnlace?: boolean;
}) {
  const contenido = (
    <>
      <Image
        src="/brand/logo-icono.png"
        alt=""
        width={241}
        height={251}
        className="size-11 flex-none"
      />
      <span className="leading-none">
        <span className="block font-heading text-[1.55rem] font-black tracking-[-0.03em]">
          <span className={tono === "claro" ? "text-primary-bright" : "text-on-dark-teal"}>ESCRI</span>
          <span className="text-accent">SUR</span>
        </span>
        <span
          className={cn(
            "mt-1 block font-heading text-[0.58rem] font-bold uppercase tracking-[0.42em]",
            tono === "claro" ? "text-text-light" : "text-on-dark-muted",
          )}
        >
          {EMPRESA.descriptor}
        </span>
      </span>
    </>
  );

  if (!conEnlace) return <span className={cn("flex items-center gap-3", className)}>{contenido}</span>;

  return (
    <Link href="/" aria-label={`${EMPRESA.marca}, ir al inicio`} className={cn("flex flex-none items-center gap-3", className)}>
      {contenido}
    </Link>
  );
}
