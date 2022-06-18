<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Tasks Backlog
      <router-link
        slot="right"
        to="/"
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
          <b>Tasks have been updated since you were last here </b>
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
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="My Tasks"
        icon="account-multiple"
      >
        <tasks-table checkable />
      </card-component>

      <!-- <hr>

      <notification class="is-info">
        <div>
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <tasks-table
          checkable
        />
      </card-component>

      <hr>

      <notification class="is-info">
        <div>
          <b-icon
            icon="buffer"
            custom-size="default"
          />
          <b>Empty table.</b> When there's nothing to show
        </div>
      </notification>

      <card-component class="has-table has-thead-hidden">
        <tasks-table is-empty />
      </card-component> -->
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
