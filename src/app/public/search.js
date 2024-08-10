document.getElementById('search-button').addEventListener('click', function() {
  const name = document.getElementById('search-input').value;

  fetch(`http://localhost:3000/search?name=${encodeURIComponent(name)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});
