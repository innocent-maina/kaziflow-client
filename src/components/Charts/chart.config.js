export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860'
  }
}

const myChartData = n => {
  const data = []

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200))
  }

  return data
}

const datasetObject = (color, points) => {
  return {
    fill: true,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: myChartData(points),
    tension: 0.5,
    cubicInterpolationMode: 'default'
  }
}

export const lineChartData = (points = 6) => {
  const labels = []

  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`)
  }

  return {
    labels,
    datasets: [
      datasetObject('primary', points),
      datasetObject('info', points),
      datasetObject('danger', points)
    ]
  }
}

export const barChartData = (points = 12) => {
  const labels = []

  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`)
  }

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      datasetObject('primary', points),
      datasetObject('info', points),
      datasetObject('danger', points)
    ]
  }
}

export const pieChartData = () => {
  return {
    labels: ['Project One', 'Project Two', 'Project Three', 'Other'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [4, 2, 14, 9]
      }
      // datasetObject('primary', 40),
      // datasetObject('info', 20),
      // datasetObject('danger', points)
    ]
  }
}
