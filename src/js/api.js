async function getData(endpoint) {
  const url = 'https://api.spacexdata.com/v4/';
  const request = `${url}${endpoint}`;

  const result = await fetch(request)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
  
  return result
}

export { getData }