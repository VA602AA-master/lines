let numbers = [10, 20, 30, 50, 7];
let lc = lineComponent()
  .width(200);
console.log(lc.width());

function redraw() {
  d3.select("#viz")
    .datum(numbers)
    .call(lc);
}

redraw();

function reshuffle() {
  numbers = d3.range(3 + Math.round(Math.random() * 10))
    .map(function(d) {
      return Math.round(Math.random() * 100);
    });

  // Bad way to do the same thing

  // numbers.length = 3 + Math.round(Math.random()*10);
  // for(let i =0; i < numbers.length; i++){
  //   numbers[i] = Math.round(Math.random()*100);
  // }
  console.log(numbers);
  redraw();
}
