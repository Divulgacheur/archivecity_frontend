import Vue from "vue";
import Router from "vue-router";
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./components/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./components/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./components/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./components/BoardUser.vue')
    },
    {
      path: "/tutorials",
      name: "tutorial",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorial/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/tutorial/add",
      name: "tutorial-add",
      component: () => import("./components/AddTutorial")
    },

    {
      path: "/archives",
      name: "archive",
      component: () => import("./components/ArchivesList")
    },
    {
      path: "/archive/:id",
      name: "archive-details",
      component: () => import("./components/Archive")
    },
    {
      path: "/archive/add",
      name: "archive-add",
      component: () => import("./components/AddArchive")
    },
    {
      path: "/maps",
      name: "maps",
      component: () => import("./components/Maps")
    }
  ]
});
