import { getData } from './api.js'
import './routie.min.js'

import Home from './pages/home.js'
import Launch from './pages/launch.js'

function handleRoutes() {

  console.log('handleRoutes');

  function clearElement(node) {
    while (node.firstChild) {
      node.removeChild(node.lastChild);
    }
  }

  const main = document.querySelector('.main')

  routie({
    '': () => {
      
      clearElement(main);
      Home();

    },


    'details/:id': (id) => {

      clearElement(main);
      Launch(id);
  
    }
  })

}

export { handleRoutes }