import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () =>
      import(
        /* webpackChunkName: "authentication" */ '../views/authentication/Index.vue'
      ),
    children: [
      {
        path: '',
        name: 'Login',
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ '../views/authentication/Login.vue'
          )
      },
      {
        path: 'register',
        name: 'Register',
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ '../views/authentication/Register.vue'
          )
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ '../views/authentication/ForgotPassword.vue'
          )
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () =>
          import(
            /* webpackChunkName: "authentication" */ '../views/authentication/ResetPassword.vue'
          )
      }
    ]
  },
  {
    path: '/admin',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/admin/Home.vue'),
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/admin/Home.vue')
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: () =>
          import(/* webpackChunkName: "users" */ '../views/admin/Profile.vue')
      },
      {
        path: 'tables',
        name: 'AdminTables',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/admin/Tables.vue'
          )
      },
      {
        path: 'forms',
        name: 'Forms',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/admin/Forms.vue')
      }
    ]
    // meta: { requiresAuth: true },
  },
  {
    path: '/error',
    component: () =>
      import(/* webpackChunkName: "errors" */ '../views/errors/Index.vue'),
    children: [
      {
        path: 'forbidden',
        name: 'Forbidden',
        component: () =>
          import(
            /* webpackChunkName: "errors" */ '../views/errors/Forbidden.vue'
          )
      },
      {
        path: 'unauthorized',
        name: 'Unauthorized',
        component: () =>
          import(
            /* webpackChunkName: "errors" */ '../views/errors/Unauthorized.vue'
          )
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        component: () =>
          import(
            /* webpackChunkName: "errors" */ '../views/errors/PageNotFound.vue'
          )
      },
      {
        path: 'internal-server-error',
        name: 'InternalServerError',
        component: () =>
          import(
            /* webpackChunkName: "errors" */ '../views/errors/InternalServerError.vue'
          )
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
  // ,
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})

export default router

export function useRouter () {
  return router
}
