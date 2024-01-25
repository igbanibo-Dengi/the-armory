"use client"

import LoadoutForm from "@/components/shared/LoadoutForm"



const CreatePage = () => {

    return (
        <main>
            <section className="container mt-20">
                <p className="text-2xl text-center font-semibold"> Build Your Loadout</p>
            </section>
            <section>
                <LoadoutForm />
            </section>
        </main>
    )
}

export default CreatePage