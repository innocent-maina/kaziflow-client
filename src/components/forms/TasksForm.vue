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
          <span><b>change me.</b> changed</span>
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
                placeholder="e.g. John Doe"
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
                placeholder="e.g. Berton & Steinway"
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
                placeholder="e.g. Geoffreyton"
                required
              />
            </b-field>
            <b-field
              label="Assignee"
              horizontal
            >
              <b-datepicker
                v-model="form.created_date"
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
          <b-field label="Reporter">
            <b-input
              :value="form.reporter"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Assignee">
            <b-input
              :value="createdReadable"
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
import find from 'lodash/find'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Tiles from '@/components/Tiles.vue'
import CardComponent from '@/components/CardComponent.vue'
import FilePicker from '@/components/FilePicker.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Notification from '@/components/Notification.vue'

export default defineComponent({
  name: 'TasksForm',
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
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
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
      return this.isProfileExists ? { name: 'task.new' } : { name: 'AdminTasks' }
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
        this.form.id = null
        this.form.name = null
        this.form.description = null
        this.form.reporter = null
        this.form.created_date = new Date()
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
          this.tasks,
          // eslint-disable-next-line dot-notation
          (item) => item._id === '62aa2913b9205decba42c416' // parseInt(this._id)
        )
        console.log('below is item')
        console.log(item)
        if (item) {
          this.isProfileExists = true
          this.form.id = item._id
          this.form.name = item.name
          this.form.description = item.description
          this.form.reporter = item.reporter[0]
          this.form.progress = item.progress
          this.form.created_date = new Date(item.created_mm_dd_yyyy)

          this.createdReadable = new Date(item.created_mm_dd_yyyy).toLocaleDateString()
        } else {
          this.$router.push({ name: 'task.new' })
        }
      }
    },
    dateInput (v) {
      this.createdReadable = new Date(v).toLocaleDateString()
    },
    submit () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 750)
    }
  }
})
</script>
