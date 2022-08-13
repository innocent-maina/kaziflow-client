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
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        See what's happening on Github

        <a
          slot="right"
          href="https://github.com/InnocentWahome/kaziflow-client.git"
          target="_blank"
          class="button is-white is-small"
        >
          <b-icon
            icon="github-circle"
            custom-size="default"
          />
          <span>GitHub</span>
        </a>
      </notification>

      <tiles>
        <card-widget
          class="tile is-child"
          type="is-danger"
          icon="chart-timeline-variant"
          :number="$store.state.tasks.tasksCount.toString()"
          label="Tasks"
        />
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="$store.state.teams.teamsCount.toString()"
          label="Teams"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="square-edit-outline"
          :number="$store.state.projects.projectsCount.toString()"
          label="Projects"
        />
        <card-widget
          class="tile is-child"
          type="is-secondary"
          icon="account-circle"
          :number="$store.state.employees.employeesCount.toString()"
          label="Employees"
        />
      </tiles>
      <div class="columns">
        <div class="column">
          <card-component
            title="System Overlook (Totals)"
            icon="finance"
            header-icon="reload"
            @header-icon-click="PieChartData"
          >
            <div
              v-if="pieChartData"
              class="chart-area mediaWahome"
            >
              <pie-chart
                :chart-data="pieChartData"
                class=""
                :chart-options="chartOptions"
                :style="{ height: '50%', width: '50%' }"
              />
            </div>
          </card-component>
        </div>
        <div class="column">
          <card-component
            title="Projects Performance"
            icon="finance"
            header-icon="reload"
            @header-icon-click="LineChartData"
          >
            <div
              v-if="lineChartData"
              class="chart-area"
            >
              <line-chart
                class=""
                :chart-data="lineChartData"
                :chart-options="chartOptions"
              />
            </div>
          </card-component>
        </div>
      </div>
      <card-component
        title="Have a quick peek at the tasks"
        class="has-table has-mobile-sort-spaced"
      >
        <tasks-table />
      </card-component>
      <card-component
        title="Yearly Productivity"
        icon="finance"
        header-icon="reload"
        @header-icon-click="BarChartData"
      >
        <div class="chart-area">
          <bar-chart
            :chart-data="barChartData"
            :chart-options="chartOptions"
            :style="{ height: '100%' }"
          />
        </div>
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import * as chartConfig from '@/components/charts/chart.config.js'
import TitleBar from '@/components/BaseTitleBar.vue'
import HeroBar from '@/components/BaseHeroBar.vue'
import Tiles from '@/components/BaseTiles.vue'
import CardWidget from '@/components/BaseCardWidget.vue'
import CardComponent from '@/components/BaseCardComponent.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import TasksTable from '@/components/datagrids/TasksTable.vue'
import Notification from '@/components/BaseNotification.vue'

export default defineComponent({
  name: 'Home',
  components: {
    TasksTable,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar,
    Notification,
    BarChart,
    PieChart
  },
  data () {
    return {
      userRole: this.$store.state.authentication.role,
      titleStackEmployee: ['Employee', 'Dashboard'],
      titleStackAdmin: ['Admin', 'Dashboard'],
      lineChartData: null,
      barChartData: chartConfig.barChartData(),
      pieChartData: null,
      // teamsNumber: this.$store.state.teams.teamsCount,
      // tasksNumber: this.$store.state.tasks.tasksCount,
      // employeesNumber: this.$store.state.employees.employeesCount,
      // projectsNumber: this.$store.state.projects.projectsCount,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            display: true
          },
          x: {
            display: true
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    }
  },
  async mounted () {
    this.LineChartData()
    this.BarChartData()
    this.PieChartData()
    await this.$buefy.snackbar.open({
      message: 'Welcome back ' + this.$store.state.authentication.firstName,
      queue: false
    })
  },
  created () {
    this.$store.dispatch('teams/getAllTeams')
    this.$store.dispatch('tasks/getAllTasks')
    this.$store.dispatch('projects/getAllProjects')
    this.$store.dispatch('employees/getAllEmployees')
  },
  methods: {
    LineChartData () {
      this.lineChartData = chartConfig.lineChartData()
    },
    BarChartData () {
      this.barChartData = chartConfig.barChartData()
    },
    PieChartData () {
      this.pieChartData = chartConfig.pieChartData()
    }
  }
})
</script>

<style scoped>
@media screen and (max-width: 992px) {
  .mediaWahome {
    width: '100%';
    height: '100%';
  }
}
</style>
