import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { SpecReader } from "@/components/site/spec-reader";
import { Wall } from "@/components/site/wall";
import { Marques } from "@/components/site/marques";
import { Visit } from "@/components/site/visit";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <SpecReader />
      <Wall />
      <Marques />
      <Visit />
    </main>
  );
}
