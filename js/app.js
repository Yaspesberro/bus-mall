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
  this.id = name.toLowerCase();
  Picture.allPics.push(this);
}

//Instantiate all 20 pictures
var bag = new Picture('Bag', 'img/bag.jpg');
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
  } else if (picture === Picture.currentSet[0]) {
    return true;
  } else if (picture === Picture.currentSet[1]) {
    return true;
  } else if (picture === Picture.currentSet[2]) {
    return true;
  } else {
    return false;
  }
}

//Puts three random pictures in currentSet array if they're not dupes
function random() {
  for(var i = 0; i < 3; i++) {
    var randomPic = Math.floor(Math.random() * Picture.allPics.length);

    if(isDupe(Picture.allPics[randomPic])) {
      i -= 1;
      continue;
    } else {
      Picture.currentSet.push(Picture.allPics[randomPic]);
    }
  }
  displayImages();
}

//Displays pictures by assigning them to <img> elements
function displayImages() {
  //Adds first currentSet element to the <img> element
  imgOne.src = Picture.currentSet[0].filePath;
  imgOne.alt = Picture.currentSet[0].name;
  imgOne.title = Picture.currentSet[0].name;
  //Adds second currentSet element to the <img> element  
  imgTwo.src = Picture.currentSet[1].filePath;
  imgTwo.alt = Picture.currentSet[1].name;
  imgTwo.title = Picture.currentSet[1].name;
  //Adds third currentSet element to the <img> element
  imgThree.src = Picture.currentSet[2].filePath;
  imgThree.alt = Picture.currentSet[2].name;
  imgThree.title = Picture.currentSet[2].name;
  //Transferes currentSet -> lastSet, then clears the currentSet array
  Picture.lastSet[0] = Picture.currentSet[0];
  Picture.lastSet[1] = Picture.currentSet[1];
  Picture.lastSet[2] = Picture.currentSet[2];
  Picture.currentSet = [];
}

function displayResults() {

}
