<template>
  <div>
    <h2>View Task</h2>
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
          <span><b> can now create their own tasks!</b></span>
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
              label="Name"
              message="Task name"
              horizontal
            >
              <b-input
                v-model="form.name"
                placeholder="e.g. Create Datagrids"
                required
              />
            </b-field>
            <b-field
              label="Description"
              message="Description of the task"
              horizontal
            >
              <b-input
                v-model="form.description"
                placeholder="e.g. You are required to create component datagrids..."
                required
              />
            </b-field>
            <b-field
              label="Project"
              message="Project this task belongs to"
              horizontal
            >
              <b-input
                v-model="form.project"
                placeholder="e.g. Project A"
                required
              />
            </b-field>
            <b-field
              label="Reporter"
              message="Creator the task"
              horizontal
            >
              <b-input
                v-model="form.reporter"
                placeholder="e.g. Karen Nduta"
                required
              />
            </b-field>
            <b-field
              label="Assignee"
              message="Individual working on the task"
              horizontal
            >
              <b-input
                v-model="form.assignee"
                placeholder="e.g. Karen Nduta"
                required
              />
            </b-field>
            <b-field
              label="Status"
              message="Task update"
              horizontal
            >
              <div class="select">
                <b-select
                  v-model="form.status"
                  placeholder="Select a status"
                >
                  <option value="Un-Assigned">
                    Un-assigned
                  </option>
                  <option value="To-Do">
                    To do
                  </option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="In Review">
                    In Review
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                </b-select>
              </div>
            </b-field>
            <b-field
              label="Due Date"
              horizontal
            >
              <b-datepicker
                v-model="form.dueDate"
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
                type="is-info"
                :loading="isLoading"
                @click="test"
              >
                Test me
              </b-button>
            </b-field>
          </form>
        </card-component>

        <card-component
          v-if="isProfileExists"
          title="Task Overview"
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
              :value="form.description"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Project">
            <b-input
              :value="form.project"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Reporter">
            <b-input
              :value="form.reporter"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Assignee">
            <b-input
              :value="form.assignee"
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
          <b-field label="Due date">
            <b-input
              :value="form.dueDate"
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
// import find from 'lodash/find'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Tiles from '@/components/Tiles.vue'
import CardComponent from '@/components/CardComponent.vue'
// import FilePicker from '@/components/FilePicker.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Notification from '@/components/Notification.vue'

export default defineComponent({
  name: 'TasksForm',
  components: {
    UserAvatar,
    // FilePicker,
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
      loadData: '',
      form: {
        id: '',
        name: '',
        description: '',
        project: '',
        reporter: '',
        assignee: '',
        status: '',
        dueDate: null,
        progress: 0
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Tasks',
        this.isProfileExists ? this.form.name : 'New Task'
      ]
    },
    heroTitle () {
      return this.isProfileExists ? this.form.name : 'Create Task'
    },
    heroRouterLinkTo () {
      return this.isProfileExists ? { name: 'task.new' } : { name: 'Tasks' }
    },
    heroRouterLinkLabel () {
      return this.isProfileExists ? 'New Task' : 'Dashboard'
    },
    formCardTitle () {
      return this.isProfileExists ? 'Edit Task' : 'Create Task'
    },
    ...mapState({
      tasks: state => state.tasks.tasks
    })
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form.id = ''
        this.form.name = ''
        this.form.description = ''
        this.form.reporter = ''
        this.form.project = ''
        this.form.assignee = ''
        this.form.status = ''
        this.form.progress = 0
        this.form.dueDate = null
        // this.createdReadable = new Date().toLocaleDateString()
      } else {
        this.getData()
      }
    },
    'form.status' (newValue) {
      if (newValue === 'Un-Assigned') {
        this.form.progress = 0
      } else if (newValue === 'To-Do') {
        this.form.progress = 25
      } else if (newValue === 'In Progress') {
        this.form.progress = 50
      } else if (newValue === 'In Review') {
        this.form.progress = 75
      } else if (newValue === 'Completed') {
        this.form.progress = 100
      }
    }
  },
  mounted () {
    this.loadData = this.$store.state.projects.projectsCount
    this.getData()
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        const item = this.tasks.find((task) => task._id === this.$route.params.id)

        if (item) {
          this.isProfileExists = true
          this.form.id = item.id
          this.form.name = item.name
          this.form.description = item.description
          this.form.project = item.project
          this.form.reporter = item.reporter
          this.form.assignee = item.assignee
          this.form.status = item.status
          this.form.dueDate = item.dueDate
          this.form.progress = item.progress

          // this.createdReadable = new Date(item.created_mm_dd_yyyy).toLocaleDateString()
        }
      } else {
        this.$router.push({ name: 'task.new' })
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    submit () {
      const taskData = {
        name: this.form.name,
        description: this.form.description,
        reporter: this.form.reporter,
        project: this.form.project,
        assignee: this.form.assignee,
        status: this.form.status,
        progress: this.form.progress,
        dueDate: this.form.dueDate
      }
      const updateTask = {
        taskId: this.$route.params.id,
        task: this.form
      }
      if (this.$route.params.id) {
        this.$store.dispatch('tasks/updateTask', updateTask)
        this.$buefy.snackbar.open({
          message: 'Successfully updated the task',
          queue: true
        })
      } else {
        this.$store.dispatch('tasks/createTasks', taskData)
        this.$buefy.snackbar.open({
          message: 'Successfully created the task',
          queue: true
        })
      }
    },
    test () {
      console.log(this.loadData)
    }
  }
})
</script>
