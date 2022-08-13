<template>
  <card-component
    title="Register"
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
      @submit.prevent="submit"
    >
      <b-field label="First Name">
        <b-input
          v-model="firstName"
          name="firstName"
          type="text"
          required
        />
      </b-field>
      <b-field label="Last Name">
        <b-input
          v-model="lastName"
          name="lastName"
          type="text"
          required
        />
      </b-field>
      <b-field label="Phone Number">
        <b-input
          v-model="phoneNumber"
          name="phoneNumber"
          type="number"
          required
        />
      </b-field>
      <b-field label="E-mail Address">
        <b-input
          v-model="email"
          name="email"
          type="email"
          required
        />
      </b-field>

      <b-field label="Password">
        <b-input
          v-model="password"
          type="password"
          name="password"
          required
        />
      </b-field>

      <b-field label="Confirm Password">
        <b-input
          v-model="confirmPassword"
          type="password"
          name="password"
          required
        />
      </b-field>

      <!-- <b-field>
        <b-checkbox
          v-model="remember"
          type="is-black"
          class="is-thin"
        >
          Remember me
        </b-checkbox>
      </b-field> -->
      {{ error }}
      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            type="is-black"
            :loading="isLoading"
            @click="register"
          >
            Sign up
          </b-button>
        </div>
        <div class="control">
          <router-link
            to="/"
            class="button is-outlined is-black"
          >
            Already have an account?
          </router-link>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import CardComponent from '@/components/BaseCardComponent.vue'

export default defineComponent({
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      error: ''
    }
  },
  methods: {
    async register () {
      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password
      }
      if (this.password !== this.confirmPassword) {
        this.$buefy.snackbar.open({
          message: 'Passwords do not match!',
          queue: true
        })
      } else {
        await this.$store.dispatch('authentication/register', newUser)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open(
                  {
                    message: 'Registration successful! Please login to continue',
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
                    message: 'Registration failed! Please try again',
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
