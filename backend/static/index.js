const form = document.getElementById('form');
const waitingSign = document.getElementById('waitingSign');
const inputSumbmitButton = document.getElementById('inputSumbmitButton');
const knnContainer = document.getElementById('knnContainer');
const propheciesContainer = document.getElementById('propheciesContainer');
const similaritiesContainer = document.getElementById('similaritiesContainer');
const similaritiesListId = 'similaritiesList';
const similaritiesKeys = Array.from(document.getElementById(similaritiesListId).children);

form.onsubmit = submit;

function submit(event) {
  event.preventDefault();
  let input = event.target.inputCharacteristics.value;
  input = input.split('\n');
  waitingSign.hidden = false;
  inputSumbmitButton.disabled = true;

  // clear old values
  if (propheciesContainer.firstChild) {
    propheciesContainer.firstChild.remove();
  }
  if (knnContainer.firstChild) {
    knnContainer.firstChild.remove();
  }
  let similaritiesList = document.getElementById(similaritiesListId);
  if (similaritiesList) {
    similaritiesContainer.removeChild(similaritiesList);
  }

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
  // show matches
  let prophecies = json[0];
  ul = document.createElement('ul');
  propheciesContainer.appendChild(ul);

  prophecies.forEach(function (item) {
    let li = document.createElement('li');
    ul.appendChild(li);
    let similarityAsPercent = ((item[1]+1)/2).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
    li.innerHTML += item[0] + " (" + (similarityAsPercent) + ")";
  });

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
  let similarityValues = json[2];

  ulSim = document.createElement('ul');
  ulSim.setAttribute("id", similaritiesListId);

  similaritiesContainer.appendChild(ulSim);

  let index = 0;
  if (similaritiesKeys.length != similarityValues.length) {
    throw "Fehler. Weniger oder Mehr Similarities als vorgesehen";
  }

  similaritiesKeys.forEach(function (item) {
    let li = document.createElement('li');
    let similarityAsPercent = ((similarityValues[index]+1)/2).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
    li.innerHTML = item.innerHTML + ": " + similarityAsPercent
    ulSim.appendChild(li);
    index +=1;
  });

}
