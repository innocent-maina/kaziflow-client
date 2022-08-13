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
          <span><b>Update Employee info.</b> Employees will be notified whenever their data changes</span>
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
                placeholder="e.g. johndoe@kaziflow.com"
                required
              />
            </b-field>
            <b-field
              label="Password"
              message="Confidential Password"
              horizontal
            >
              <b-input
                v-model="form.password"
                placeholder="e.g. K!22@ark_cd"
                required
                type="password"
              />
            </b-field>
            <b-field
              label="Role"
              message="User's role"
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.role"
                  placeholder="Select a role"
                >
                  <option value="Employee">
                    Employee
                  </option>
                  <option value="Admin">
                    Admin
                  </option>
                </b-select>
              </div>
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
              <b-button
                type=""
                :loading="isLoading"
                @click="$router.push('/dashboard/employees')"
              >
                Back
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
          <b-field label="Role">
            <b-input
              :value="form.role"
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
// import find from 'lodash/find'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'
import Tiles from '@/components/BaseTiles.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import FilePicker from '@/components/BaseFilePicker.vue'
import UserAvatar from '@/components/BaseUserAvatar.vue'
import Notification from '@/components/BaseNotification.vue'
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
        role: 'Employee',
        phoneNumber: ''
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Employees',
        this.isProfileExists ? this.form.firstName + ' ' + this.form.lastName : 'New Employee'
      ]
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'Create Employee'
    },
    heroRouterLinkTo () {
      return this.isProfileExists ? { name: 'admin-employee.new' } : { name: 'Employees' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New Employee' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit Employee' : 'Create Employee'
    },
    ...mapState({
      employees: state => state.employees.employees
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
        this.form.role = ''
        this.form.phoneNumber = ''
        this.createdReadable = new Date().toLocaleDateString()
      } else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        const item = this.employees.find((employee) => employee._id === this.$route.params.id)

        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.firstName = item.firstName
          this.form.lastName = item.lastName
          this.form.email = item.email
          this.form.role = item.role
          this.form.phoneNumber = item.phoneNumber

          this.createdReadable = new Date(item.created_mm_dd_yyyy).toLocaleDateString()
        }
      } else {
        this.$router.push({ name: 'admin-employee.new' })
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
        role: this.form.role,
        phoneNumber: this.form.phoneNumber,
        password: this.form.password
      }
      const updateEmployee = {
        employeeId: this.$route.params.id,
        employee: this.form
      }
      if (this.$route.params.id) {
        this.$store.dispatch('employees/updateEmployee', updateEmployee)
        this.$buefy.snackbar.open({
          message: 'Successfully updated the Employee',
          queue: true
        })
      } else {
        this.$store.dispatch('employees/createEmployee', newEmployee)
        this.$buefy.snackbar.open({
          message: 'Successfully created the Employee',
          queue: true
        })
      }
    }
  }
})
</script>
