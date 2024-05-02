import type { PageServerLoad } from "./$types"

export const load = (({ locals, url }) => {
    return {
        meta: {
            title: 'Register new entries'
        }
    }
}) satisfies PageServerLoad