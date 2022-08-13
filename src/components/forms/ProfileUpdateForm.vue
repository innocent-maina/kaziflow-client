<template>
  <card-component
    title="Edit Profile"
    icon="account-circle"
  >
    <form @submit.prevent="submit">
      <b-field
        horizontal
        label="Avatar"
      >
        <file-picker type="is-info" />
      </b-field>
      <hr>
      <b-field
        horizontal
        label="Name"
        message="Required. Your name"
      >
        <b-input
          v-model="userName"
          name="name"
          required
        />
      </b-field>
      <b-field
        horizontal
        label="E-mail"
        message="Required. Your e-mail"
      >
        <b-input
          v-model="userEmail"
          name="email"
          type="email"
          required
        />
      </b-field>
      <hr>
      <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <b-button
              native-type="submit"
              type="is-info"
              :loading="isLoading"
            >
              Submit
            </b-button>
          </div>
          <div class="control">
            <b-button
              type="is-info"
              native-type="button"
              outlined
              @click="reset()"
            >
              Reset
            </b-button>
          </div>
        </b-field>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import FilePicker from '@/components/BaseFilePicker.vue'
import CardComponent from '@/components/BaseCardComponent.vue'

export default defineComponent({
  name: 'ProfileUpdateForm',
  components: {
    CardComponent,
    FilePicker
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    userName: {
      get: function () {
        return this.$store.state.authentication.firstName
      },
      set: function (name) {
        this.$store.commit('system/user', { name })
      }
    },
    userEmail: {
      get: function () {
        return this.$store.state.authentication.email
      },
      set: function (email) {
        this.$store.commit('system/user', { email })
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 750)
    },
    reset () {
      this.$store.state.system.userName = ''
    }
  }
})
</script>
