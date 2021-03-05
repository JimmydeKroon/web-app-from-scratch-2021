import { getData } from './api.js'

function showLaunches(data) {
  return `
  ${data.slice(0, 8).map(launch => (
    `<div class='launchlist'>
      <p>${launch.name}</p>
      <a href="#details/${launch.id}">View</a>
    </div>`
  ))}
  `
}

export { showLaunches }

