import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('@/views/login.vue')
const home = () => import('@/views/home.vue')
const approve = () => import('@/views/home/approve.vue')
const invite = () => import('@/views/home/invite.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    children: [
      {
        path: '/',
        redirect:'approve'
      },
      {
        path: 'approve',
        component:approve
      },
      {
        path: 'invite',
        component:invite
      }
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.path==='/login') return next()
  const tokenStr=window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
