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
      @submit.prevent="submit"
    >
      <b-field label="New Password">
        <b-input
          v-model="form.email"
          name="email"
          type="password"
          required
        />
      </b-field>

      <b-field label="Confirm Password">
        <b-input
          v-model="form.password"
          type="password"
          name="password"
          required
        />
      </b-field>

      <b-field>
        <b-checkbox
          v-model="form.remember"
          type="is-black"
          class="is-thin"
        >
          Remember me
        </b-checkbox>
      </b-field>

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
import CardComponent from '@/components/CardComponent.vue'

export default defineComponent({
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      form: {
        email: 'john.doe@example.com',
        password: 'my-secret-password-9e9w',
        remember: false
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$router.push('/')
      }, 750)
    }
  }
})
</script>
