import { getData } from './api.js'
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