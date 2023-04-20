// Creating the map object


let myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";

// The function that will determine the color of a neighborhood based on the borough that it belongs to
function chooseColor(borough) {
  if (borough == "Brooklyn") return "yellow";
  else if (borough == "Bronx") return "red";
  else if (borough == "Manhattan") return "green";
  else if (borough == "Queens") return "orange";
  else if (borough == "Staten Island") return "blue";
  else return "black";
}
function getUrlForBorough1(borough) {
  return `http://127.0.0.1:5000/${borough}1`;
}
function getUrlForBorough2(borough) {
  return `http://127.0.0.1:5000/${borough}2`;
}
function getUrlForBorough3(borough) {
  return `http://127.0.0.1:5000/${borough}3`;
}

//let selector = d3.select('#selDataset').value
//console.log(selector);
function BuildCharts(value){
//let selector = document.getElementById('selDataset').value
let selector = value
// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          let url = ""
          const borough = event.target.feature.properties.borough;
          console.log(borough)
          console.log(selector)
          if (selector == "During_Covid"){
          url = getUrlForBorough1(borough);}
          else { 
          url =getUrlForBorough2(borough);}

d3.json(url).then(function(data){
  console.log(selector);


let trace1 ={
  x: Object.values(data.borough),
  y: Object.values(data.average_response_seconds),
  width: [.8,.8,.8,.8,.8],
  type: "bar"
};

let tracedata = [trace1];
let layout = {
  title: "Average Response Time (sec)",
  yaxis:{
    tickvals: [0,500,1000,1500,2000,2500],
  }
};


Plotly.newPlot("plot",tracedata, layout);
});

const url2 = getUrlForBorough3(borough);

d3.json(url2).then(function(data2){
  console.log(data2);


let trace1 ={
  values: Object.values(data2.average_response_seconds),
  labels:['4','5', '6', '7', '8'],
  type: "pie"
};

let tracedata2 = [trace1];
let layout2 = {
  height: 400,
  width: 500
};


Plotly.newPlot("pie",tracedata2, layout2);
});


        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup( "<h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(myMap);
});

const url3 = 'http://127.0.0.1:5000/NYC1'

d3.json(url3).then(function(data){
    console.log(data);


let trace1 ={
    x: Object.values(data.borough),
    y: Object.values(data.average_response_seconds),
    width: [.8,.8,.8,.8,.8],
    type: "bar"
};

let tracedata = [trace1];
let layout = {
    title: "Average Response Time (sec)",
    yaxis:{
      tickvals: [0,500,1000,1500,2000,2500],
    }
};


Plotly.newPlot("plot",tracedata, layout);
});
};

BuildCharts();