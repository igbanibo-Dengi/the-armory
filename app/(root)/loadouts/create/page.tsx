import LoadoutForm from "@/components/shared/LoadoutForm"
import { auth } from "@clerk/nextjs"



const CreatePage = () => {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    console.log(userId);


    return (
        <main>
            <section className="container mt-20">
                <p className="text-2xl text-center font-semibold"> Build Your Loadout</p>
            </section>
            <section>
                <LoadoutForm userId={userId} type='Create' />
            </section>
        </main>
    )
}

export default CreatePage