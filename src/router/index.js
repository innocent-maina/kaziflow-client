import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: () =>
    import(
      /* webpackChunkName: "authentication" */
      '../views/authentication/Index.vue'
    ),
  children: [{
    path: '',
    name: 'Login',
    component: () =>
      import(
        /* webpackChunkName: "authentication" */
        '../views/authentication/Login.vue'
      )
  },
  {
    path: 'register',
    name: 'Register',
    component: () =>
      import(
        /* webpackChunkName: "authentication" */
        '../views/authentication/Register.vue'
      )
  },
  {
    path: 'forgot-password',
    name: 'ForgotPassword',
    component: () =>
      import(
        /* webpackChunkName: "authentication" */
        '../views/authentication/ForgotPassword.vue'
      )
  },
  {
    path: 'reset-password',
    name: 'ResetPassword',
    component: () =>
      import(
        /* webpackChunkName: "authentication" */
        '../views/authentication/ResetPassword.vue'
      )
  }
  ]
},
{
  path: '/admin',
  component: () =>
    import(/* webpackChunkName: "dashboard" */ '../views/admin/Index.vue'),
  children: [{
    path: '',
    name: 'AdminDashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/admin/Home.vue'),
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    path: 'profile',
    name: 'AdminProfile',
    component: () =>
      import(/* webpackChunkName: "users" */ '../views/admin/Profile.vue'),
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    path: 'employees',
    name: 'AdminEmployees',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/admin/Employees.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    path: 'projects',
    name: 'AdminProjects',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/admin/Projects.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'admin'
    }

  },
  {
    path: 'tasks',
    name: 'AdminTasks',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/admin/Tasks.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    path: 'teams',
    name: 'AdminTeams',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/admin/Teams.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'admin'
    }
  },
  {
    meta: {
      title: 'Edit Employee',
      role: 'admin',
      requiresAuth: true
    },
    path: '/admin-employee/edit/:id',
    name: 'admin-employee.edit',
    component: () =>
      import(
        /* webpackChunkName: "client-form" */
        '@/components/forms/EmployeesForm.vue'
      ),
    props: true
  },
  {
    meta: {
      title: 'New Employee',
      requiresAuth: true,
      role: 'admin'
    },
    path: '/admin-employee/new',
    name: 'admin-employee.new',
    component: () =>
      import(
        /* webpackChunkName: "client-form" */
        '@/components/forms/EmployeesForm.vue'
      )
  }
  ],
  meta: {
    requiresAuth: true,
    role: 'admin'
  }
},
{
  path: '/employee',
  component: () =>
    import(/* webpackChunkName: "dashboard" */ '../views/employee/Index.vue'),
  children: [{
    path: '',
    name: 'EmployeeDashboard',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/employee/Home.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'employee'
    }
  },
  {
    path: 'profile',
    name: 'Profile',
    component: () =>
      import(
        /* webpackChunkName: "users" */
        '../views/employee/Profile.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'employee'
    }
  },
  {
    path: 'projects',
    name: 'Projects',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/employee/Projects.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'employee'
    }
  },
  {
    path: 'tasks',
    name: 'Tasks',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/employee/Tasks.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'employee'
    }
  },
  {
    path: 'teams',
    name: 'Teams',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */
        '../views/employee/Teams.vue'
      ),
    meta: {
      requiresAuth: true,
      role: 'employee'
    }
  }
  ],
  meta: {
    requiresAuth: true
    // role: 'employee'
  }
},
{
  meta: {
    title: 'Edit Project',
    requiresAuth: true,
    role: 'admin'
  },
  path: '/project/edit/:id',
  name: 'project.edit',
  component: () =>
    import(
      /* webpackChunkName: "client-form" */
      '@/components/forms/ProjectsForm.vue'
    ),
  props: true
},
{
  path: '/project/new',
  name: 'project.new',
  component: () =>
    import(
      /* webpackChunkName: "client-form" */
      '@/components/forms/ProjectsForm.vue'
    ),
  meta: {
    title: 'New Project',
    requiresAuth: true,
    role: 'admin'
  }
},
{
  path: '/team/edit/:id',
  name: 'team.edit',
  component: () =>
    import(
      /* webpackChunkName: "team-form" */
      '@/components/forms/TeamForm.vue'
    ),
  meta: {
    title: 'Edit Team',
    requiresAuth: true,
    role: 'admin'
  },
  props: true
},
{
  meta: {
    title: 'New Team',
    requiresAuth: true,
    role: 'admin'
  },
  path: '/team/new',
  name: 'team.new',
  component: () =>
    import(
      /* webpackChunkName: "team-form" */
      '@/components/forms/TeamForm.vue'
    )
},
{
  meta: {
    title: 'Edit Task',
    requiresAuth: true
    // role: 'employee'
  },
  path: '/task/edit/:id',
  name: 'task.edit',
  component: () =>
    import(
      /* webpackChunkName: "task-form" */
      '@/components/forms/TasksForm.vue'
    ),
  props: true
},
{
  meta: {
    title: 'New Task',
    requiresAuth: true
    // role: 'employee'
  },
  path: '/task/new',
  name: 'task.new',
  component: () =>
    import(
      /* webpackChunkName: "task-form" */
      '@/components/forms/TasksForm.vue'
    )
},
{
  path: '/',
  component: () =>
    import(/* webpackChunkName: "errors" */ '../views/errors/Index.vue'),
  children: [{
    path: 'forbidden',
    name: 'Forbidden',
    component: () =>
      import(
        /* webpackChunkName: "errors" */
        '../views/errors/Forbidden.vue'
      )
  },
  {
    path: 'unauthorized',
    name: 'Unauthorized',
    component: () =>
      import(
        /* webpackChunkName: "errors" */
        '../views/errors/Unauthorized.vue'
      )
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () =>
      import(
        /* webpackChunkName: "errors" */
        '../views/errors/PageNotFound.vue'
      )
  },
  {
    path: 'internal-server-error',
    name: 'ServerError',
    component: () =>
      import(
        /* webpackChunkName: "errors" */
        '../views/errors/ServerError.vue'
      )
  }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken')
  const role = localStorage.getItem('role')
  // test for authentication
  if (to.meta.requiresAuth && isAuthenticated === '') {
    next({
      name: 'Unauthorized'
    })
  } else if (to.meta.role && to.meta.role.toString() !== role) {
    next({
      name: 'Forbidden'
    })
  }
  next()
})

export default router
