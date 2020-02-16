export const actions = {
    async getMeals({commit, state}, searchTerm = '') {
        const MEAL_API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
        try {
            if (state.searchChanged === false) {
                return
            }
            commit('SET_MEALS_LOADING')
            let response = await fetch(MEAL_API_URL)
            let jsonResponse = await response.json()
            console.log('meals loaded vuex')
            await commit('SET_MEALS', jsonResponse.meals ? jsonResponse.meals : [])
            commit('SET_MEALS_LOADED')
            commit('SET_MEALS_SEARCH_CHAMGED_RESET')
        } catch (e) {
            console.error(e)
        }
    }
}
