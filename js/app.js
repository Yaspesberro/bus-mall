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

//Constructor for Picture object
function Picture(name, filePath, index) {
  this.name = name;
  this.filePath = filePath;
  this.index = index;
  this.clicks = 0;
  this.views = 0;
  Picture.allPics.push(this);
}

//Instantiate all 20 pictures
new Picture('Bag', 'img/bag.jpg', 0);
new Picture('Banana', 'img/banana.jpg', 1);
new Picture('Bathroom', 'img/bathroom.jpg', 2);
new Picture('Boots', 'img/boots.jpg', 3);
new Picture('Breakfast', 'img/breakfast.jpg', 4);
new Picture('Bubblegum', 'img/bubblegum.jpg', 5);
new Picture('Chair', 'img/chair.jpg', 6);
new Picture('Cthulhu', 'img/cthulhu.jpg', 7);
new Picture('Dog-duck', 'img/dog-duck.jpg', 8);
new Picture('Dragon', 'img/dragon.jpg', 9);
new Picture('Pen', 'img/pen.jpg', 10);
new Picture('Pet-sweep', 'img/pet-sweep.jpg', 11);
new Picture('Scissors', 'img/scissors.jpg', 12);
new Picture('Shark', 'img/shark.jpg', 13);
new Picture('Sweep', 'img/sweep.png', 14);
new Picture('Tauntaun', 'img/tauntaun.jpg', 15);
new Picture('Unicorn', 'img/unicorn.jpg', 16);
new Picture('Usb', 'img/usb.gif', 17);
new Picture('Water-can', 'img/water-can.jpg', 18);
new Picture('Wine-glass', 'img/wine-glass.jpg', 19);

//Checks & returns true if picture was used in the last set of images
function isDupe(picture) {
  //Checks if this is the first set being created
  if(!Picture.lastSet[0] && !Picture.lastSet[1] && !Picture.lastSet[2]) {
    if(picture === Picture.currentSet[0] || picture === Picture.currentSet[1] ||picture === Picture.currentSet[2]) {
      return true;
    } else { return false; }
  }
  else if (picture === Picture.lastSet[0]) { return true; }
  else if (picture === Picture.lastSet[1]) { return true; }
  else if (picture === Picture.lastSet[2]) { return true; }
  else if (picture === Picture.currentSet[0]) { return true; }
  else if (picture === Picture.currentSet[1]) { return true; }
  else if (picture === Picture.currentSet[2]) { return true; }
  else { return false; }
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

//Displays pictures by assigning them to <img> elements, calls random()
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

/*
function displayResults() {
  var liEl;
  imgOne.remove();
  imgTwo.remove();
  imgThree.remove();

  for(var i = 0; i < Picture.allPics.length; i++) {
    var name = Picture.allPics[i].name;
    var clicks = Picture.allPics[i].clicks;
    liEl = document.createElement('li');
    liEl.textContent = name + ': clicks = ' + clicks;
    divEl.appendChild(liEl);
  }
}
*/

function clickHandler(e) {
  //Checks if user has selections left (25 total)
  if(totalClicks < 25) {
    //Checks if the user clicked on one of the pictures
    if(e.target !== divEl) {
      Picture.allPics[e.target.alt].clicks += 1;
      totalClicks++;
      console.log(e.target.alt);
      displayImages();
    }
  //Else: removes event listener and displays results
  } else {
    divEl.removeEventListener('click', clickHandler);
    window.scrollTo(0,document.body.scrollHeight);
    drawChart();
    //displayResults();
  }
}
divEl.addEventListener('click', clickHandler);
displayImages();

//Stores how often each product has been clicked on in an array
var allClicks = [];
//Stores name of each product in an array
var allNames = [];
//Update allClicks & allName arrays to current values
function updateChartArrays() {
  for(var i = 0; i < Picture.allPics.length; i++) {
    allClicks[i] = Picture.allPics[i].clicks;
    allNames[i] = Picture.allPics[i].name;
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
  //Updates allClicks & allNames arrays
  updateChartArrays();
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