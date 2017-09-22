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

const quakes = Rx.Observable
  .create(observer => {
    window.eqfeed_callback = response => {
      observer.next(response);
      observer.complete();
    };
    loadJSONP(URL);
  })
  .flatMap(data => Rx.Observable.from(data.features));

quakes.subscribe(quake => {
  let [lng, lat] = quake.geometry.coordinates;
  let size = quake.properties.mag * 10000;
  L.circle([lat, lng], size).addTo(map);
});
