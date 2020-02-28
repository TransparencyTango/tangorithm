const title = document.getElementById('title');
const headline = document.getElementById('headline');

fetch('getInput',{
      method: "GET",
    }).then(function(response) {
        response.json().then(function (json) {
                title.innerHTML = json[0];
                headline.innerHTML = json[0];
        });
  })
