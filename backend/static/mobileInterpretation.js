const headlineParent = document.getElementById('headlineParent');
const resultsParent = document.getElementById('resultsParent');

fetch('getMatchAndInput',{
      method: "GET",
    }).then(function(response) {
        response.json().then(function (json) {
                console.log(json);
                renderUpdatedResults(json);
        });
  })

function renderUpdatedResults(json) {
  // Headline
  let headline = document.createElement('h1');
  headline.innerHTML = "Interpretation for " + json[3][0];
  headlineParent.appendChild(headline);

  // Results
  let prophecies = json[0];
  ul = document.createElement('ul');

  prophecies.forEach(function (item) {
    let li = document.createElement('li');
    ul.appendChild(li);
    let similarityAsPercent = ((item[1]+1)/2).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
    li.innerHTML += item[0] + " (" + (similarityAsPercent) + ")";
  });
  
  resultsParent.appendChild(ul);

}

//<h1> Interpretation for ToDo </h1>
