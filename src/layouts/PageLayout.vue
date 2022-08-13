<template>
  <div id="app">
    <Navbar />
    <Menu />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Navbar from '@/components/shared/Navbar.vue'
import Menu from '@/components/shared/Menu.vue'
import FooterBar from '@/components/shared/FooterBar.vue'

export default defineComponent({
  name: 'AdminLayout',
  components: {
    FooterBar,
    Menu,
    Navbar
  }
})
</script>
