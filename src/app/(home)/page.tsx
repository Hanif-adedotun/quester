import Image from "next/image";
import Link from "next/link";
import CommandSearch from "~/components/ui/commandSearch";
import { ContainerScroll } from "~/components/ui/container-scroll-animation";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
   const commands = [
     { value: "calendar", label: "Calendar" },
     { value: "search-emoji", label: "Search Emoji" },
     { value: "calculator", label: "Calculator" },
   ];

  // void api.post.getLatest.prefetch();
  // You can prefetch any important details for the homepage

  return (
    <HydrateClient>
        <div className="flex flex-col overflow-hidden">
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
