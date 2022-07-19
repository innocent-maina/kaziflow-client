import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: () =>
      import(
        /* webpackChunkName: "pages" */
        '../views/pages/Index.vue'
      ),
    children: [{
      path: '',
      name: 'Dashboard',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Dashboard.vue'
        )
    },
    {
      path: 'profile',
      name: 'Profile',
      component: () =>
        import(/* webpackChunkName: "users" */ '../views/pages/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'employees',
      name: 'Employees',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Employees/Index.vue'
        ),
      children: [{
        path: '',
        name: 'ListEmployees',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Employees/ListEmployees.vue'
          )
      },
      {
        path: ':employeeId',
        name: 'ViewEmployee',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Employees/ViewEmployee.vue'
          )
      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'projects',
      name: 'Projects',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Projects/Index.vue'
        ),
      children: [{
        path: '',
        name: 'ListProjects',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Projects/ListProjects.vue'
          )
      },
      {
        path: ':projectId',
        name: 'ViewProject',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Projects/ViewProject.vue'
          )
      }],
      meta: {
        requiresAuth: true
      }

    },
    {
      path: 'tasks',
      name: 'Tasks',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Tasks/Index.vue'
        ),
      children: [{

        path: '',
        name: 'ListTasks',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Tasks/ListTasks.vue'
          )
      },
      {
        path: ':taskId',
        name: 'ViewTask',
        component: () =>
          import(
            /* webpackChunkName: "pages" */
            '../views/pages/Tasks/ViewTask.vue'
          )

      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'teams',
      name: 'Teams',
      component: () =>
        import(
          /* webpackChunkName: "pages" */
          '../views/pages/Teams/Index.vue'
        ),
      children: [
        {

          path: '',
          name: 'ListTeams',
          component: () =>
            import(
              /* webpackChunkName: "pages" */
              '../views/pages/Teams/ListTeams.vue'
            )
        },
        {
          path: ':teamId',
          name: 'ViewTeam',
          component: () =>
            import(
              /* webpackChunkName: "pages" */
              '../views/pages/Teams/ViewTeam.vue'
            )

        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      meta: {
        title: 'Edit Employee',
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
        requiresAuth: true
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
      requiresAuth: true
    }
  },
  {
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
    path: '/forms',
    component: () =>
      import(/* webpackChunkName: "forms" */ '../views/pages/FormsIndex.vue'),
    children: [{
      meta: {
        title: 'Edit Project',
        requiresAuth: true,
        role: 'Admin'
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
        role: 'Admin'
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
        role: 'Admin'
      },
      props: true
    },
    {
      meta: {
        title: 'New Team',
        requiresAuth: true,
        role: 'Admin'
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
      },
      path: '/task/new',
      name: 'task.new',
      component: () =>
        import(
        /* webpackChunkName: "task-form" */
          '@/components/forms/TasksForm.vue'
        )
    }]
  },
  {
    path: '/error',
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
