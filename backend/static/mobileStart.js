const form = document.getElementById('form')

form.onsubmit = submit;

function submit(event) {
  event.preventDefault();
  let name = event.target.inputKidsName.value;
  //todo: sanitize names? Split them?
  fetch('postAttributes?words=' + name,{
        method: "POST",
      }).then(function(response) {
        // load next page
        window.location.replace("/mobileChoice");
    })
}
