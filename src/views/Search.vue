<template>
  <div id="" class="">
    <v-container
        id="my-view"
        v-if="$route.name === 'meals_list'">
      <v-row class="">
        <v-col
            v-for="meal in meals.meals"
            :key="`container-${meal.idMeal}`"
            class="col-md-3 col-xs-6"
        >
          <Meal :meal="meal"/>
        </v-col>
      </v-row>
    </v-container>
    <router-view @meal-loaded="() => $emit('meal-loaded')" v-else></router-view>

  </div>

</template>

<script>
import {store} from '../store/index'
import Meal from '../components/Meal.vue';

export default {
  components: {
    Meal
  },
  name: "Search",
  setup() {
    return {
      meals: store.state.meals,
      searchState: store.state.searchState,
      // eslint-disable-next-line no-unused-vars
      handleSearch(searchTerm) {
        // $attrs.handleSearch(searchTerm)
      }
    };
  }
}
</script>

<style>
</style>
