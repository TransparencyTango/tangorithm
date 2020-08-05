const form = document.getElementById('form')
form.onsubmit = submit;
const generateButton = document.getElementById('inputSubmitButton');
const video = document.getElementById('animation');
//const results;



window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
  //switch on the state
  switch (event.state.page) {
    case "start":
      showStartPage();
      break;
    default: //start
      alert("default after pop state");
  }
};

function showStartPage() {
  // start filler video;
  // show Form
  // hide everything else
}

// Vorspann-Video,
// Drehungsvideo,
// Ergebnisvideo
function showInterpretationIntroVideos() {
  // show Vorspann
  // then show Drehung
  // (then go to result Page)
  video.addEventListener('ended',showNextVideo,false);
  // show next video
  function showNextVideo(){
          video.setAttribute("src", "{{second_video}}" );
          video.load();
          video.play();
     };
}

function submit(event) {
  event.preventDefault();
  let name = event.target.inputKidsName.value;
  //todo: sanitize names? Split them?
  generateButton.disabled = true;
  fetch('postAttributes?words=' + name,{
        method: "POST",
      }).then(function(response) {
        results = response;
        generateButton.disabled = false;
        history.pushState({page: "start"}, "", "");
        showInterpretationIntroVideos();

    })
}

//<input type="button" onclick="fetch('resetMirror', {method: 'POST' }).then(function(response) {window.location.href=('mobileStart');})" value="Reset"/>
