'use strict';

var divEl = document.getElementById('container');
var imgOne = document.getElementById('one');
var imgTwo = document.getElementById('two');
var imgThree = document.getElementById('three');
var allNames = [];
var allViews = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var allClicks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalClicksLeft = 25;

//Stores all picture objects
Picture.allPics = [];
//Stores the current set of three images
Picture.currentSet = [];
//Stores the previous set of three images
Picture.lastSet = [];

//Constructor for Picture object
function Picture(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.index = Picture.allPics.length;
  this.clicks = 0;
  this.views = 0;
  Picture.allPics.push(this);
}

//Instantiate all 20 picture objects
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
    if(picture === Picture.currentSet[0] || picture === Picture.currentSet[1] ||picture === Picture.currentSet[2]) {
      return true;
    } else { return false; }
  } else if (picture === Picture.lastSet[0] || picture === Picture.lastSet[1] || picture === Picture.lastSet[2] || picture === Picture.currentSet[0] || picture === Picture.currentSet[1] || picture === Picture.currentSet[2]) {
    return true; 
  } else { return false; }
}

//Puts three random pictures in currentSet array if they're not dupes
function random() {
  for(var i = 0; i < 3; i++) {
    var randomPic = Math.floor(Math.random() * Picture.allPics.length);
    if(isDupe(Picture.allPics[randomPic])) {
      i -= 1;
      continue;
    } else {
      Picture.currentSet[i] = Picture.allPics[randomPic];
      //Adds to the image objects view property
      Picture.allPics[randomPic].views += 1;
    }
  }
}

//Displays pictures assigning them to <img> elements, calls random()
function displayImages() {
  random();
  //Adds first currentSet element to the <img> element
  imgOne.src = Picture.currentSet[0].filePath;
  imgOne.alt = Picture.currentSet[0].index;
  imgOne.title = Picture.currentSet[0].name;
  //Adds second currentSet element to the <img> element
  imgTwo.src = Picture.currentSet[1].filePath;
  imgTwo.alt = Picture.currentSet[1].index;
  imgTwo.title = Picture.currentSet[1].name;
  //Adds third currentSet element to the <img> element
  imgThree.src = Picture.currentSet[2].filePath;
  imgThree.alt = Picture.currentSet[2].index;
  imgThree.title = Picture.currentSet[2].name;
  //Transferes currentSet -> lastSet, then clears the currentSet array
  Picture.lastSet[0] = Picture.currentSet[0];
  Picture.lastSet[1] = Picture.currentSet[1];
  Picture.lastSet[2] = Picture.currentSet[2];
  Picture.currentSet = [];
}

function clickHandler(e) {
  //Checks if user has selections left (25 total)
  if(totalClicksLeft > 0) {
    //Checks if the user clicked on one of the pictures
    if(e.target !== divEl) {
      Picture.allPics[e.target.alt].clicks += 1;
      totalClicksLeft -= 1;
      if(totalClicksLeft === 0) {
        divEl.removeEventListener('click', clickHandler);
        window.scrollTo(0,document.body.scrollHeight);
        drawChart();
      } else { displayImages(); }
      updateLocal();
    }
  } 
}

//Update allClicks, allViews & allNames arrays to current values
function updateTotals() {
  for(var i = 0; i < Picture.allPics.length; i++) {
    allNames[i] = Picture.allPics[i].name;
    allViews[i] = Picture.allPics[i].views;
    allClicks[i] = Picture.allPics[i].clicks;
  }
}

//Sets up data variable in global scope
var data = {
  labels: allNames,
  datasets: [{
    data: allClicks,
    backgroundColor: [
      'rgba(223, 46, 46, .5)',
      'rgba(233, 127, 51, .5)',
      'rgba(229, 226, 60, .5)',
      'rgba(202, 239, 15, .5)',
      'rgba(106, 218, 62, .5)',
      'rgba(6, 177, 40, .5)',
      'rgba(36, 243, 185, .5)',
      'rgba(99, 198, 206, .5)',
      'rgba(101, 184, 240, .5)',
      'rgba(54, 96, 236, .5)',
      'rgba(5, 41, 163, .5)',
      'rgba(125, 26, 217, .5)',
      'rgba(186, 53, 227, .5)',
      'rgba(199, 24, 182, .5)',
      'rgba(152, 20, 84, .5)',
      'rgba(217, 42, 74, .5)',
      'rgba(241, 48, 48, .5)',
      'rgba(233, 127, 51, .5)',
      'rgba(229, 226, 60, .5)',
      'rgba(202, 239, 15, .5)'
    ],
    hoverBackgroundColor: [
      'rgb(223, 46, 46)',
      'rgb(233, 127, 51)',
      'rgb(229, 226, 60)',
      'rgb(202, 239, 15)',
      'rgb(106, 218, 62)',
      'rgb(6, 177, 40)',
      'rgb(36, 243, 185)',
      'rgb(99, 198, 206)',
      'rgb(101, 184, 240)',
      'rgb(54, 96, 236)',
      'rgb(5, 41, 163)',
      'rgb(125, 26, 217)',
      'rgb(186, 53, 227)',
      'rgb(199, 24, 182)',
      'rgb(152, 20, 84)',
      'rgb(217, 42, 74)',
      'rgb(241, 48, 48)',
      'rgb(233, 127, 51)',
      'rgb(229, 226, 60)',
      'rgb(202, 239, 15)'
    ],
    borderColor: [],
    borderWidth: []
  }]
};

function drawChart() {
  //Get the bar chart canvas
  var ctx = document.getElementById('chart').getContext('2d');
  updateTotals();
  //Create chart object
  var chart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        easing: 'linear',
        duration: 850,
      },
      tooltips: {
        titleFontFamily: 'Alegreya SC',
        titleFontSize: 18,
        footerFontSize: 15,
      },
      title: {
        fontFamily: 'Alegreya SC',
        display: true,
        fontSize: 30,
        fontColor: '#000000',
        text: 'Most Popular BusMall Products',
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

function updateLocal() {
  localStorage.setItem('picture', JSON.stringify(Picture.allPics));
}

function startLocal() {
  //If local storage is empty, then set key/value
  if(localStorage.length === 0) {
    localStorage.setItem('picture', JSON.stringify(Picture.allPics));
  //else, assign stored Picture object in local storage to the current Picture.allPics
  } else {
    Picture.allPics = JSON.parse(localStorage.getItem('picture'));
  }
}
startLocal();
displayImages();
divEl.addEventListener('click', clickHandler);
