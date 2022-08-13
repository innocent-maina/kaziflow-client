<template>
  <card-component
    title="Reset Password"
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
      @submit.prevent="resetPassword"
    >
      <b-field label="New Password">
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          required
        />
      </b-field>

      <b-field label="Confirm Password">
        <b-input
          v-model="form.password_confirmation"
          type="password"
          name="password_confirmation"
          required
        />
      </b-field>

      <!-- <b-field>
        <b-checkbox
          v-model="form.remember"
          type="is-black"
          class="is-thin"
        >
          Remember me
        </b-checkbox>
      </b-field> -->

      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-black"
            :loading="isLoading"
          >
            Reset Password
          </b-button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import CardComponent from '@/components/BaseCardComponent.vue'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export default defineComponent({
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      token: 'wahome',
      form: {
        password: '',
        password_confirmation: ''
      }
    }
  },
  // mounted () {
  //   this.decodeToken()
  // },
  methods: {
    decodeToken () {
      // get token from searchbar
      const urlParams = new URLSearchParams(window.location.search)
      const windowParam = urlParams.get('token')
      // use jwt to decode the token
      const decodedToken = jwt_decode(windowParam)
      console.log(decodedToken)
      // get user email from decoded token
      const userEmail = decodedToken.email
      console.log(userEmail)

      // do a check to see if the user exists or something...
      // this is a check to see if the email is a valid email
      const validateEmail = (email) => {
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (email.match(regexEmail)) {
          setTimeout(() => {
            this.isLoading = false
            this.$buefy.snackbar.open(
              {
                message: 'User email is valid: ' + userEmail,
                queue: false
              }
            )
          }, 750)
          return true
        } else {
          setTimeout(() => {
            this.isLoading = false
            this.$buefy.snackbar.open(
              {
                message: 'Email is not valid',
                queue: false
              }
            )
          }, 750)
          return false
        }
      }

      const email = userEmail
      validateEmail(email)
    },
    async resetPassword () {
      this.decodeToken()
      const updateInfo = {
        firstName: this.$store.state.authentication.firstName,
        lastName: this.$store.state.authentication.lastName,
        phoneNumber: this.$store.state.authentication.phoneNumber,
        email: this.$store.state.authentication.email,
        role: this.$store.state.authentication.role,
        password: this.password_confirmation
      }
      if (this.form.password !== this.form.password_confirmation) {
        this.$buefy.snackbar.open({
          message: 'Passwords do not match!',
          queue: true
        })
      } else {
        await this.$store.dispatch('authentication/resetPassword', updateInfo)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open(
                  {
                    message: 'Password reset was successful',
                    queue: false
                  }
                )
              }, 750)
              this.$router.push('/')
            } else {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open(
                  {
                    message: 'Password reset failed! Please try again',
                    queue: false
                  }
                )
              }, 750)
            }
          })
      }
    }
  }
})
</script>
