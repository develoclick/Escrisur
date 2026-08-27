import { Header, Topbar } from "@/components/site/header";
import { About, Hero, Productos } from "@/components/site/sections-top";
import { Areas, Estadisticas, Servicios } from "@/components/site/sections-mid";
import { Cotizacion } from "@/components/site/cotizacion";
import {
  CtaFinal,
  Footer,
  Licitaciones,
  Proceso,
} from "@/components/site/sections-end";

export default function Home() {
  return (
    <>
      {/* 01 · cabecera */}
      <Topbar />
      <Header />

      <main id="main" className="flex-1">
        {/* 02 · hero */}
        <Hero />
        {/* 03 · presentación */}
        <About />
        {/* 04 · productos */}
        <Productos />
        {/* 05 · servicios */}
        <Servicios />
        {/* 06 · cifras */}
        <Estadisticas />
        {/* 07 · áreas de atención */}
        <Areas />
        {/* 08 · formulario de cotización */}
        <Cotizacion />
        {/* 09 · proceso */}
        <Proceso />
        {/* 10 · sector público */}
        <Licitaciones />
        {/* 11 · llamada final */}
        <CtaFinal />
      </main>

      {/* 12 · pie */}
      <Footer />
    </>
  );
}
