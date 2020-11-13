<template>
    <v-hover
            v-slot:default="{ hover }"
    >
        <v-card
                @click="() => $router.push({name: pushDest, params: {id: meal.idMeal}})"
                class="mx-auto"
                :elevation="hover ? 16 : 2"
        >
            <v-lazy
                    v-model="meal.isActive"
                    :options="{
                                threshold: 0.6
                            }"
                    min-height="200"
                    transition="fade-transition"
            >
                <v-img
                        :src="meal.strMealThumb"
                        :lazy-src="`${meal.strMealThumb}/preview`"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        :transition="'fade-transition'"
                >
                    <template v-slot:placeholder>
                        <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                        >
<!--                        <div class="placeholder-container">-->
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
<!--                        </div>-->
                        </v-row>
                    </template>
                </v-img>
            </v-lazy>
            <v-card-text class="text--primary">
                <div class="meal-title">{{ meal.strMeal }}</div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
    import {computed} from '@vue/composition-api';

    export default {
        name: "Meal",
        props: ['meal', 'pushDest'],
        setup({meal }) {
            const altText = computed(() => `${meal.strMeal}`);
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
