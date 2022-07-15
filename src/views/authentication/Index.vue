<template>
  <authentication-layout>
    <router-view />
  </authentication-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import AuthenticationLayout from '../../layouts/AuthenticationLayout'
export default defineComponent({
  name: 'Index',
  components: {
    AuthenticationLayout
  },
  created () {
    this.$store.dispatch('system/toggleFullPage', true)
  },
  beforeDestroy () {
    this.$store.dispatch('system/toggleFullPage', false)
  }
})
</script>
