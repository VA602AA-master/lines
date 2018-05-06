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


function lineComponent() {
  let width = 200;
  let height = 200;

  let xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 200]);

  let yScale = d3.scaleLinear()
    .domain([0, 13])
    .range([0, 200]);

  let axis = d3.axisBottom(xScale);


  let svg = null;

  function me(selection) {
    if (!svg) {
      svg = selection
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      svg.append('g')
        .attr('transform', 'translate(10,180)')
        .call(axis);

      svg = svg.append('g')
        .attr('transform', 'translate(10,10)');


    }

    let lines = svg.selectAll("line")
      .data(selection.datum());

    // <line x1='0' y1='0' x2='10' y2='10'/>
    lines.enter() // ENTER
      .append("line")
      .attr("stroke-weight", 1)
      .attr("stroke", "black");

    // EXIT
    lines.exit().remove();

    svg.selectAll('line') //UPDATE
      .attr("x1", 0)
      .attr("x2", function(d, i) {
        return xScale(d);
      })
      .attr("y1", function(d, i) {
        return yScale(i);
      })
      .attr("y2", function(d, i) {
        return yScale(i);
      });

    let texts = svg.selectAll('text')
      .data(selection.datum());

    texts.enter()
      .append('text');


    texts.exit().remove();



    svg.selectAll('text')
      .attr('x', xScale)
      .attr('font-size', 10)
      .attr('font-family', 'sans-serif')
      .attr('y', function(d, i) {
        return yScale(i)
      })
      .attr('dy', 3)
      .text(function(d) {
        return d
      });



  }

  me.width = function(arg) {
    if (!arguments.length)
      return width;


    width = arg;

    xScale.range([0, width - 10 * 2]);
    return me;
  }

  me.height = function(arg) {
    if (!arguments.length)
      return height;
    height = arg;
    return me;
  }

  return me;


}








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
