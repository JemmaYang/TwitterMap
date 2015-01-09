var io = require("socket.io-client")("http://localhost:9000"); //"http://mapoftweets.herokuapp.com:80");
var d3 = require("d3");
var inside = require('point-in-polygon')

var width = 960,
    height = 1160;

var width = document.body.offsetWidth;
var height = width / 2;

var projection,path,svg,g;
var countries;
var countryCount = {};

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
      .style("background", "blue")

  g = svg.append("g");
}

d3.json("countries.geo.json", function(error, world) {
  countries = world.features;
  draw(countries);
});

function draw(topo) {
  var country = g.selectAll(".country").data(topo);

  country.enter().insert("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("id", function(d,i) { return d.id; })
      .style("stroke", "black")
      .style("fill", "white")
      .append("svg:title")
      .text(function(d) {return d.id})
}

function addTweet(coords) {
    countries.forEach(function(country){

      country.geometry.coordinates.forEach(function(part){
          if(country.geometry.type == "MultiPolygon") {
            part = part[0];
          }
          if(inside(coords.coordinates, part)){
            if(countryCount[country.id]) {
              countryCount[country.id] += 1;
            } else {
              countryCount[country.id] = 1;
            }

            g.select("#" + country.id).select("title").text(country.id + " " +countryCount[country.id]);
          }
      });
    });

}

var socket = io.connect();

socket.on("tweet", function(data) {
  var long = data.coordinates.coordinates[0];
  var lat = data.coordinates.coordinates[1];

  addTweet(data.coordinates);

  g.insert("circle")
  .attr("class", "tweet")
  .attr("r", 10)
  .attr("transform", function(d) {return "translate(" + projection([long, lat]) + ")";})
  .style("fill", "red")
  .transition().duration(250).attr("r", 3);
});
