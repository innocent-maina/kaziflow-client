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
import CardComponent from '@/components/CardComponent.vue'
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
    isLoggedIn: {
      handler (newValue) {
        if (newValue) {
          if (this.$store.state.authentication.role === 'Employee') {
            this.$router.push('/employee')
          } else if (this.$store.state.authentication.role === 'Admin') {
            this.$router.push('/admin')
          }
        }
      },
      deep: true
    }
  },
  // mounted () {
  //   if (this.$store.state.authentication.role === 'Employee') {
  //     this.$router.push('/employee')
  //   } else if (this.$store.state.authentication.role === 'Admin') {
  //     this.$router.push('/admin')
  //   }
  // },
  methods: {
    async login () {
      const user = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('authentication/login', user).then(() => {
        if (this.$store.state.authentication.accessToken === '') {
          console.log('bad luck')
          this.isLoading = true
          setTimeout(() => {
            this.isLoading = false
            this.$buefy.snackbar.open({
              message: 'Invalid credentials!',
              queue: false
            })
          }, 750)
        } else {
          // if (
          //   this.$store.state.authentication.accessToken !== '' &&
          //   this.$store.state.authentication.role === 'Admin'
          // ) {
          //   this.$router.push('/admin')
          // } else if (this.$store.state.authentication.accessToken !== '' && this.$store.state.authentication.role === 'Employee') {
          //   this.$router.push('/employee')
          // }
          this.isLoggedIn = true
          console.log('it has been set')
          setTimeout(() => {
            this.isLoading = false
            this.$buefy.snackbar.open({
              message: 'Login successful!',
              queue: false
            })
          }, 750)
        }
      })
    }
  }
})
</script>
