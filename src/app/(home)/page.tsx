import Link from "next/link";
import CommandSearch from "~/components/ui/commandSearch";

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        Duty Rate
        <CommandSearch commands={commands} className="w-1/2"/>
      </main>
    </HydrateClient>
  );
}
