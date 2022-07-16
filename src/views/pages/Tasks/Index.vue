<template>
  <page-layout>
    <router-view />
  </page-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import PageLayout from '../../../layouts/PageLayout.vue'
export default defineComponent({
  name: 'TasksHome',
  components: {
    PageLayout
  }
})
</script>
