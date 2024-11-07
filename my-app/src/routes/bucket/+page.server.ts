import { z } from 'zod'
import { superValidate, message } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import PocketBase from 'pocketbase'
import { SECRET_PASSWORD, SECRET_EMAIL, SECRET_URL } from '$env/static/private'


const schema = z.object({
    Activity: z.string(),
	Location: z.string(),
	Category: z.string(),
	LowEstimatedCost: z.number().optional(),
	MediumEstimatedCost: z.number().optional(),
	HighEstimatedCost: z.number().optional(),
	Notes: z.string(),
})

export const load = async () => {
    const pb = new PocketBase(SECRET_URL)
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD)
    const form = await superValidate(zod(schema))

    const records: Activity[] = await pb.collection("TRAVEL_ACTIVITIES").getFullList({
        sort: '-Location',
    })

    return {
        form,
        records
    }
}

export const actions = {
    saveRecord: async ({ request }) => {
        try {
            const form = await superValidate(request, zod(schema))
            // custom error checks

            let newRecord: Activity = {
                Activity: form.data.Activity,
                Location: form.data.Location,
                Category: form.data.Category,
                LowEstimatedCost: form.data.LowEstimatedCost!,
                MediumEstimatedCost: form.data.MediumEstimatedCost!,
                HighEstimatedCost: form.data.HighEstimatedCost!,
                Notes: form.data.Notes
            }

            const pb = new PocketBase(SECRET_URL)
            await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD)
            await pb.collection("TRAVEL_ACTIVITIES").create(newRecord)
        } catch (err) {
            console.error("Error saving record:", err)
        }
    }
}