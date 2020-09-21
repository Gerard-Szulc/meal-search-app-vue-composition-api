export const mutations = {
    SET_USER: (state, payload) => {
        state.user = payload
    },
    SIGN_OUT_USER: (state) => {
        state.user = {}
    },
    SET_FAVOURITES: (state, payload) => {
        state.favourites = payload
    }
    // SET_MEALS_LOADING: (state) => {
    //     state.loading = true
    // },
    // SET_MEALS_LOADED: (state) => {
    //     state.loading = false
    // },
    // SET_MEALS_SEARCH_CHANGED: (state) => {
    //     state.searchChanged = true
    // },
    // SET_MEALS_SEARCH_CHAMGED_RESET: (state) => {
    //     state.searchChanged = false
    // },
    // SET_PARALAX: (state, payload) => {
    //     state.paralax = payload
    // },
    // SET_SAVED_DYNAMIC_BREADCRUMBS: (state, payload) => {
    //     let temp = state.savedDynamicBreadcrumbs
    //     temp[payload.routeName] = payload.title
    //     state.savedDynamicBreadcrumbs = temp
    // }
}
