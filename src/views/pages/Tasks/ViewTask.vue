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
      <tiles>
        <card-component
          v-if="isProfileExists"
          title="Task Overview"
          icon="account"
          class="tile is-child"
        >
          <div class="columns">
            <div class="column">
              <p class="subtitle">
                Reporter:
              </p>
              <div class="columns">
                <div class="column">
                  <user-avatar
                    :avatar="form.avatar"
                    class="image has-max-width is-aligned-left"
                  />
                </div>
                <div class="column">
                  <p class="subtitle">
                    <a href="">{{ form.reporter }} LastName</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="column">
              <p class="subtitle">
                Assignee
              </p>
              <div class="columns">
                <div class="column">
                  <user-avatar
                    :avatar="form.avatar"
                    class="image has-max-width is-aligned-left"
                  />
                </div>
                <div class="column">
                  <p class="subtitle">
                    <a href="">{{ form.assignee }} LastName</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <b-field label="Name">
            <p class="subtitle">
              {{ form.name }}
            </p>
          </b-field>
          <b-field label="Description">
            <p class="subtitle">
              {{ form.description }}
              <br>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              cupiditate. Culpa aut laudantium ratione, aliquam et, illum dolore
              optio at vitae asperiores reiciendis? Reiciendis explicabo
              suscipit est delectus quae at ut dicta sequi maiores soluta omnis
              enim minus tempora, ratione placeat officia ducimus quas voluptate
              dolorem eligendi? Cupiditate quos beatae suscipit reprehenderit
              corporis repudiandae dignissimos sapiente assumenda velit numquam
              asperiores amet, saepe in. Reiciendis mollitia repellat nam harum
              perferendis, itaque labore porro, error eaque, vitae dolorum
              deleniti. Aliquam dolorem nisi reiciendis, eligendi totam
              consectetur atque sint quae iure! Impedit magni exercitationem nam
              velit beatae excepturi optio architecto aperiam quam quis.
            </p>
          </b-field>
          <hr>
        </card-component>
        <card-component
          v-if="isProfileExists"
          title="Meta "
          icon="account"
          class="tile is-child"
        >
          <b-field label="Project">
            <b-input
              :value="form.project"
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
// import Notification from '@/components/Notification.vue'

export default defineComponent({
  name: 'TasksForm',
  components: {
    UserAvatar,
    // FilePicker,
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar
    // Notification
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
        avatar: 'https://avatars.dicebear.com/v2/gridy/Hope-Howe.svg',
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
      return ['Tasks', this.isProfileExists ? this.form.name : 'New Task']
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
      tasks: (state) => state.tasks.tasks
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
        const item = this.tasks.find(
          (task) => task._id === this.$route.params.id
        )

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
