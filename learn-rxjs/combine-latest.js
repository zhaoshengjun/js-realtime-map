//////////////////////////////
// Example 1
//////////////////////////////
// const timer1 = Rx.Observable.timer(1000, 4000);
// const timer2 = Rx.Observable.timer(2000, 4000);
// const timer3 = Rx.Observable.timer(3000, 4000);

// const combined = Rx.Observable.combineLatest(timer1, timer2, timer3);

// const subscribe = combined.subscribe(latestValue => {
//   const [timerVal1, timerVal2, timerVal3] = latestValue;
//   console.log("*********************");
//   console.log(`Timer 1 latest: ${timerVal1}`);
//   console.log(`Timer 2 latest: ${timerVal2}`);
//   console.log(`Timer 3 latest: ${timerVal3}`);
// });

//////////////////////////////
// Example 2
//////////////////////////////

const setHtml = id => val => (document.getElementById(id).innerHTML = val);

const addOneClick$ = id =>
  Rx.Observable
    .fromEvent(document.getElementById(id), "click")
    // map every click to 1
    .mapTo(1)
    .startWith(0)
    // keep a running total
    .scan((acc, curr) => acc + curr)
    // set HTML for appropriate element  -- side effect, has nothing to to with the observable itself
    .do(setHtml(`${id}Total`));

const combineTotal$ = Rx.Observable
  .combineLatest(addOneClick$("red"), addOneClick$("black"))
  .map(([val1, val2]) => val1 + val2)
  .subscribe(setHtml("total"));
