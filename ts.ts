// namespace Inventory {
//   export class Product {
//     constructor(public name: string, public quantity: number) {}
//   }

//   let p = new Product("mobile", 101);
// }

// let p2 = new Inventory.Product("car", 1);

// //functions
// // named function
// let func1 = function namedFunction() {
//   // statements
// };
// // anonymous function
// let func2 = function(a, b) {
//   // statements
// };

// // generics
// function returnNumber(arg: number) {
//   return arg;
// }
// function returnString(arg: string) {
//   return arg;
// }

// function returnWhatever<T>(arg: T) {
//   return arg;
// }
// let stringOutput = returnWhatever<string>("string.....");
// let numberOutput = returnWhatever<number>(124);

// interface GenericFunc<T> {
//   (arg: T): T;
// }

// function func<T>(arg: T) {
//   return arg;
// }
// let myFunc: GenericFunc<number> = func;

// class GenericClass<T> {
//   add: (a: T, b: T) => T;
// }

// let myGenClass = new GenericClass<number>();
// myGenClass.add = (a, b) => {
//   return a + b;
// };

// let freezed: ClassDecorator = (target: any) => {
//   Object.freeze(target);
// };

// @freezed
// class Customer {
//   constructor(public firstName: string, public lastName: string) {}
// }

// function logMethod(target, key, descriptor) {
//   // save a reference to the original method this way we keep the values currently in the
//   // descriptor and don't overwrite what another decorator might have done to the descriptor.
//   if (descriptor === undefined) {
//     descriptor = Object.getOwnPropertyDescriptor(target, key);
//   }
//   var originalMethod = descriptor.value;

//   //editing the descriptor/value parameter
//   descriptor.value = function() {
//     var args = [];
//     for (var _i = 0; _i < arguments.length; _i++) {
//       args[_i - 0] = arguments[_i];
//     }
//     var a = args
//       .map(function(a) {
//         return JSON.stringify(a);
//       })
//       .join();
//     // note usage of originalMethod here
//     var result = originalMethod.apply(this, args);
//     var r = JSON.stringify(result);
//     console.log("Call: " + key + "(" + a + ") => " + r);
//     return result;
//   };

//   // return edited descriptor as opposed to overwriting the descriptor
//   return descriptor;
// }

// class Person {
//   public name: string;
//   public surname: string;

//   constructor(name: string, surname: string) {
//     this.name = name;
//     this.surname = surname;
//   }

//   @logMethod
//   public saySomething(something: string, somethingElse: string): string {
//     return (
//       this.name +
//       " " +
//       this.surname +
//       " says: " +
//       something +
//       " " +
//       somethingElse
//     );
//   }
// }

// var p = new Person("remo", "jansen");
// p.saySomething("I love playing", "halo");
function MethodDecorator(
  target: Object, // The prototype of the class
  propertyKey: string, // The name of the method
  descriptor: TypedPropertyDescriptor<any>
) {
  console.log("MethodDecorator called on: ", target, propertyKey, descriptor);
}

class MethodDecoratorExample {
  @MethodDecorator
  method() {}
}

let m = new MethodDecoratorExample();
m.method();
