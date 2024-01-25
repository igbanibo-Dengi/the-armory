
import { SignIn } from "@clerk/nextjs";

export default function page() {
    return (
        <main className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-black bg-cover bg-center bg-[url('/hero3.jpg')]">
            <SignIn />
        </main>
    );
}
