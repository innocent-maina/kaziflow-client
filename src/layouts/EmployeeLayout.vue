<template>
  <div id="app">
    <nav-bar />
    <employee-menu />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import NavBar from '@/components/NavBar.vue'
import EmployeeMenu from '@/components/EmployeeMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

export default defineComponent({
  name: 'EmployeeLayout',
  components: {
    FooterBar,
    EmployeeMenu,
    NavBar
  }
})
</script>
