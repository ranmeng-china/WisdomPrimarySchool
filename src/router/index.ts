import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LevelMap from '../views/LevelMap.vue';
import LevelDetail from '../views/LevelDetail.vue';
import Play from '../views/Play.vue';
import WriteBook from '../views/WriteBook.vue';
import Mistakes from '../views/Mistakes.vue';
import Parents from '../views/Parents.vue';
import Settings from '../views/Settings.vue';
import PetHouse from '../views/PetHouse.vue';
import ExchangeGame from '../views/ExchangeGame.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/map', name: 'LevelMap', component: LevelMap },
  { path: '/level/:id', name: 'LevelDetail', component: LevelDetail },
  { path: '/play/:levelId', name: 'Play', component: Play },
  { path: '/write', name: 'WriteBook', component: WriteBook },
  { path: '/mistakes', name: 'Mistakes', component: Mistakes },
  { path: '/parents', name: 'Parents', component: Parents },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/pet', name: 'PetHouse', component: PetHouse },
  { path: '/exchange', name: 'ExchangeGame', component: ExchangeGame },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
