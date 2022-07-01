<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        New Github updates

        <a
          slot="right"
          href="#"
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

      <card-component
        title="Performance"
        icon="finance"
        header-icon="reload"
        @header-icon-click="fillChartData"
      >
        <div
          v-if="chartData"
          class="chart-area"
        >
          <line-chart
            :chart-data="chartData"
            :chart-options="chartOptions"
            :style="{height: '100%'}"
          />
        </div>
      </card-component>

      <card-component
        title="Recently Completed Tasks"
        class="has-table has-mobile-sort-spaced"
      >
        <tasks-table />
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
    Notification
  },
  data () {
    return {
      titleStack: ['Employee', 'Dashboard'],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            display: false
          },
          x: {
            display: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  mounted () {
    this.fillChartData()

    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  methods: {
    fillChartData () {
      this.chartData = chartConfig.sampleChartData()
    }
  }
})
</script>
