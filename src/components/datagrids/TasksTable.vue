<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :paginated="paginated"
      :per-page="perPage"
      :data="tasks"
      default-sort="name"
      striped
      hoverable
    >
      <b-table-column
        v-slot="props"
        cell-class="has-no-head-mobile is-image-cell"
      >
        <div class="image">
          <img
            :src="props.row.avatar"
            class="is-rounded"
          >
        </div>
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Name"
        field="company"
        sortable
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Description"
        field="description"
        sortable
      >
        {{ props.row.description }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Project"
        field="project"
        sortable
      >
        {{ props.row.project }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Reporter"
        field="reporter"
        sortable
      >
        {{ props.row.reporter }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Assignee"
        field="assignee"
        sortable
      >
        {{ props.row.assignee }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Status"
        field="status"
        sortable
      >
        {{ props.row.status }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        cell-class="is-progress-col"
        label="Progress"
        field="progress"
        sortable
      >
        <progress
          class="progress is-small is-info"
          :value="props.row.progress"
          max="100"
        >
          {{ props.row.progress }}
        </progress>
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Due dates"
      >
        <small
          class="has-text-grey is-abbr-like"
          :title="props.row.dueDate"
        >{{ props.row.dueDate.split("T")[0]
        }}</small>
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right no-wrap">
          <router-link
            :to="{ name: 'task.edit', params: { id: props.row._id } }"
            class="button is-small is-info"
          >
            <b-icon
              icon="account-edit"
              size="is-small"
            />
          </router-link>
          <!-- <b-button
            v-if="userRole == 'Admin'"
            type="is-danger"
            size="is-small"
            @click.prevent="trashModalOpen(props.row)"
            @click="trashConfirm(props.row._id)"
          >
            <b-icon
              icon="trash-can"
              size="is-small"
            />
          </b-button> -->
          <b-button
            type="is-danger"
            size="is-small"
            @click="deleteItem(props.row)"
          >
            <b-icon
              icon="trash-can"
              size="is-small"
            />
          </b-button>
        </div>
      </b-table-column>

      <section
        slot="empty"
        class="section"
      >
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large"
            />
          </p>
          <p>Nothing's here&hellip;</p>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapState } from 'vuex'
import ModalBox from '@/components/BaseModalBox.vue'

export default defineComponent({
  name: 'TasksTable',
  components: { ModalBox },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
  },

  computed: {
    paginated () {
      return this.$store.state.tasks.tasks.length > this.perPage
    },

    ...mapState({
      tasks: state => state.tasks.tasks
    })

  },
  created () {
    this.getTasks()
  },
  methods: {
    getTasks () {
      this.$store.dispatch('tasks/getAllTasks')
    },
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm (id) {
      this.isModalActive = false
      this.$store.dispatch('tasks/deleteTask', id)
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    deleteItem (obj) {
      this.$store.dispatch('tasks/deleteTask', obj._id)
      this.$buefy.snackbar.open({
        message: 'Deleted Task ' + obj.name,
        queue: true
      })
      this.getTasks()
    }
  }
})
</script>
