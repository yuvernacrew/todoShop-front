import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _002fc4e0 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _6e6d4580 = () => interopDefault(import('../pages/registar.vue' /* webpackChunkName: "pages/registar" */))
const _368821c9 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _002fc4e0,
    name: "login"
  }, {
    path: "/registar",
    component: _6e6d4580,
    name: "registar"
  }, {
    path: "/",
    component: _368821c9,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
