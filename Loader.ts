/// <reference path="./node_modules/@types/es6-promise/index.d.ts" />

// abstract class Loader { 
//   type: "sync" | "async" | "parallel"; 
//   abstract apply():any;
// }

// abstract class SyncLoader extends Loader {
//   constructor() {
//     super();
//     this.type = "sync"
//   };

//   abstract apply(): void;
// }

// abstract class AsyncLoader extends Loader { 
//   constructor() {
//     super();
//     this.type = "async"
//   };
   
//   abstract apply():Promise<any>
// }


// abstract class ParallelLoader extends Loader { 
//   constructor() {
//     super();
//     this.type = "parallel"
//   };
  
//   abstract apply():Promise<any>;
// }

// class TestAsyncLoader extends AsyncLoader {
//   constructor() {
//     super();
//   }

//   apply() {
//     return new Promise<string>((resolve, reject) => { 
//         resolve('a string'); 
//     });
//   }
// }

// let t1 = new TestAsyncLoader();
// t1.apply().then(data => {
//   console.log(data);
// })

// loader = (src:any) => any 

interface Loader {
  
}
interface Loader extends Function {  
  cacheable():void;

}

class JSONLoader implements Loader {
  constructor(src) {
    this.cacheable();
    return src;
  }
}