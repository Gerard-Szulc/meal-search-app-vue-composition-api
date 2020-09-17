import {reactive, toRefs} from '@vue/composition-api';
import {store} from '../store/index'

export function useHandleMeals () {
    const state = reactive({
        search: '',
        loading: false,
        meals: [],
        searchChanged: true
    })

        async function getMeals(searchTerm = '') {
            state.loading = true
            const MEAL_API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
            try {
                if (state.searchChanged === false) {
                    return
                }

                let response = await fetch(MEAL_API_URL)
                let jsonResponse = await response.json()
                state.meals = jsonResponse.meals ? jsonResponse.meals : []
                await store.commit('SET_MEALS', jsonResponse.meals)
                state.loading = false;
                state.searchChanged = false
            } catch (e) {
                console.error(e)
            }
        }

        return {
            state: toRefs(state),
            // eslint-disable-next-line no-unused-vars
            handleSearch (searchTerm) {
                state.loading = true;
                state.search = searchTerm;
                getMeals(searchTerm)
            },
            searchChangedHandler () {
                state.searchChanged = true
            },
            getMeals
        }
}
