<template>
  <card-component
    title="Change Password"
    icon="lock"
  >
    <form @submit.prevent="resetPassword">
      <b-field
        horizontal
        label="Current password"
        message="Required. Your current password"
      >
        <b-input
          v-model="form.password_current"
          name="password_current"
          type="password"
          required
          autcomplete="current-password"
        />
      </b-field>
      <hr>
      <b-field
        horizontal
        label="New password"
        message="Required. New password"
      >
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <b-field
        horizontal
        label="Confirm password"
        message="Required. New password one more time"
      >
        <b-input
          v-model="form.password_confirmation"
          name="password_confirmation"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <hr>
      <b-field horizontal>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-info"
            :loading="isLoading"
          >
            Submit
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
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {
        password_current: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async resetPassword () {
      const updateInfo = {
        firstName: this.$store.state.authentication.firstName,
        lastName: this.$store.state.authentication.lastName,
        phoneNumber: this.$store.state.authentication.phoneNumber,
        email: this.$store.state.authentication.email,
        role: this.$store.state.authentication.role,
        password: this.password_confirmation
      }
      if (this.$store.state.authentication.password !== this.form.password_current) {
        this.$buefy.snackbar.open({
          message: 'Current Password is wrong!',
          queue: true
        })
      } else if (this.form.password !== this.form.password_confirmation) {
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
