<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ heroTitle }}
      <router-link
        slot="right"
        :to="heroRouterLinkTo"
        class="button"
      >
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <span><b>change me.</b> change me</span>
        </div>
      </notification>
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <b-field
              label="ID"
              horizontal
            >
              <b-input
                v-model="form.id"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <hr>
            <b-field
              label="Profile"
              horizontal
            >
              <file-picker type="is-info" />
            </b-field>
            <hr>
            <b-field
              label="First Name"
              message="First name"
              horizontal
            >
              <b-input
                v-model="form.firstName"
                placeholder="e.g. John"
                required
              />
            </b-field>
            <b-field
              label="Last name"
              message="Last name"
              horizontal
            >
              <b-input
                v-model="form.lastName"
                placeholder="e.g. Doe"
                required
              />
            </b-field>
            <b-field
              label="Email"
              message="Company email"
              horizontal
            >
              <b-input
                v-model="form.email"
                placeholder="e.g. karen@kaziflow.com"
                required
              />
            </b-field>
            <b-field
              label="Password"
              message="password"
              horizontal
            >
              <b-input
                v-model="form.password"
                placeholder="e.g. K!22@ark_cd"
                required
              />
            </b-field>
            <b-field
              label="Phone Number"
              message="Phone Number"
              horizontal
            >
              <b-input
                v-model="form.phoneNumber"
                placeholder="2547******"
                required
              />
            </b-field>
            <hr>
            <b-field horizontal>
              <b-button
                type="is-info"
                :loading="isLoading"
                native-type="submit"
              >
                Submit
              </b-button>
            </b-field>
          </form>
        </card-component>
        <card-component
          v-if="isProfileExists"
          title="Employee Profile"
          icon="account"
          class="tile is-child"
        >
          <user-avatar
            :avatar="form.avatar"
            class="image has-max-width is-aligned-center"
          />
          <hr>
          <b-field label="First Name">
            <b-input
              :value="form.firstName"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Last Name">
            <b-input
              :value="form.lastName"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Email">
            <b-input
              :value="form.email"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Phone Number">
            <b-input
              :value="form.phoneNumber"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import find from 'lodash/find'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Tiles from '@/components/Tiles.vue'
import CardComponent from '@/components/CardComponent.vue'
import FilePicker from '@/components/FilePicker.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Notification from '@/components/Notification.vue'
// import bcrypt from 'bcryptjs'
export default defineComponent({
  name: 'EmployeesForm',
  components: {
    UserAvatar,
    FilePicker,
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar,
    Notification
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      isProfileExists: false,
      isLoading: false,
      form: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Employees',
        this.isProfileExists ? this.form.name : 'New Employee'
      ]
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'Create Employee'
    },
    heroRouterLinkTo () {
      return this.isProfileExists ? { name: 'admin-employee.new' } : { name: 'AdminEmployees' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New Employee' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit Employee' : 'Create Employee'
    },
    ...mapState({
      clients: state => state.system.clients
    })
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form.id = ''
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.email = ''
        this.form.password = ''
        this.form.phoneNumber = ''
        this.createdReadable = new Date().toLocaleDateString()
      } else {
        this.getData()
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.id) {
        const item = find(
          this.clients,
          (item) => item.id === parseInt(this.id)

        )

        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.firstName = item.firstName
          this.form.lastName = item.lastName
          this.form.email = item.email
          this.form.phoneNumber = item.phoneNumber

          this.createdReadable = new Date(item.created_mm_dd_yyyy).toLocaleDateString()
        } else {
          this.$router.push({ name: 'admin-employee.new' })
        }
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    submit () {
      // const password = 'password'
      // const saltRounds = 2
      // const hashedPassword = bcrypt.hash(password, saltRounds)
      const newEmployee = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        phoneNumber: this.form.phoneNumber,
        password: this.form.password
      }
      this.$store.dispatch('employees/createEmployee', newEmployee)
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Create employee notification',
          queue: false
        })
      }, 750)
    }
  }
})
</script>
