// const endpoints = {
//   "capsules" : "https://api.spacexdata.com/v4/capsules",
//   "company" : "https://api.spacexdata.com/v4/company",
//   // "https://api.spacexdata.com/v4/cores",
//   // "https://api.spacexdata.com/v4/crew",
//   // "https://api.spacexdata.com/v4/dragons",
//   // "https://api.spacexdata.com/v4/landpads",
//   // "https://api.spacexdata.com/v4/launches",
//   // "https://api.spacexdata.com/v4/launchpads",
//   // "https://api.spacexdata.com/v4/payloads",
//   // "https://api.spacexdata.com/v4/fairings",
//   // "https://api.spacexdata.com/v4/roadster",
//   // "https://api.spacexdata.com/v4/rockets",
//   // "https://api.spacexdata.com/v4/ships",
//   // "https://api.spacexdata.com/v4/starlink",
//   // "https://api.spacexdata.com/v4/history"
// }

// // console.log(endpoints);

// Promise.all(Object.keys(endpoints).map(key => {
//   let endpoint = endpoints[key];
// fetch(endpoint)
//   .then(response => response.json())
//   // .then(data => console.log(data));
//   .then(data => changeUI(data, key))
// }))

// let objectArray = {}

// function changeUI(data, key) {
//   objectArray[key] = data
//   console.log(objectArray);
// }

function getData(endpoint) {
  const url = 'https://api.spacexdata.com/v4/';
  const request = `${url}${endpoint}`;

  return fetch(request)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
}

renderNextLaunch();

function renderNextLaunch() {

  getData('launches/next')

    .then(function(result) {
      //Countdown stuff
      //The launchdate from spacex API
      const launchdate = new Date(result.date_utc).getTime();

        const updateCountdown = setInterval(function() {

        // Current time
        const now = new Date().getTime();

        const timeleft = launchdate - now;

        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        const countdownText = document.querySelector(".countdown");
        countdownText.innerHTML = days + "D " + hours + "H " + minutes + "M " + seconds + "S ";
        }, 1000)


      //Information stuff
      const header = document.querySelector('.header');
      
      const addlinks = `
    
        <div class='launchlinks'>
            <a href='${result.links.youtube_id}' target='_blank'>
              <img class='nextlaunchinfo-img' src="./img/youtube_logo.png">
            </a>

            <a href='${result.links.reddit.campaign}' target='_blank'>
              <img class='nextlaunchinfo-img' src="./img/reddit_logo.png">
            </a>

            <a href='${result.links.wikipedia}' target='_blank'>
              <img class='nextlaunchinfo-img' src="./img/wiki_logo.png">
            </a>
        </div>
      `;

      header.insertAdjacentHTML('beforeend', addlinks);

      const addFlightpatch = `
    
        <div class='flightpatch'>
              <img class='flightpatch-img' src="${result.links.patch.large}">
              <p class='flightpatch-text'>${result.name}</p>
        </div>
      `;

      header.insertAdjacentHTML('beforeend', addFlightpatch);

      console.log(result);
    });
  
  }