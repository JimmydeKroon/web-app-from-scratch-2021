const endpoints = [
  "https://api.spacexdata.com/v4/capsules",
  "https://api.spacexdata.com/v4/company",
  "https://api.spacexdata.com/v4/cores",
  "https://api.spacexdata.com/v4/crew",
  "https://api.spacexdata.com/v4/dragons",
  "https://api.spacexdata.com/v4/landpads",
  "https://api.spacexdata.com/v4/launches",
  "https://api.spacexdata.com/v4/launchpads",
  "https://api.spacexdata.com/v4/payloads",
  "https://api.spacexdata.com/v4/fairings",
  "https://api.spacexdata.com/v4/roadster",
  "https://api.spacexdata.com/v4/rockets",
  "https://api.spacexdata.com/v4/ships",
  "https://api.spacexdata.com/v4/starlink",
  "https://api.spacexdata.com/v4/history"
]

console.log(endpoints.capsules);

// fetch(url)
//   .then((response) => {
//     // console.log(response);
//     response.json().then((data) => {
//         console.log(data);
//         dataRender(data.data);
//     });
// });

// function dataRender(data) {
//   console.log(data);
// }

Promise.all(endpoints.map(endpoint =>
fetch(endpoint)
  .then(response => response.json())
  // .then(data => console.log(data));
  .then(data => changeUI(data))
))

function changeUI(data) {
  console.log(data);
}