locationConsent();

function locationConsent() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
}

function successFunction(position) {
  window.location.replace("proximite.php");
}

function errorFunction() {
  console.log(false);
}
