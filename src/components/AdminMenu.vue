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
      <div class="aside-tools-label">
        <span>Dashboard</span>
      </div>
    </div>
    <div class="menu is-menu-main">
      <b-menu class="is-custom-mobile">
        <b-menu-list label="General">
          <b-menu-item
            icon="desktop-mac"
            label="Dashboard"
            href="/admin/"
          />
          <b-menu-item
            icon="table"
            label="Employees"
            href="/admin/employees"
          />
          <b-menu-item
            href="/admin/projects"
            icon="square-edit-outline"
            label="Projects"
          />
          <b-menu-item
            icon="account-circle"
            label="Teams"
            href="/admin/teams"
          />
          <b-menu-item
            icon="lock"
            label="Tasks"
            href="/admin/tasks"
          />
        </b-menu-list>
        <b-menu-list>
          <b-menu-item
            label="Profile"
            icon="link"
            href="/admin/profile"
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
