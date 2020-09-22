<template>
  <div v-if="state.meal">
    <div class="meal-details">
      <div>
        <h2>{{ state.meal.strMeal }}</h2>
        <v-responsive class="resp-container meal-thumb">
          <iframe
            class="resp-iframe"
            :src="youtubeSrc"
            :poster="state.meal.strMealThumb"
            frameborder="0"
            gesture="media"
            allow="encrypted-media"
            allowfullscreen
          ></iframe>
        </v-responsive>
        <p class="meal-description">{{ state.meal.strInstructions }}</p>
      </div>

      <div v-if="state.ingredients.length !== 0">
        <h4>Ingredients:</h4>
        <div class="ingredients-container">
          <template v-for="ingredient in state.ingredients">
            <div
              :title="ingredient.amount + ': ' + ingredient.name"
              class="ingredient"
              v-if="ingredient.name && ingredient.name.length !== 0"
              :key="ingredient.ingredientId"
            >
              <div>
                <div class="ingredients-title">{{ ingredient.amount }}</div>
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
            </div>
          </template>
        </div>
      </div>
    </div>
<!--    <InArticleAdsense-->
<!--        data-ad-client="ca-pub-9105228405994491"-->
<!--        data-ad-slot="1234567890">-->
<!--    </InArticleAdsense>-->
  </div>
</template>

<script>
import { reactive, onMounted, computed } from "@vue/composition-api";

export default {
  name: "MealDetails",
  setup(props, context) {
    const state = reactive({
      loading: true,
      meal: {},
      ingredients: [],
    });
    const youtubeSrc = computed(
      () =>
        state &&
        state.meal &&
        state.meal.strYoutube &&
        state.meal.strYoutube.split("watch?v=").join("embed/")
    );

    function getMeal(id) {
      const MEAL_API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

      fetch(MEAL_API_URL)
        .then((response) => response.json())
        .then((jsonResponse) => {
          state.meal = jsonResponse.meals[0];
          context.root.$root.$store.commit("SET_PARALAX", {
            src: state.meal.strMealThumb,
            title: state.meal.strMeal,
          });
          context.root.$root.$store.commit("SET_SAVED_DYNAMIC_BREADCRUMBS", {
            routeName: context.root._route.name,
            title: state.meal.strMeal,
          });
          context.emit("meal-loaded");
          state.ingredients = Object.entries(state.meal)
            .filter(([key]) => key.includes("strIngredient"))
            .map(([key, value]) => {
              return {
                ingredientId: key.slice("strIngredient".length),
                name: value,
              };
            })
            .map((element) => {
              element.amount = state.meal[`strMeasure${element.ingredientId}`];
              return element;
            });
          state.loading = false;
        });
    }

    onMounted(() => {
      if (context.root._route.name === 'meal' || context.root._route.name === 'favouriteMeal') {
        getMeal(context.root._route.params.id);
      }
    });

    return {
      state,
      youtubeSrc,
    };
  },
};
</script>

<style scoped>
.meal-thumb {
  width: 30%;
}

.meal-details {
  padding: 20px 0;
  display: flex;
  flex-direction: row;
}

.ingredients-container {
  padding: 10px;
}

.ingredients-container > div {
  float: left;
  width: 33%;
}

.ingredients-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meal-description {
  /*width: 70%;*/
}

.meal-details > div:first-child {
  width: 70%;
}

.meal-details > div:nth-child(2) {
  width: 30%;
}

.resp-container {
  float: left;
  height: 50%;
  margin: 0 20px 0 0;
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
