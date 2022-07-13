<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Teams
      <router-link
        slot="right"
        to="/admin"
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
import Notification from '@/components/Notification.vue'
import TeamsTable from '@/components/datagrids/TeamsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

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
      titleStack: ['Employee', 'Teams']
    }
  }
})
</script>
