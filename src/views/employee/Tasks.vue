<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Tasks
      <router-link
        slot="right"
        to="/employee"
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
        title="All Tasks"
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
import Notification from '@/components/Notification.vue'
import TasksTable from '@/components/datagrids/TasksTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

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
      titleStack: ['Employee', 'Tasks']
    }
  }
})
</script>
