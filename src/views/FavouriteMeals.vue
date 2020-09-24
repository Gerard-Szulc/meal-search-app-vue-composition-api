<template>
  <div id="" class="" v-if="user.hasOwnProperty('uid')">
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
  <div v-else>
    <SignIn />

  </div>

</template>

<script>
import {store} from '../store/index'
import Meal from '../components/Meal.vue';
import { computed } from "@vue/composition-api";
import SignIn from "@/components/SignIn.vue";

export default {
  components: {
    SignIn,
    Meal
  },
  name: "FavouriteMeals",
  setup() {
    let favourites = computed(() => store.state.user.favourites)
    let user = computed(() => store.state.user.user)

    return {
      favourites,
      user
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
