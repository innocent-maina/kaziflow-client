<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left"
  >
    <div class="aside-tools">
      <a
        class="navbar-item is-hidden-touch is-hidden-widescreen is-desktop-icon-only"
        @click="asideToggleDesktopOnly"
      >
        <b-icon icon="menu" />
      </a>

      <!-- <div class="aside-tools-label">
        <span v-if="userRole == 'Admin'">Dashboard</span>
        <span v-if="userRole == 'Employee'">My Workspace</span>
      </div> -->
    </div>

    <div class="mt-2 mb-3 mr-3 ml-6">
      <img
        src="../../assets/logo.png"
        width="112"
        height="28"
      >
    </div>
    <div class="menu is-menu-main">
      <b-menu class="is-custom-mobile">
        <b-menu-list label="">
          <!-- Home pages -->
          <b-menu-item
            v-if="userRole == 'Admin'"
            icon="desktop-mac"
            label="Dashboard"
            href="/dashboard"
          />
          <b-menu-item
            v-if="userRole == 'Employee'"
            icon="desktop-mac"
            label="Dashboard"
            href="/dashboard"
          />
          <!-- Employee page -->
          <b-menu-item
            v-if="userRole == 'Admin'"
            icon="table"
            label="Employees"
            href="/dashboard/employees"
          />
          <!-- Projects page -->
          <b-menu-item
            v-if="userRole == 'Admin'"
            href="/dashboard/projects"
            icon="square-edit-outline"
            label="Projects"
          />
          <b-menu-item
            v-if="userRole == 'Employee'"
            href="/dashboard/projects"
            icon="square-edit-outline"
            label="Projects"
          />
          <!-- Teams page -->
          <b-menu-item
            v-if="userRole == 'Admin'"
            icon="account-circle"
            label="Teams"
            href="/dashboard/teams"
          />
          <b-menu-item
            v-if="userRole == 'Employee'"
            icon="account-circle"
            label="Teams"
            href="/dashboard/teams"
          />
          <!-- Tasks page -->
          <b-menu-item
            v-if="userRole == 'Admin'"
            icon="lock"
            label="Tasks"
            href="/dashboard/tasks"
          />
          <b-menu-item
            v-if="userRole == 'Employee'"
            icon="lock"
            label="Tasks"
            href="/dashboard/tasks"
          />
        </b-menu-list>
        <!-- Profile page -->
        <b-menu-list>
          <b-menu-item
            v-if="userRole == 'Admin'"
            label="Profile"
            icon="link"
            href="/dashboard/profile"
          />
        </b-menu-list>
        <b-menu-list>
          <b-menu-item
            v-if="userRole == 'Employee'"
            label="Profile"
            icon="link"
            href="/dashboard/profile"
          />
        </b-menu-list>
      </b-menu>
    </div>
  </aside>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'AsideMenu',
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      userRole: this.$store.state.authentication.role
    }
  },
  computed: {
    ...mapState({
      isAsideVisible: state => state.system.isAsideVisible
    })
  },
  methods: {
    asideToggleDesktopOnly () {
      this.$store.dispatch('system/asideDesktopOnlyToggle')
    },
    logout () {
      this.$store.dispatch('authentication/logout')
      this.$buefy.snackbar.open({
        message: 'Logged Out!',
        queue: false
      })
    },
    menuClick (item) {
      //
    }
  }
})
</script>
