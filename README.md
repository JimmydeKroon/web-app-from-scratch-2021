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


