<template>
  <div class="meal" @click="() => $router.push({name: 'meal', params: {id: meal.idMeal}})">
    <h2>{{ meal.strMeal }}</h2>
    <div>
      <img :alt="altText" :src="meal.strMealThumb" />
    </div>
    <p>id: {{ meal.idMeal }}</p>
  </div>
</template>

<script>
  import { computed } from '@vue/composition-api';

  export default {
    name: "Meal",
    props: ['meal'],
    setup({ meal }) {
      const altText = computed(() => `The movie titled: ${meal.strMeal}`);

      return { altText };
    }
  };
</script>
<style scoped>
  .meal {
    max-height: 20%;
    max-width: 20%;
  }
  @media screen and (max-width: 1366px) {
    .meal {
      max-width: 100%;
    }
  }

  .meal img {
    max-width: 100%;
  }
</style>
