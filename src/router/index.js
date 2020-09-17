import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
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

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
