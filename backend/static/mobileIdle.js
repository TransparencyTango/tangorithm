const body = document.getElementById('testdiv');
//body.addEventListener("touchend", showInputPage, false);
body.ontouchend = showInputPage;
function showInputPage(event) {
  event.preventDefault();
  // load next page
  alert("test");
  window.location.replace("/mobileStart");
  }
