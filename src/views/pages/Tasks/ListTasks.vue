<template>
  <div>
    <title-bar
      v-if="userRole == 'Employee'"
      :title-stack="titleStackEmployee"
    />
    <title-bar
      v-if="userRole == 'Admin'"
      :title-stack="titleStackAdmin"
    />
    <hero-bar>
      Tasks
      <router-link
        slot="right"
        to="/dashboard"
        class="button"
      >
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Hurray! </b> Anyone can now assign a task to themselves!
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Available Tasks"
        icon="account-multiple"
      >
        <tasks-table checkable />
      </card-component>
      <hr>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Notification from '@/components/BaseNotification.vue'
import TasksTable from '@/components/datagrids/TasksTable.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'

export default defineComponent({
  name: 'EmployeeTasks',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    TasksTable,
    Notification
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStackEmployee: ['Employee', 'Tasks'],
      titleStackAdmin: ['Admin', 'Tasks']
    }
  }
})
</script>
