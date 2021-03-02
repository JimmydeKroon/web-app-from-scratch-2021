import { getData } from '../api.js'

function Home() {
  getData('launches/next')

    .then(function(result) {
      //Place html elements for the countdown
      const main = document.querySelector(".main");
      const addCountdown = `
        <h1 class="countdown-title">The next Spacex launch is in</h1>

        <div class="countdown">

          <div class="countdown-wrap">
            <div class="countdown-days"></div>
            <div class="countdown-label">Days</div>
          </div>

          <div class="countdown-wrap">
            <div class="countdown-hours"></div>
            <div class="countdown-label">Hours</div>
          </div>

          <div class="countdown-wrap">
            <div class="countdown-minutes"></div>
            <div class="countdown-label">Minutes</div>
          </div>

          <div class="countdown-wrap">
            <div class="countdown-seconds"></div>
            <div class="countdown-label">Seconds</div>
          </div>

        </div>
        `;

        main.insertAdjacentHTML('beforeend', addCountdown);

      //The launchdate from spacex API
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


    //Add links to Youtube, Reddit and Wiki
    
    const addLinks = `
  
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

    main.insertAdjacentHTML('beforeend', addLinks);

    //Add linkshelper
    
    const addLinkshelper = `
      <span class='linkshelper'>&#10548;</span>
      <span class='linkshelper-text'>Watch or read up on this launch with the following links!</span>
    `;

    main.insertAdjacentHTML('beforeend', addLinkshelper);
    
    //Add details button
    
    const addDetailsButton = `
    <div class="detailsbutton">
      <a href="#details/${result.id}">See launch details</a>
    </div>
    `;

    main.insertAdjacentHTML('beforeend', addDetailsButton);

  });
}

export default Home