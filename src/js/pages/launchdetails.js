import { getData } from '../api.js'

function Launchdetails(id) {
  getData('launches/' + id)

    .then (function(result) {

      const main = document.querySelector('.main');

      //add description information
      const addDescription = `
        <h1 class="details-title">${result.name}</h1>
        <p class="details-description">${result.details}</p>
      `;

      main.insertAdjacentHTML('beforeend', addDescription);

      //addLaunchpad information
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

      //Payload information
      getData('payloads/' + result.payloads[0])

          .then (function (result) {
            console.log(result)

            const addpayload = `
            <div class='payloadinfo hoverscale'>

              <img class='payload-img' src='./img/payload.jpg'>
              <h2 class='payload-title'>Payload</h2>
              <h3 class='payload-type'>Type:${' ' + result.type}</h3>
              <p class='payload-kg'>mass kg:${' ' + result.mass_kg + ' ' + 'kg'}</p>

            </div>
            `;

            const extrainfo = document.querySelector('.extrainfo');
            extrainfo.insertAdjacentHTML('beforeend', addpayload);

          })

      //Countdown (again)
      getData('launches/next')
          .then(function(result) {
            //Place html elements for the countdown
            console.log(result)
            const main = document.querySelector(".main");
            const addCountdown = `

              <div class="details-countdown">

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

            //add flightpatch
            const addFlightpatch = `
                <img class='flightpatch-img' src='${result.links.patch.small}'>
            `;

            main.insertAdjacentHTML('beforeend', addFlightpatch);
        })
      
      //Add backbutton
      const addBackButton = `
        <div class="backbutton">
          <a href="#">❮</a>
        </div>
      `;

        main.insertAdjacentHTML('beforeend', addBackButton);

    })
}

export default Launchdetails