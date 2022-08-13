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
      Projects
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
          <b>Done with a project?</b> You can now mark it as Complete or Terminated if you're completely done with it
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="All Projects"
        icon="account-multiple"
      >
        <projects-table checkable />
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Notification from '@/components/BaseNotification.vue'
import ProjectsTable from '@/components/datagrids/ProjectsTable.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'

export default defineComponent({
  name: 'EmployeeProjects',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    ProjectsTable,
    Notification
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStackEmployee: ['Employee', 'Projects'],
      titleStackAdmin: ['Admin', 'Projects']
    }
  }
})
</script>
