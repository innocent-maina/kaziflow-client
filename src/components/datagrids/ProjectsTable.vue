//eslint-disable vue/this-in-template
<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <!-- {{ projects }} -->
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :paginated="paginated"
      :per-page="perPage"
      :data="projects"
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
        field="name"
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
        label="Category"
        field="category"
        sortable
      >
        {{ props.row.category }}
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
        label="Leader"
        field="leader"
        sortable
      >
        {{ props.row.leader }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Team"
        field="team"
        sortable
      >
        {{ props.row.team }}
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
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div
          v-if="userRole == 'admin'"
          class="buttons is-right no-wrap"
        >
          <router-link
            :to="{name:'project.edit', params: {id: props.row._id}}"
            class="button is-small is-info"
          >
            <b-icon
              icon="account-edit"
              size="is-small"
            />
          </router-link>
          <b-button
            type="is-danger"
            size="is-small"
            @click.prevent="trashModalOpen(props.row)"
            @click="remove(props.row._id)"
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
import ModalBox from '@/components/ModalBox.vue'

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
      return this.$store.state.projects.projects.length > this.perPage
    },

    ...mapState({
      projects: state => state.projects.projects
    })

  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.$store.dispatch('projects/getAllProjects')
    },
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false

      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    remove (id) {
      this.$store.dispatch('projects/deleteProject', id)
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
})
</script>
