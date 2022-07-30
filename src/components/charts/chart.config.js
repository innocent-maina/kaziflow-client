import store from '../../store'
export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860'
  }
}

// const myChartData = n => {
//   const data = []

//   for (let i = 0; i < n; i++) {
//     data.push(Math.round(Math.random() * 200))
//   }

//   return data
// }

// const datasetObject = (color, points) => {
//   return {
//     fill: true,
//     borderColor: chartColors.default[color],
//     borderWidth: 2,
//     borderDash: [],
//     borderDashOffset: 0.0,
//     pointBackgroundColor: chartColors.default[color],
//     pointBorderColor: 'rgba(255,255,255,0)',
//     pointHoverBackgroundColor: chartColors.default[color],
//     pointBorderWidth: 20,
//     pointHoverRadius: 4,
//     pointHoverBorderWidth: 15,
//     pointRadius: 4,
//     data: myChartData(points),
//     tension: 0.5,
//     cubicInterpolationMode: 'default'
//   }
// }

export const lineChartData = () => {
  const teamsNumber = store.state.teams.teamsCount
  const tasksNumber = store.state.tasks.tasksCount
  const projectsNumber = store.state.projects.projectsCount
  return {
    labels: ['Projects', 'Tasks', 'Teams'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [projectsNumber, tasksNumber, teamsNumber]
      }
    ]
  }
}

export const barChartData = () => {
  const teamsNumber = store.state.teams.teamsCount
  const tasksNumber = store.state.tasks.tasksCount
  const employeesNumber = store.state.employees.employeesCount
  const projectsNumber = store.state.projects.projectsCount

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [projectsNumber, tasksNumber, employeesNumber, teamsNumber]
      }
    ]
  }
}

export const pieChartData = () => {
  const teamsNumber = store.state.teams.teamsCount
  const tasksNumber = store.state.tasks.tasksCount
  const employeesNumber = store.state.employees.employeesCount
  const projectsNumber = store.state.projects.projectsCount
  return {

    labels: ['Projects', 'Tasks', 'Employees', 'Teams'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [projectsNumber, tasksNumber, employeesNumber, teamsNumber]
      }
    ]
  }
}
