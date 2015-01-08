var io = require("socket.io-client")("http://localhost:9000");
var d3 = require("d3");

var width = 960,
    height = 1160;

var width = document.body.offsetWidth;
var height = width / 2;

var projection,path,svg,g;

setup(width,height);

function setup(width,height){
  projection = d3.geo.mercator()
    .translate([(width/2), (height/2)])
    .scale( width/10);

    projection = d3.geo.mercator()
    .scale((width + 1) / 8)
    .translate([width / 2, height/1.5])
    .precision(.1);

  path = d3.geo.path().projection(projection);

  svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)

  g = svg.append("g");

}

d3.json("countries.geo.json", function(error, world) {
  draw(world.features);

});

function draw(topo) {
  var country = g.selectAll(".country").data(topo);

  country.enter().insert("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("id", function(d,i) { return d.id; })
      .style("stroke", "black")
      .style("fill", "white");

}

var socket = io.connect();

socket.on("tweet", function(data) {
  console.log(data);

  var long = data.coordinates.coordinates[0];
  var lat = data.coordinates.coordinates[1];


  g.insert("circle")
  .attr("class", "tweet")
  .attr("r",5)
  .attr("transform", function(d) {return "translate(" + projection([long, lat]) + ")";})
  .style("fill", "blue");

});
