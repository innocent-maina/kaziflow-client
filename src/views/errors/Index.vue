<template>
  <error-layout>
    <router-view />
  </error-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ErrorLayout from '../../layouts/ErrorLayout'
export default defineComponent({
  name: 'Index',
  components: {
    ErrorLayout
  },
  created () {
    this.$store.dispatch('system/toggleFullPage', true)
  },
  beforeDestroy () {
    this.$store.dispatch('system/toggleFullPage', false)
  }
})
</script>
