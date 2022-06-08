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
        <span>Kaziflow</span>
      </div>
    </div>
    <div class="menu is-menu-main">
      <b-menu class="is-custom-mobile">
        <b-menu-list label="General">
          <b-menu-item
            icon="desktop-mac"
            label="Dashboard"
            href="/"
          />
          <b-menu-item
            icon="table"
            label="Employees"
            href="/tables"
          />
          <b-menu-item
            href="/forms"
            icon="square-edit-outline"
            label="Projects"
          />
          <b-menu-item
            icon="account-circle"
            label="Teams"
            href="/profile"
          />
          <b-menu-item
            icon="lock"
            label="Tasks"
            href="/login"
          />
        </b-menu-list>
        <b-menu-list>
          <b-menu-item
            label="Settings"
            icon="link"
          />
        </b-menu-list>
        <b-menu-list label="Extensions">
          <b-menu-item
            icon="logout"
            label="Slack"
          />
          <b-menu-item
            icon="logout"
            label="Ms Teams"
          />
          <b-menu-item
            icon="logout"
            label="Trello"
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
