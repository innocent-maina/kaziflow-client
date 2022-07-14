<template>
  <div>
    <title-bar :title-stack="titleStack" />
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
          :number="$store.state.tasks.tasksCount"
          label="Tasks"
        />
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="$store.state.teams.teamsCount"
          label="Teams"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="square-edit-outline"
          :number="$store.state.projects.projectsCount"
          label="Projects"
        />
        <card-widget
          class="tile is-child"
          type="is-secondary"
          icon="account-circle"
          :number="$store.state.employees.employeesCount"
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
                :style="{ height: '40%', width: '60%' }"
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
              class="chart-area mediaWahome"
            >
              <line-chart
                class="mediaWahome"
                :chart-data="lineChartData"
                :chart-options="chartOptions"
                :style="{ height: '100%', width: '80%' }"
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
import * as chartConfig from '@/components/Charts/chart.config.js'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Tiles from '@/components/Tiles.vue'
import CardWidget from '@/components/CardWidget.vue'
import CardComponent from '@/components/CardComponent.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import TasksTable from '@/components/datagrids/TasksTable.vue'
import Notification from '@/components/Notification.vue'
import BarChart from '../../components/Charts/BarChart.vue'
import PieChart from '../../components/Charts/PieChart.vue'

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
      titleStack: ['Employee', 'Dashboard'],
      lineChartData: null,
      barChartData: null,
      pieChartData: null,
      teamsNumber: parseInt(this.$store.state.teams.teamsCount),
      tasksNumber: parseInt(this.$store.state.tasks.tasksCount),
      employeesNumber: parseInt(this.$store.state.employees.employeesCount),
      projectsNumber: parseInt(this.$store.state.projects.projectsCount),
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
