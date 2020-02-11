<template>
    <v-hover
            v-slot:default="{ hover }"
    >
        <v-card
                class="mx-auto"
                :elevation="hover ? 16 : 2"
        >
            <v-img
                    :src="meal.strMealThumb"
                    :lazy-src="`${meal.strMealThumb}/preview`"
                    aspect-ratio="1"
                    class="grey lighten-2"
            >
                <template v-slot:placeholder>
                    <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                    >
<!--                    <div class="placeholder-container">-->
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
<!--                    </div>-->
                    </v-row>
                </template>
            </v-img>
            <v-card-text class="text--primary">
                <div class="meal-title">{{ meal.strMeal }}</div>
            </v-card-text>

            <v-card-actions>
                <v-btn
                        @click="() => $router.push({name: 'meal', params: {id: meal.idMeal}})"
                        color="#59C8FF"
                        text
                >
                    Explore
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<script>
    import {computed} from '@vue/composition-api';

    export default {
        name: "Meal",
        props: ['meal'],
        setup({meal }) {
            const altText = computed(() => `The movie titled: ${meal.strMeal}`);
            return {altText};
        }
    };
</script>
<style scoped>
    .meal-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
