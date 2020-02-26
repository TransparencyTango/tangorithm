const body = document.getElementById('idleElement');
//body.addEventListener("touchend", showInputPage, false);
body.ontouchend = showInputPage;
function showInputPage(event) {
  event.preventDefault();
  // load next page
  window.location.replace("/mobileStart");
  }
