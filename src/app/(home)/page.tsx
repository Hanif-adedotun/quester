import Image from "next/image";
import Link from "next/link";
import { Hero } from "~/components/ui/animated-hero";
import CommandSearch from "~/components/ui/commandSearch";
import { ContainerScroll } from "~/components/ui/container-scroll-animation";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { NavBar } from "~/components/ui/tubelight-navbar";
import { Home, User, Briefcase, FileText } from "lucide-react";

export default async function HomePage() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
   const commands = [
     { value: "calendar", label: "Calendar" },
     { value: "search-emoji", label: "Search Emoji" },
     { value: "calculator", label: "Calculator" },
   ];

  // void api.post.getLatest.prefetch();
  // You can prefetch any important details for the homepage

    const navItems = [
      { name: "Home", url: "#", icon: "Home" },
      { name: "About", url: "#", icon: "User" },
      { name: "Projects", url: "#", icon: "Briefcase" },
      { name: "Resume", url: "#", icon: "FileText" },
    ];
  return (
    <HydrateClient>
      <div className="flex flex-col overflow-hidden">
        <NavBar items={navItems} />
        <Hero />
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto h-full rounded-2xl object-cover object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </HydrateClient>
  );
}
