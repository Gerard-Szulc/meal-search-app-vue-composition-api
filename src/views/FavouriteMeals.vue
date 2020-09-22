<template>
  <div id="" class="">
    <v-container
        id="favourites-view"
        v-if="$route.name === 'favourites'">
      <v-row class="">
        <v-col
            v-for="meal in favourites"
            :key="`container-${meal.idMeal}`"
            class="col-md-3 col-xs-6"
        >
          <Meal :meal="meal" :push-dest="'favouriteMeal'"/>
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
  name: "FavouriteMeals",
  setup() {
    return {
      favourites: store.state.user.favourites,
      // searchState: store.state.searchState,
      // // eslint-disable-next-line no-unused-vars
      // handleSearch(searchTerm) {
      //   // $attrs.handleSearch(searchTerm)
      // }
    };
  }
}
</script>

<style>
</style>
