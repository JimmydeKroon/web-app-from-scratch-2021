# Spacex upcoming launch app

This webapp wil show the upcoming Spacex launch and details about the launch. Look at he live demo [here](https://jimmydekroon.github.io/web-app-from-scratch-2021/src)

The app will show when the next Spacex launch will take place exactly. There will also be links to the livestream (if there is one), reddit campaign and wikipedia page. Detailed information will be available under the main information, this will feature information about launching/landing site, used capsules and rockets, the payloads and more.

## The Spacex API

Visit the API github repository here [Spacex API](https://github.com/r-spacex/SpaceX-API).
Information about the endpoints and how to get there [Spacex docs](https://github.com/r-spacex/SpaceX-API/blob/master/docs/v4/README.md)

The main endpoint to be used is /next (https://api.spacexdata.com/v4/next). This is where the information about the upcoming launch is stored. Values like the next launch date and links to livestreams etc. are taken from here. Detailed information is taken from their endpoints attached with an id. For example: the launchpad to be used can be found in (https://api.spacexdata.com/v4/next) as an id. This id can then be used to look for information about the specific launchpad (https://api.spacexdata.com/v4/launchpad/:id). 

### features

#### Countdown timer
The API gives a date or date (utc). Since it is a rocket launch i would like to make a countdown until launch.

#### details

Add details about launchpad used, type of rocket etc.


### Code

#### Promise all experiment

In the first week i tried getting all the API data in one call since i didn't know wich data i wanted to use. I tried this with a promise all and saving all the endpoints in an object array. This worked but the data came back in one large object and it was difficult to filter trough. Later i opted for a simpler solution wich requires me to make calls again if i want new data

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