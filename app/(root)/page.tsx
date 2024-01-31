import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ceaser } from "../font";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Collection from "@/components/shared/Collection";
import { getAllLoaddouts } from "@/lib/actions/loadout.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const loadout = await getAllLoaddouts({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  // console.log(loadout);

  return (
    <main>
      <section
        className="relative w-full h-screen bg-cover bg-center bg-[url('/hero1.jpg')]"

      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative h-full flex flex-col justify-center items-center px-4 md:px-6 text-center">
          <span className={ceaser.className}>
            <h1 className="text-4xl md:text-6xl font-semibold text-white uppercase">Welcome to The Armory</h1>
          </span>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Build. Share. Inspire.
          </p>
          <div className="flex gap-3 mt-4">
            <Button asChild size="lg">
              <Link href='/'>
                Explore
              </Link>
            </Button>
            <SignedIn>
              <Button asChild size="lg">
                <Link href='/loadouts/create'>
                  Build
                </Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <Button asChild size="lg" className='w-fit'>
                <Link href="/sign-in">Build</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
      <section className="container mt-20">
        <Collection
          data={loadout?.data}
          emptyTitle="No loadout Found"
          emptyStateSubtext="Try changing your search criteria"
          collectionType="All_Loadouts"
          limit={6}
          page={1}
          totalPages={loadout?.totalPages}
        />
      </section>
    </main >
  );
}
