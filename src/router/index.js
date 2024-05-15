import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultView from '../views/SearchResultView.vue' 
import SinglePageView from '../views/SinglePageView.vue';
import FavoritesView from '../views/FavoritesView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'SearchResult', 
    component: SearchResultView 
  },
  {
    path: '/game/:id',
    name: 'SinglePageView',
    component: SinglePageView,

  },
  {
    path: '/favorites/',
    name: 'FavoritesView',
    component: FavoritesView,
    props: true
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
