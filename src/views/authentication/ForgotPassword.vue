<template>
  <card-component
    title="Forgot Password"
    icon="lock"
  >
    <router-link
      slot="button"
      to="/"
      class="button is-small"
    >
      Dashboard
    </router-link>

    <form
      method="POST"
      @submit.prevent="forgotPassword"
    >
      <b-field label="E-mail Address">
        <b-input
          v-model="form.email"
          name="email"
          type="email"
          required
        />
      </b-field>
      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-black"
            :loading="isLoading"
          >
            Proceed
          </b-button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import CardComponent from '@/components/BaseCardComponent.vue'

export default defineComponent({
  name: 'ForgotPassword',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      form: {
        email: ''
      }
    }
  },
  methods: {
    async forgotPassword () {
      const user = {
        email: this.form.email
      }
      await this.$store.dispatch('authentication/forgotPassword', user)
      // eslint-disable-next-line no-constant-condition
        .then((response) => {
          if (response.status === 404) {
            setTimeout(() => {
              this.isLoading = false
              this.$buefy.snackbar.open({
                message: 'User not found!',
                queue: false
              })
            }, 750)
          } else if (response.status === 200) {
            this.$router.push('/reset-password')
            setTimeout(() => {
              this.isLoading = false
              this.$buefy.snackbar.open({
                message: 'Reset password email sent to ' + this.form.email,
                queue: false
              })
            }, 750)
          } else {
            setTimeout(() => {
              this.isLoading = false
              this.$buefy.snackbar.open({
                message: 'Error!',
                queue: false
              })
            }, 750)
          }
        })
    }
  }
})
</script>
