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
            native-type="submit"
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
import CardComponent from '@/components/CardComponent.vue'
import axios from 'axios'

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
      phoneNumber: '',
      error: ''
    }
  },
  methods: {
    signup () {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/api/v1/auth/register', newUser).then(
        (res) => {
          console.log(res)
          this.error = ''
          this.$router.push('/')
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
        }
      )
    }
  }
})
</script>
