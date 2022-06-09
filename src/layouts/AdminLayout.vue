<template>
  <div id="app">
    <admin-navbar />
    <admin-menu />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminMenu from '@/components/AdminMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

export default defineComponent({
  name: 'AdminLayout',
  components: {
    FooterBar,
    AdminMenu,
    AdminNavbar
  }
})
</script>
