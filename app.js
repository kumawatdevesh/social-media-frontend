fetch('https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=pizza', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => {
  return res.json();
})
.then(res => {
  console.log(res);
})
.catch(err => {
  console.dir(err);
})