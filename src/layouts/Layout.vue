<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot has-text-centered">
      <div class="logo" />
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Layout',
  created () {
    this.$store.dispatch('system/toggleFullPage', true)
  },
  beforeDestroy () {
    this.$store.dispatch('system/toggleFullPage', false)
  }
})
</script>
