import PocketBase from 'pocketbase'
import { SECRET_PASSWORD, SECRET_EMAIL, SECRET_URL } from '$env/static/private'

export const load = async () => {
    const pb = new PocketBase(SECRET_URL)
    await pb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD)

    const records: Activity[] = await pb.collection('TRAVEL_ACTIVITIES').getFullList({
        sort: '-Location',
    })

    return {
        records
    }
}