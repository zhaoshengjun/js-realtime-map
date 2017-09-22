const URL =
  "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp";
const map = L.map("map").setView([33.858631, -118.279602], 7);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

function loadJSONP(url) {
  var script = document.createElement("script");
  script.src = url;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
}

const quakes = Rx.Observable.create(observer => {
  window.eqfeed_callback = function(response) {
    let quakes = response.features;
    quakes.forEach(quake => {
      observer.next(quake);
    });
  };
  loadJSONP(URL);
});

// This specific website doesnt allow to provide our own callback function
//  so this fetchJsonp will fail. Instead, it will always use a global variable eqfeed_callback
// const quakes = Rx.Observable.create(observer => {
//   fetchJsonp(URL, { jsonpCallbackFunction: "eqfeed_callback" })
//     .then(response => response.json())
//     .then(data => {
//       let quakes = data.features;
//       quakes.forEach(quake => observer.next(quake));
//     });
// });
quakes.subscribe(quake => {
  console.log("quake", quake);
  let [lng, lat] = quake.geometry.coordinates;
  let size = quake.properties.mag * 10000;
  L.circle([lat, lng], size).addTo(map);
});
