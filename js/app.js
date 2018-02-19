'use strict';

var divEl = document.getElementById('container');
var imgOne = document.getElementById('one');
var imgTwo = document.getElementById('two');
var imgThree = document.getElementById('three');
var totalClicks = 0;
//Stores all picture objects
Picture.allPics = [];
//Stores the current set of three images
Picture.currentSet = [];
//Stores the previous set of three images
Picture.lastSet = [];

//Constructor creates picture object
function Picture(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.clicks = 0;
  this.views = 0;
  this.id = '';
  Picture.allPics.push(this);
}

//Instantiate all 20 pictures
new Picture('Bag', 'img/bag.jpg');
new Picture('Banana', 'img/banana.jpg');
new Picture('Bathroom', 'img/bathroom.jpg');
new Picture('Boots', 'img/boots.jpg');
new Picture('Breakfast', 'img/breakfast.jpg');
new Picture('Bubblegum', 'img/bubblegum.jpg');
new Picture('Chair', 'img/chair.jpg');
new Picture('Cthulhu', 'img/cthulhu.jpg');
new Picture('Dog-duck', 'img/dog-duck.jpg');
new Picture('Dragon', 'img/dragon.jpg');
new Picture('Pen', 'img/pen.jpg');
new Picture('Pet-sweep', 'img/pet-sweep.jpg');
new Picture('Scissors', 'img/scissors.jpg');
new Picture('Shark', 'img/shark.jpg');
new Picture('Sweep', 'img/sweep.png');
new Picture('Tauntaun', 'img/tauntaun.jpg');
new Picture('Unicorn', 'img/unicorn.jpg');
new Picture('Usb', 'img/usb.gif');
new Picture('Water-can', 'img/water-can.jpg');
new Picture('Wine-glass', 'img/wine-glass.jpg');

//Checks & returns true if picture was used in the last set of images
function isDupe(picture) {
  //Checks if this is the first set being created
  if(!Picture.lastSet[0] && !Picture.lastSet[1] && !Picture.lastSet[2]) {
    return false;
  } else if (picture === Picture.lastSet[0]) {
    return true;
  } else if (picture === Picture.lastSet[1]) {
    return true;
  } else if (picture === Picture.lastSet[2]) {
    return true;
  }
}

//Puts three random pictures in currentSet array, making sure there are no dupes!
function random() {
//Add event listeners?
}

function displayImages() {
//last one? remove event handler
}

function displayResults() {

}
