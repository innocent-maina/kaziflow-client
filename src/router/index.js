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
      import(/* webpackChunkName: "dashboard" */ '../views/admin/Index.vue'),
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
        path: 'employees',
        name: 'AdminEmployees',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/admin/Employees.vue'
          )
      },
      {
        path: 'projects',
        name: 'AdminProjects',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/admin/Projects.vue')
      },
      {
        path: 'tasks',
        name: 'AdminTasks',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/admin/Tasks.vue')
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/admin/Settings.vue')
      },
      {
        path: 'teams',
        name: 'AdminTeams',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/admin/Teams.vue')
      },
      {
        meta: {
          title: 'Edit Employee'
        },
        path: '/employee/:id',
        name: 'employee.edit',
        component: () => import(/* webpackChunkName: "client-form" */ '@/components/forms/EmployeesForm.vue'),
        props: true
      },
      {
        meta: {
          title: 'New Employee'
        },
        path: '/employee/new',
        name: 'employee.new',
        component: () => import(/* webpackChunkName: "client-form" */ '@/components/forms/EmployeesForm.vue')
      },
      {
        meta: {
          title: 'Edit Project'
        },
        path: '/project/:id',
        name: 'project.edit',
        component: () => import(/* webpackChunkName: "client-form" */ '@/components/forms/ProjectsForm.vue'),
        props: true
      },
      {
        meta: {
          title: 'New Project'
        },
        path: '/project/new',
        name: 'project.new',
        component: () => import(/* webpackChunkName: "client-form" */ '@/components/forms/ProjectsForm.vue')
      },
      {
        meta: {
          title: 'Edit Team'
        },
        path: '/team/:id',
        name: 'team.edit',
        component: () => import(/* webpackChunkName: "team-form" */ '@/components/forms/TeamForm.vue'),
        props: true
      },
      {
        meta: {
          title: 'New Team'
        },
        path: '/team/new',
        name: 'team.new',
        component: () => import(/* webpackChunkName: "team-form" */ '@/components/forms/TeamForm.vue')
      },
      {
        meta: {
          title: 'Edit Task'
        },
        path: '/task/:id',
        name: 'task.edit',
        component: () => import(/* webpackChunkName: "task-form" */ '@/components/forms/TasksForm.vue'),
        props: true
      },
      {
        meta: {
          title: 'New Task'
        },
        path: '/task/new',
        name: 'task.new',
        component: () => import(/* webpackChunkName: "task-form" */ '@/components/forms/TasksForm.vue')
      }
    ]
  },
  {
    path: '/employee',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/employee/Index.vue'),
    children: [
      {
        path: '',
        name: 'EmployeeDashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/employee/Home.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () =>
          import(/* webpackChunkName: "users" */ '../views/employee/Profile.vue')
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/employee/Projects.vue')
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/employee/Tasks.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/employee/Settings.vue')
      },
      {
        path: 'teams',
        name: 'Teams',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/employee/Teams.vue')
      },
      {
        meta: {
          title: 'Edit Project'
        },
        path: '/project/:id',
        name: 'project.edit',
        component: () => import(/* webpackChunkName: "client-form" */ '@/components/forms/ProjectsForm.vue'),
        props: true
      },
      {
        meta: {
          title: 'New Project'
        },
        path: '/project/new',
        name: 'project.new',
        component: () => import(/* webpackChunkName: "client-form" */ '@/components/forms/ProjectsForm.vue')
      },
      {
        meta: {
          title: 'Edit Team'
        },
        path: '/team/:id',
        name: 'team.edit',
        component: () => import(/* webpackChunkName: "team-form" */ '@/components/forms/TeamForm.vue'),
        props: true
      },
      {
        meta: {
          title: 'New Team'
        },
        path: '/team/new',
        name: 'team.new',
        component: () => import(/* webpackChunkName: "team-form" */ '@/components/forms/TeamForm.vue')
      },
      {
        meta: {
          title: 'Edit Task'
        },
        path: '/task/:id',
        name: 'task.edit',
        component: () => import(/* webpackChunkName: "task-form" */ '@/components/forms/TasksForm.vue'),
        props: true
      },
      {
        meta: {
          title: 'New Task'
        },
        path: '/task/new',
        name: 'task.new',
        component: () => import(/* webpackChunkName: "task-form" */ '@/components/forms/TasksForm.vue')
      }
    ]
  },
  {
    path: '/error',
    // component: () =>
    //   import(/* webpackChunkName: "errors" */ '../views/errors/Index.vue'),
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
        name: 'ServerError',
        component: () =>
          import(
            /* webpackChunkName: "errors" */ '../views/errors/ServerError.vue'
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
