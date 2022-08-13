<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <!-- :checkable="checkable" -->
    <b-table
      :checked-rows.sync="checkedRows"
      :paginated="paginated"
      :per-page="perPage"
      :data="employees"
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
        label="First Name"
        field="firstName"
        sortable
      >
        {{ props.row.firstName }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Last Name"
        field="lastName"
        sortable
      >
        {{ props.row.lastName }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Email"
        field="email"
        sortable
      >
        {{ props.row.email }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Phone Number"
        field="phoneNumber"
        maxlength="10"
        minlength="7"
        sortable
      >
        {{ props.row.phoneNumber }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Role"
        field="role"
        sortable
      >
        {{ props.row.role }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Member Since"
        field="createdAt"
        sortable
      >
        {{ props.row.createdAt }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right no-wrap">
          <router-link
            :to="{name:'admin-employee.edit', params: {id: props.row._id}}"
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
  name: 'EmployeesTable',
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
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
  },

  computed: {
    paginated () {
      return this.$store.state.employees.employees.length > this.perPage
    },

    ...mapState({
      employees: state => state.employees.employees
    })

  },
  created () {
    this.getEmployees()
  },
  methods: {
    getEmployees () {
      this.$store.dispatch('employees/getAllEmployees')
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
      this.$store.dispatch('employees/deleteEmployee', obj._id)
      this.$buefy.snackbar.open({
        message: 'Deleted Employee ' + obj.firstName,
        queue: true
      })
      this.$store.dispatch('employees/getAllEmployees')
      this.getEmployees()
    }
  }
})
</script>
