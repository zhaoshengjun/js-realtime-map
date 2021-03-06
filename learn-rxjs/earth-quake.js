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
  .interval(5000)
  .flatMap(() => {
    return Rx.Observable
      .create(observer => {
        window.eqfeed_callback = response => {
          observer.next(response);
          observer.complete();
        };
        loadJSONP(URL);
      })
      .retry(3);
  })
  .flatMap(data => Rx.Observable.from(data.features))
  .distinct(quake => quake.properties.code);

quakes.subscribe(quake => {
  let [lng, lat] = quake.geometry.coordinates;
  let size = quake.properties.mag * 10000;
  let circle = L.circle([lat, lng], size).addTo(map);
  circle.bindPopup(`${quake.properties.title}`);
});

const setHtml = id => val =>
  (document.getElementById(id).innerHTML = `Count:${val}`);

const counter = quakes
  .map(_ => 1)
  .startWith(0)
  .scan((acc, cur) => acc + cur)
  .do(setHtml("count"));

counter.subscribe(d => console.log("count", d));
