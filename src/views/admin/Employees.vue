<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Employees
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
          <b>Add to your team </b>
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Users"
        icon="account-multiple"
      >
        <employees-table checkable />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Notification from '@/components/Notification.vue'
import EmployeesTable from '@/components/datagrids/EmployeesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default defineComponent({
  name: 'AdminEmployees',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    EmployeesTable,
    Notification
  },
  data () {
    return {
      titleStack: ['Admin', 'Employees']
    }
  }
})
</script>
