export const actions = {
    setSearchTerm ({commit}, payload) {
        commit('SET_MEALS_SEARCH_CHANGED')
        commit('SET_SEARCH', payload)
    }
}
