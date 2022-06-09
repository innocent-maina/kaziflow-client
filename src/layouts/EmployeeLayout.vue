<template>
  <div id="app">
    <employee-navbar />
    <employee-menu />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import EmployeeNavbar from '@/components/EmployeeNavbar.vue'
import EmployeeMenu from '@/components/EmployeeMenu.vue'
import FooterBar from '@/components/FooterBar.vue'

export default defineComponent({
  name: 'EmployeeLayout',
  components: {
    FooterBar,
    EmployeeMenu,
    EmployeeNavbar
  }
})
</script>
