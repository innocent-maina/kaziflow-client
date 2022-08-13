<template>
  <footer
    v-show="isFooterBarVisible"
    class="footer"
  >
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ year }}, kaziflow.me</b>. <a
                href="#"
                target="_blank"
              >GitHub</a>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <a
                href="https://kaziflow.me"
                target="_blank"
              >
                <img
                  src="../../assets/kaziflow-logo.svg"
                  alt="kaziflow.me"
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'FooterBar',
  data () {
    return {
      year: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState({
      isFooterBarVisible: state => state.system.isFooterBarVisible
    })
  }
})
</script>
