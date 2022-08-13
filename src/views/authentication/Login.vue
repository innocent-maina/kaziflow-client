<template>
  <card-component
    title="Login"
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

      <b-field>
        <b-checkbox
          v-model="remember"
          type="is-black"
          class="is-thin"
        >
          Remember me
        </b-checkbox>
      </b-field>
      {{ error }}
      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            type="is-black"
            :loading="isLoading"
            @click="login"
          >
            Login
          </b-button>
        </div>
        <div class="control">
          <router-link
            to="/forgot-password"
            class="button is-outlined is-black"
          >
            Forgot Password?
          </router-link>
        </div>
      </b-field>
      <!-- <hr> -->
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import CardComponent from '@/components/BaseCardComponent.vue'
// import axios from 'axios'
export default defineComponent({
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      email: '',
      password: '',
      remember: false,
      error: '',
      isLoggedIn: false
    }
  },
  watch: {
    isLoggedIn (newValue) {
      if (newValue) {
        this.$router.push('/dashboard')
      }
    }
  },
  mounted () {
    this.isLoggedIn = false
    if (this.$store.state.authentication.role !== '') {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    async login () {
      const user = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('authentication/login', user)
      if (this.$store.state.authentication.accessToken === '') {
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
          this.$buefy.snackbar.open({
            message: 'Invalid credentials!',
            queue: false
          })
        }, 750)
      } else {
        this.isLoggedIn = true
        this.$router.push('/dashboard')
        setTimeout(() => {
          this.isLoading = false
          this.$buefy.snackbar.open({
            message: 'Login successful!',
            queue: false
          })
        }, 750)
      }
    }
  }
})
</script>
