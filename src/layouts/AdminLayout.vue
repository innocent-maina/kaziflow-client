<template>
  <div id="app">
    <nav-bar />
    <admin-menu />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import NavBar from '@/components/NavBar.vue'
import AdminMenu from '@/components/AdminMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

export default defineComponent({
  name: 'AdminLayout',
  components: {
    FooterBar,
    AdminMenu,
    NavBar
  }
})
</script>
