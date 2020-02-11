<template>
    <div v-if="state.meal">
        <h2>{{state.meal.strMeal}}</h2>
        <img class="meal-thumb" :src="state.meal.strMealThumb" :alt="state.meal.strMeal">
        <div>
            {{state.meal.strInstructions}}
        </div>
        <div v-if="state.ingredients.length !== 0">
            <h4>Ingredients: </h4>
            <template v-for="ingredient in state.ingredients">
                <v-row v-if="ingredient.name && ingredient.name.length !== 0" :key="ingredient.ingredientId">
                    <v-col cols="1">
                        <div><span>{{ ingredient.name }}: {{ ingredient.amount }}</span>
                            <v-img
                                    :src="`https://www.themealdb.com/images/ingredients/${ingredient.name}-Small.png`"
                                    :lazy-src="`https://www.themealdb.com/images/ingredients/${ingredient.name}-Small.png`"
                                    aspect-ratio="1"
                                    class="grey lighten-2"
                            >
                                <template v-slot:placeholder>
                                    <div class="placeholder-container">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </div>
                                </template>
                            </v-img>
                        </div>
                    </v-col>
                </v-row>

            </template>
        </div>

    </div>
</template>

<script>
    import {reactive, onMounted} from '@vue/composition-api';

    export default {
        name: "MealDetails",
        setup(props, context) {
            const state = reactive({
                loading: true,
                meal: {},
                ingredients: []
            });

            function getMeal(id) {
                const MEAL_API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

                fetch(MEAL_API_URL)
                    .then(response => response.json())
                    .then(jsonResponse => {
                        // const sortAlphaNum = (a, b) => a.strMeal.localeCompare(b.strMeal, 'en', { numeric: true });

                        // eslint-disable-next-line no-console
                        console.log(jsonResponse)
                        state.meal = jsonResponse.meals[0]
                        state.ingredients = Object.entries(state.meal)
                            // eslint-disable-next-line no-unused-vars
                            .filter(([key, value], index) => key.includes('strIngredient'))
                            .map(([key, value]) => {
                                return {
                                    ingredientId: key.slice('strIngredient'.length),
                                    name: value
                                }
                            }).map(element => {
                                element.amount = state.meal[`strMeasure${element.ingredientId}`]
                                return element
                            })
                        state.loading = false;
                    });
            }

            onMounted(() => {
                getMeal(context.root._route.params.id)
            });

            return {
                state
            };
        }

    }
</script>

<style scoped>
    .meal-thumb {
        height: 20%;
        width: 20%;
    }
</style>
