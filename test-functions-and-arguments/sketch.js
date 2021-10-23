console.log('window is type of: ' + typeof window);
console.log('window.innerHeight: ' + window.innerHeight);

console.log('global is type of: ' + typeof global);



function setup() {
  // calling a function that's defined in testfunctions.js
  myFunc(10);
  noise = myFunc;
  noise(10);
}

function draw() {
  // put drawing code here
}