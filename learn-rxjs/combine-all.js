const source = Rx.Observable.interval(1000).take(2);
const example = source.map(val =>
  Rx.Observable
    .interval(1000)
    .map(i => `Result (${val}) : ${i}`)
    .take(5)
);
const combined = example.combineAll();

const subscribe = combined.subscribe(val => console.log(val));
