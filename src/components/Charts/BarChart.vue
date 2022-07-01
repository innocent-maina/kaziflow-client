<template>
  <Bar
    :chart-data="chartData"
    :chart-options="chartOptions"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    chartData: {
      type: Object,
      default: null
    },
    chartOptions: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 150
    }
  }
}
</script>
