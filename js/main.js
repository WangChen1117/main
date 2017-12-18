function displayNextImage() {
  x = (x === images.length - 1) ? 0 : x + 1;
  document.getElementById("bg").style.backgroundImage = 'url('+images[x]+')';

}


function displayPreviousImage() {
  x = (x <= 0) ? images.length - 1 : x - 1;
  document.getElementById("bg").style.backgroundImage = 'url("'+images[x]+'")';
}

function typeWriter() {
  if (i<quote.length) {
    document.getElementById("quote").innerHTML += quote.charAt(i);
    i++;
    setTimeout(typeWriter(),70);
  }
}

function startTimer() {
  setInterval(displayNextImage, 10000);
  // document.getElementById("quote").innerHTML = "";
  // typeWriter();

}
var i =0;
var quote = '"Quitting Wrinkles the Soul."'

var images = [], x = 0;
    images[0] = "'img/spring.jpg'";
    images[1] = "'img/summer.jpg'";
    images[2] = "'img/fall.jpg'";
    images[3] = "'img/winter.jpg'";