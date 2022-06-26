<template>
  <div>
    <figure class="image is-fullwidth">
      <img src="../../assets/icons/401.svg">
    </figure>
    <div class="level pt-5">
      <div class="level-item">
        <b-button
          class="has-text-centered is-black"
          @click="$router.go(-1)"
        >
          Go Back
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Unauthorized'
})
</script>
