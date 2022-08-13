<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <!-- {{ teams }} -->
    <b-table
      :checked-rows.sync="checkedRows"
      :paginated="paginated"
      :per-page="perPage"
      :data="teams"
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
        label="Responsibilities"
        field="responsibilities"
        sortable
      >
        {{ props.row.responsibilities }}
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
        label="Members"
        field="members"
        sortable
      >
        {{ props.row.members }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div
          v-if="userRole == 'Admin'"
          class="buttons is-right no-wrap"
        >
          <router-link
            :to="{name:'team.edit', params: {id: props.row._id}}"
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
  name: 'TeamsTable',
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
      return this.$store.state.teams.teams.length > this.perPage
    },

    ...mapState({
      teams: state => state.teams.teams
    })

  },
  created () {
    this.getTeams()
  },
  methods: {
    getTeams () {
      this.$store.dispatch('teams/getAllTeams')
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
    trashCancel () {
      this.isModalActive = false
    },
    deleteItem (obj) {
      this.$store.dispatch('teams/deleteTeam', obj._id)
      this.$buefy.snackbar.open({
        message: 'Deleted Team ' + obj.name,
        queue: true
      })
      this.$store.dispatch('teams/getAllTeams')
      this.getTeams()
    }
  }
})
</script>
