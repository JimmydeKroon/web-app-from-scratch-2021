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