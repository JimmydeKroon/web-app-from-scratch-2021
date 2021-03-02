# Spacex upcoming launch app
![home](docs/img/home.gif "Home countdown")

This webapp wil show the upcoming Spacex launch and details about the launch. Look at he live demo [here!](https://jimmydekroon.github.io/web-app-from-scratch-2021/src/index.html)

The app will show when the next Spacex launch will take place exactly. There will also be links to the livestream (if there is one), reddit campaign and wikipedia page. Detailed information will be available under the main information, this will feature information about launching/landing site, used capsules and rockets, the payloads and more.

## The Spacex API

- Visit the API github repository here [Spacex API](https://github.com/r-spacex/SpaceX-API).
- Information about the endpoints and how to get there [Spacex docs](https://github.com/r-spacex/SpaceX-API/blob/master/docs/v4/README.md)
- Request limit: 50 requests per second.

The main endpoint to be used is /next (https://api.spacexdata.com/v4/next). This is where the information about the upcoming launch is stored. Values like the next launch date and links to livestreams etc. are taken from here. Detailed information is taken from their endpoints attached with an id. For example: the launchpad to be used can be found in (https://api.spacexdata.com/v4/next) as an id. This id can then be used to look for information about the specific launchpad (https://api.spacexdata.com/v4/launchpad/:id).

This fetch will give you data about the upcoming launch
```JS
fetch('https://api.spacexdata.com/v4/launches/next')
```

this fetch will give you data about a specific payload
```JS
fetch('https://api.spacexdata.com/v4/payloads/:id')
```

Request limit information: 50 requests per second.

## features

### Countdown timer
![home](docs/img/home.gif "Home countdown")

The API gives a date or date (utc). Since it is a rocket launch i turned the dat into a countdown timer, her is how i did that:
```JS
const launchdate = new Date(result.date_utc).getTime();

      const updateCountdown = setInterval(function() {

        // Current time
        const now = new Date().getTime();

        const timeleft = launchdate - now;

        const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        const countdownDays = document.querySelector('.countdown-days');
        const countdownHours = document.querySelector('.countdown-hours');
        const countdownMinutes = document.querySelector('.countdown-minutes');
        const countdownSeconds = document.querySelector('.countdown-seconds');

        countdownDays.innerHTML = days;
        countdownHours.innerHTML = hours;
        countdownMinutes.innerHTML = minutes;
        countdownSeconds.innerHTML = seconds;

      }, 1000)
```

I get the time of launch and turn it into milliseconds elapsed since 1 January 1970 00:00:00 UTC with .getTime.
I do the same for the current time and the substract the current time from the launchtime to get the remaining amount of milliseconds. I then calculate the days, hours, minutes and seconds and assign them to their html element so it updates on the page. This function runs every second so the html gets updated every second.

### External links
On the "home" page you can see 3 buttons to the right of the countdown. These link to the youtube channel for the livestream of the launch (if there is one), the reddit campaign and the wikipedia page of the mission/campaign.

### details
![Details](docs/img/details.png "Details page")
Clicking on the see launch details button will route to this page, extra information about the upcoming launch will be shown. In the router i give launchdetails id wich i can then use later on in that function (this is the id for that launch from the data, i need this for my second api call).

```JS
routie({
    '': () => {
      
      clearElement(main);
      Home();

    },


    'details/:id': (id) => {

      clearElement(main);
      Launchdetails(id);
  
    }  
  })
```
```JS
function Launchdetails(id) {
  getData('launches/' + id)

    .then (function(result) {
```
I can now access the new data (from launches/:id) in the .then function. This is where the description is located.

With another api call i retrieve the information about the specific launchpad used in this launch. (result.launchpad returns the id from launchpad in launches/:id)

```JS
getData('launchpads/' + result.launchpad)
        .then (function(result) {
          
          const addLaunchpad = `
            <div class='extrainfo'>

              <div class='launchpadinfo hoverscale'>

                <img class='launchpad-img' src='./img/launchpad.jpg'>
                <h2 class='launchpad-title'>Launchpad</h2>
                <h3 class='launchpad-name'>${result.full_name}</h3>
                <p class='launchpad-location'>Location:${' ' + result.locality + ', ' + result.region}</p>

              </div>

            </div>
          `;

          main.insertAdjacentHTML('beforeend', addLaunchpad);

        })
```

I use the same trick for the payloads information but in this case i use:
```JS
getData('payloads/' + result.payloads[0])
```
I use 0 because result.payloads is an object array and i chose to simply return the first value for now.

## Just some code

### fetch
This function will make it so i can call getData() and tell it which information i want. For example getData(launches/next) will send a fetch request to 'https://api.spacexdata.com/v4/launches/next'. Because i export this function i can quickly make api calls to specific endpoints using getData(), this api has a lot of endpoints so this is super handy!

```JS
function getData(endpoint) {
  const url = 'https://api.spacexdata.com/v4/';
  const request = `${url}${endpoint}`;

  return fetch(request)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
}

export { getData }
```

### router
The router i use is routie. I simply import the routie js file and the necessary functions to build the pages. If the hash is empty the Home() function from home.js will be used. If the hash is details + the next launch id Launchdetails() from launchdetails.js is called, this will also get the id from the hatch and give it to the launchdetails function so it can be used in launchdetails.js. In both cases clearElement(main) clears all html content so it is nice and clean for the new data.

```JS
import './routie.min.js'

import Home from './pages/home.js'
import Launchdetails from './pages/launchdetails.js'

function handleRoutes() {

  const main = document.querySelector('.main');

  routie({
    '': () => {
      
      clearElement(main);
      Home();

    },


    'details/:id': (id) => {

      clearElement(main);
      Launchdetails(id);
  
    }  
  })

  function clearElement(node) {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  }

}

export { handleRoutes }
```

## Actor diagram
![actor-diagram](docs/img/actor-diagram.png "Home countdown")

## Promise all experiment

In the first week i tried getting all the API data in one call since i didn't know wich data i wanted to use. I tried this with a promise all and saving all the endpoints in an object array. This worked but the data came back in one large object and it was difficult to filter trough. Later i opted for a simpler solution which requires me to make calls again if i want new data

What i tried first:

```
const endpoints = {
  "capsules" : "https://api.spacexdata.com/v4/capsules",
  "company" : "https://api.spacexdata.com/v4/company",
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
}

// console.log(endpoints);

Promise.all(Object.keys(endpoints).map(key => {
  let endpoint = endpoints[key];
fetch(endpoint)
  .then(response => response.json())
  // .then(data => console.log(data));
  .then(data => changeUI(data, key))
}))

let objectArray = {}

function changeUI(data, key) {
  objectArray[key] = data
  console.log(objectArray);
}
```

how it is now:

```
function getData(endpoint) {
  const url = 'https://api.spacexdata.com/v4/';
  const request = `${url}${endpoint}`;

  return fetch(request)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
}
```