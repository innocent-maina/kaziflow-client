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
          <span><b>Quick tip:</b> To mark a project as completely done, use the "Terminated" option</span>
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
              label="Project logo"
              horizontal
            >
              <file-picker type="is-info" />
            </b-field>
            <hr>
            <b-field
              label="Name"
              message="Project name"
              horizontal
            >
              <b-input
                v-model="form.name"
                placeholder="e.g. Project A"
              />
            </b-field>
            <b-field
              label="Description"
              message="Project description"
              horizontal
            >
              <b-input
                v-model="form.description"
                placeholder="e.g. Provide marketing solutions to freelancers"
              />
            </b-field>
            <b-field
              label="Leader"
              message=""
              horizontal
            >
              <b-input v-model="form.leader" />
            </b-field>
            <b-field
              label="Category"
              message=""
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.category"
                  placeholder="Select a category"
                >
                  <option value="Blockchain">
                    Blockchain
                  </option>
                  <option value="Website">
                    Website
                  </option>
                  <option value="Application">
                    Application
                  </option>
                </b-select>
              </div>
            </b-field>
            <b-field
              label="Team"
              message=""
              horizontal
            >
              <b-input v-model="form.team" />
            </b-field>
            <b-field
              label="Status"
              message=""
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.status"
                  placeholder="Select a status"
                >
                  <option value="Initiated">
                    Initiated
                  </option>
                  <option value="In-Progress">
                    In Progress
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                  <option value="Terminated">
                    Terminated
                  </option>
                </b-select>
              </div>
            </b-field>
            <b-field
              label="Estimated end date"
              horizontal
            >
              <b-datepicker
                v-model="form.endDate"
                placeholder="Click to select..."
                icon="calendar-today"
                @input="dateInput"
              />
            </b-field>
            <hr>
            <b-field
              label="Progress"
              horizontal
            >
              <b-slider
                v-model="form.progress"
                type="is-info"
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
                @click="$router.push('/dashboard/projects')"
              >
                Back
              </b-button>
            </b-field>
          </form>
        </card-component>
        <card-component
          v-if="isProfileExists"
          title="Project Profile"
          icon="account"
          class="tile is-child"
        >
          <user-avatar
            :avatar="form.avatar"
            class="image has-max-width is-aligned-center"
          />
          <hr>
          <b-field label="Name">
            <b-input
              :value="form.name"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Description">
            <b-input
              :value="form.Description"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Leader">
            <b-input
              :value="form.leader"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Category">
            <b-input
              :value="form.category"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Team">
            <b-input
              :value="form.team"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Status">
            <b-input
              :value="form.status"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="End date">
            <b-input
              :value="form.endDate"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr>
          <b-field label="Progress">
            <b-progress
              :value="form.progress"
              type="is-info"
              show-value
              format="percent"
            />
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'
import Tiles from '@/components/BaseTiles.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import FilePicker from '@/components/BaseFilePicker.vue'
import UserAvatar from '@/components/BaseUserAvatar.vue'
import Notification from '@/components/BaseNotification.vue'

export default defineComponent({
  name: 'ProjectsForm',
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
        name: '',
        category: '',
        description: '',
        leader: '',
        status: '',
        team: '',
        endDate: null,
        progress: ''
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Projects',
        this.isProfileExists ? this.form.name : 'New Project'
      ]
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'Create Project'
    },
    heroRouterLinkTo () {
      return this.isProfileExists
        ? { name: 'project.new' }
        : { name: 'Projects' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New Project' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit Project' : 'Create Project'
    },
    ...mapState({
      projects: (state) => state.projects.projects
    })
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form.id = ''
        this.form.name = ''
        this.form.description = ''
        this.form.category = ''
        this.form.leader = ''
        this.form.team = ''
        this.form.status = ''
        this.form.endDate = null
        this.form.progress = ''
        // this.createdReadable = new Date().toLocaleDateString()
      } else {
        this.getData()
      }
    },
    'form.status' (newValue) {
      if (newValue === 'Initiated') {
        this.form.progress = 25
      } else if (newValue === 'In-Progress') {
        this.form.progress = 50
      } else if (newValue === 'Completed') {
        this.form.progress = 75
      } else if (newValue === 'Terminated') {
        this.form.progress = 100
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        const item = this.projects.find(
          (project) => project._id === this.$route.params.id
        )

        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.name = item.name
          this.form.description = item.description
          this.form.category = item.category
          this.form.leader = item.leader
          this.form.team = item.team
          this.form.status = item.status
          this.form.endDate = item.endDate
          this.form.progress = item.progress
          // this.form.created_date = new Date(item.created_mm_dd_yyyy)

          // this.createdReadable = new Date(item.created_mm_dd_yyyy).toLocaleDateString()
        }
      } else {
        this.$router.push({ name: 'project.new' })
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    submit () {
      const newProject = {
        name: this.form.name,
        description: this.form.description,
        category: this.form.category,
        leader: this.form.leader,
        team: this.form.team,
        status: this.form.status,
        endDate: this.form.endDate,
        progress: this.form.progress
      }
      const updateProject = {
        projectId: this.$route.params.id,
        project: this.form
      }
      if (this.$route.params.id) {
        this.$store
          .dispatch('projects/updateProject', updateProject)
          .then((response) => {
            if (response.status === 200) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open({
                  message: 'Successfully updated the project!',
                  queue: false
                })
              }, 750)
            } else {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open({
                  message: 'Failed to update the project!',
                  queue: false
                })
              }, 750)
            }
          })
      } else {
        this.$store
          .dispatch('projects/createProject', newProject)
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open({
                  message: 'Successfully created a project!',
                  queue: false
                })
              }, 750)
            } else if (response.status === 500) {
              this.isLoading = true
              setTimeout(() => {
                this.isLoading = false
                this.$buefy.snackbar.open(
                  {
                    message: 'Failed to create a project!',
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
