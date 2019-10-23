<template>
    <div>
        <SearchComponent :search="state.search" @search="handleSearch" />
        <p class="App-intro">Searching for meals by ingredient</p>
        <div class="movies" style="display: flex; flex-wrap: wrap;">
            <Meal v-for="meal in state.meals" :meal="meal" :key="meal.idMeal" />
        </div>
    </div>

</template>

<script>
    import SearchComponent from '../components/Search.vue';
    import Meal from '../components/Meal.vue';
    import { reactive, onMounted } from '@vue/composition-api';

    export default {
        components: { SearchComponent, Meal },
        name: "Search",
        setup() {
            const state = reactive({
                search: '',
                loading: true,
                meals: []
            });

            function getMeals (searchTerm) {
                const MEAL_API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;

                fetch(MEAL_API_URL)
                    .then(response => response.json())
                    .then(jsonResponse => {
                        // const sortAlphaNum = (a, b) => a.strMeal.localeCompare(b.strMeal, 'en', { numeric: true });

                        // eslint-disable-next-line no-console
                        console.log(jsonResponse)
                        state.meals = jsonResponse.meals
                        state.loading = false;
                    });
            }
            onMounted(() => {
                getMeals('')
            });

            return {
                state,
                // eslint-disable-next-line no-unused-vars
                handleSearch(searchTerm) {
                    state.loading = true;
                    state.search = searchTerm;
                    getMeals(searchTerm)
                },

            };
        }
    }
</script>

<style scoped>

</style>
