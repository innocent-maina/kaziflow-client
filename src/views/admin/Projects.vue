<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Projects
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
          <b>Done with a project? You can now mark it as complete </b>
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
import Notification from '@/components/Notification.vue'
import ProjectsTable from '@/components/datagrids/ProjectsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

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
      titleStack: ['Employee', 'Projects']
    }
  }
})
</script>
