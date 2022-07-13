<template>
  <admin-layout>
    <router-view />
  </admin-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import AdminLayout from '../../layouts/AdminLayout.vue'
export default defineComponent({
  name: 'Home',
  components: {
    AdminLayout
  }
})
</script>
