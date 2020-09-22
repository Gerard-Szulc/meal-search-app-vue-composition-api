import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import FavouriteMeals from "@/views/FavouriteMeals.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'meals_list',
    component: Search,
    meta: {
      title: 'Meals list',
    },
    children: [
      {
        path: '/:id',
        name: 'meal',
        meta: {
          dynamicTitle: true,
          title: 'Meal',
        },
        component: () => import('../views/MealDetails.vue')
      }
    ]
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: FavouriteMeals,
    meta: {
      title: 'Favourite meals list',
    },
    children: [
      {
        path: '/favourites/:id',
        name: 'favouriteMeal',
        meta: {
          dynamicTitle: true,
          title: 'Meal',
        },
        component: () => import('../views/MealDetails.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
