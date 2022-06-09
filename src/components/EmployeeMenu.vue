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
        <span>Kaziflow employee</span>
      </div>
    </div>
    <div class="menu is-menu-main">
      <b-menu class="is-custom-mobile">
        <b-menu-list label="General">
          <b-menu-item
            icon="desktop-mac"
            label="Dashboard"
            href="/employee/"
          />
          <b-menu-item
            href="/employee/projects"
            icon="square-edit-outline"
            label="Projects"
          />
          <b-menu-item
            icon="account-circle"
            label="Teams"
            href="/employee/teams"
          />
          <b-menu-item
            icon="lock"
            label="Tasks"
            href="/employee/tasks"
          />
        </b-menu-list>
        <b-menu-list>
          <b-menu-item
            label="Settings"
            icon="link"
            href="/employee/settings"
          />
        </b-menu-list>
        <b-menu-list label="Extensions">
          <b-menu-item
            icon="logout"
            label="Slack"
            href="https://slack.com"
          />
          <b-menu-item
            icon="logout"
            label="Ms Teams"
            href="https://teams.microsoft.com/"
          />
          <b-menu-item
            icon="logout"
            label="Trello"
            href="https://trello.com/"
          />
        </b-menu-list>
        <b-menu-list label="Actions">
          <b-menu-item
            icon="logout"
            label="Logout"
          />
        </b-menu-list>
      </b-menu>
    </div>
  </aside>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
// import AsideMenuList from '@/components/AsideMenuList.vue'

export default defineComponent({
  name: 'AsideMenu',
  // components: { AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['isAsideVisible'])
  },
  methods: {
    asideToggleDesktopOnly () {
      this.$store.dispatch('asideDesktopOnlyToggle')
    },
    menuClick (item) {
      //
    }
  }
})
</script>
