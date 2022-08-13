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
      Teams
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
          <b>See what the teams have been working on </b>
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Teams"
        icon="account-multiple"
      >
        <teams-table checkable />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Notification from '@/components/BaseNotification.vue'
import TeamsTable from '@/components/datagrids/TeamsTable.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'

export default defineComponent({
  name: 'EmployeeTeams',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    TeamsTable,
    Notification
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStackEmployee: ['Employee', 'Teams'],
      titleStackAdmin: ['Admin', 'Teams']
    }
  }
})
</script>
