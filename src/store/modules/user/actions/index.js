import {initializeFirestore} from "@/firebase/init.js";

export const actions = {
    async getFavourites({commit, state}) {
        const db = initializeFirestore()

        try {
            let querySnapshot = await db.collection(`users/${state.user.uid}/favourites`).get()
                let data = {}
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    data[doc.id] = doc.data()
                });
                commit('SET_FAVOURITES', data)

        } catch (e) {
            console.error(e)
        }
    }
}
