<template>
    <div>
        <SearchComponent :search="state.search" @search="handleSearch"/>
        <p class="App-intro">Searching for meals by ingredient</p>
        <!--        <div class="movies" style="display: flex; flex-wrap: wrap;">-->
        <v-row>
            <v-col cols="12" sm="12" offset-sm="">
                <v-card>
                    <v-container fluid>
                        <v-row>
                            <v-col
                                    v-for="meal in state.meals"
                                    :key="`container-${meal.idMeal}`"
                                    class="d-flex child-flex"
                                    cols="3"
                            >
                                <Meal :meal="meal"/>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <!--        </div>-->
    </div>

</template>

<script>
    import SearchComponent from '../components/Search.vue';
    import Meal from '../components/Meal.vue';
    import {reactive, onMounted} from '@vue/composition-api';

    export default {
        components: {SearchComponent, Meal},
        name: "Search",
        setup() {
            const state = reactive({
                search: '',
                loading: true,
                meals: []
            });

            async function getMeals(searchTerm) {
                const MEAL_API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;

                let response = await fetch(MEAL_API_URL)

                // const sortAlphaNum = (a, b) => a.strMeal.localeCompare(b.strMeal, 'en', { numeric: true });
                let jsonResponse = await response.json()
                // eslint-disable-next-line no-console
                console.log(jsonResponse)
                state.meals = jsonResponse.meals
                state.loading = false;

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

<style>
    /*.placeholder-container {*/
    /*    height: 100%;*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*}*/
</style>
