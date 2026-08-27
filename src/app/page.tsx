import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { MainProject } from "@/components/sections/MainProject";
import { SideProjects } from "@/components/sections/SideProjects";
import { Info } from "@/components/sections/Info";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <SelectedWork />
        <MainProject />
        <SideProjects />
        <Info />
      </main>
      <div id="page-end" aria-hidden="true" />
      <Footer />
    </>
  );
}
