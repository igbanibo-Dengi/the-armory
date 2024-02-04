import LoadoutForm from "@/components/shared/LoadoutForm";
// import EventForm from "@/components/ui/shared/EventForm";
// import { getEventById } from "@/lib/actions/event.action";
import { getLoadoutId } from "@/lib/actions/loadout.actions";
import { auth } from "@clerk/nextjs";

type UpdateLoadoutProps = {
    params: {
        id: string;
    };
};

const UpdateLoadout = async ({ params: { id } }: UpdateLoadoutProps) => {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;
    const loadout = await getLoadoutId(id);

    return (
        <>
            <section className="container py-5 md:py-10">
                <h3 className="text-2xl font-bold text-center sm:text-left">
                    Update Loadout
                </h3>
            </section>

            <div className="container my-8">
                <LoadoutForm
                    type="Update"
                    loadout={loadout}
                    loadoutId={loadout._id}
                    userId={userId}
                />
            </div>
        </>
    );
};

export default UpdateLoadout;
