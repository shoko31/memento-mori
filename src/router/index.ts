import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from '../views/CalendarView.vue'

export const enum RouteNames {
  HOME = 'Home',
  CALENDAR = 'Calendar'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.HOME,
      component: HomeView
    },
    {
      path: '/calendar',
      name: RouteNames.CALENDAR,
      component: CalendarView
    }
  ]
})

export default router
