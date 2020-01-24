const form = document.getElementById('form');
const waitingSign = document.getElementById('waitingSign');
const inputSumbmitButton = document.getElementById('inputSumbmitButton');
const knnContainer = document.getElementById('knnContainer');
const similaritiesList = document.getElementById('similaritiesList');
const similaritesItems = similaritiesList.children;


form.onsubmit = submit;

function submit(event) {
  event.preventDefault();
  let input = event.target.inputCharacteristics.value;
  input = input.split('\n');
  waitingSign.hidden = false;
  inputSumbmitButton.disabled = true;
  if (knnContainer.firstChild) {
    knnContainer.firstChild.remove();
  }
  similaritiesList.children = similaritesItems;
  //please wait 

  fetch('postAttributes?words=' + input,{
        method: "POST",
      }).then(function(response) {
    waitingSign.hidden = true;
    inputSumbmitButton.disabled = false;
    getResults();
    })
}

function getResults() {
  fetch('getMatch',{
        method: "GET",
      }).then(function(response) {
          response.json().then(function (json) {
                  showUpdatedResults(json);
          });
    })
}

function showUpdatedResults(json) {
  // show Nearest Neighbours
  let knns = json[1];
  ul = document.createElement('ul');
  knnContainer.appendChild(ul);
  
  knns.forEach(function (item) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML += item;
  });
  //showSimilarities  
  //let similarityValues = json[2];
  let similarityValues = [0.01, 0.02];  
  
  //check list length and response length
  //if similarityValues.length != similaritiesList.children.length {problem}
  let similarityKeys = Array.from(similaritiesList.children);
  let index = 0;
  similarityKeys.forEach(function (item) {
    item.innerHTML += similarityValues[index];
    index +=1;
  });
  //show Similaritiers
  //foreach listenelement
  //falls liste und responseliste verschieden lang: Fehler
  
}