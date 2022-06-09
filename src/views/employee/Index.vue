<template>
  <employee-layout>
    <router-view />
  </employee-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import EmployeeLayout from '../../layouts/EmployeeLayout.vue'
export default defineComponent({
  name: 'Home',
  components: {
    EmployeeLayout
  }
})
</script>
