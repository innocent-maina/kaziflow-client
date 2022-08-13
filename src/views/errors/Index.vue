<template>
  <layout>
    <router-view />
  </layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Layout from '../../layouts/Layout'
export default defineComponent({
  name: 'Index',
  components: {
    Layout
  },
  created () {
    this.$store.dispatch('system/toggleFullPage', true)
  },
  beforeDestroy () {
    this.$store.dispatch('system/toggleFullPage', false)
  }
})
</script>
