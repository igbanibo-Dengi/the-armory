import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ceaser } from "../font";

export default function Home() {
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
            <Button asChild size="lg">
              <Link href='/'>
                Build
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
