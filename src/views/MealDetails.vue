<template>
    <div v-if="state.meal" >
        <h2>{{state.meal.strMeal}}</h2>
        <div class="meal-details">
            <section class="">
                <img class="meal-thumb" :src="state.meal.strMealThumb" :alt="state.meal.strMeal">
                <div class="resp-container meal-thumb">
                    <iframe
                            class="resp-iframe" :src="youtubeSrc" :poster="state.meal.strMealThumb" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen>
                    </iframe>
                </div>
            </section>


            <div>
                {{state.meal.strInstructions}}
            </div>
            <div v-if="state.ingredients.length !== 0">
                <h4>Ingredients: </h4>
                <template v-for="ingredient in state.ingredients">
                    <v-row v-if="ingredient.name && ingredient.name.length !== 0" :key="ingredient.ingredientId">
                        <v-col cols="8">
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


    </div>
</template>

<script>
    import {reactive, onMounted, computed} from '@vue/composition-api';

    export default {
        name: "MealDetails",
        setup(props, context) {
            const state = reactive({
                loading: true,
                meal: {},
                ingredients: []
            });
            const youtubeSrc = computed(() => state && state.meal && state.meal.strYoutube && state.meal.strYoutube.split('watch?v=').join('embed/'))

            function getMeal(id) {
                const MEAL_API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

                fetch(MEAL_API_URL)
                    .then(response => response.json())
                    .then(jsonResponse => {
                        console.log(jsonResponse)
                        state.meal = jsonResponse.meals[0]
                        state.ingredients = Object.entries(state.meal)
                            .filter(([key]) => key.includes('strIngredient'))
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
                state,
                youtubeSrc
            };
        }

    }
</script>

<style scoped>
    .meal-thumb {
        width: 100%;
    }
    .meal-details {
        display: flex;
        flex-direction: row;
    }
    .meal-details section {
        width: 30%;
    }
    .meal-details > div:nth-child(2) {
        width: 50%;
    }
    .meal-details > div:nth-child(3) {
        width: 20%;
    }
    .resp-container {
        position: relative;
        overflow: hidden;
        padding-top: 56.25%;
    }
    .resp-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }
</style>
