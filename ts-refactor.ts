export function volume(radius: number, height: number) {
  let radius_sq: number;
  squareRadius();
  let base_area = Math.PI * radius_sq;
  if (validityCheck(radius_sq, height)) return null;
  return base_area * height;

  function squareRadius() {
    radius_sq = radius * radius;
  }
}

//quick fix

var x: any;
var y: number;
interface quote {
  bar: number;
}
var z: quote["bar"];

function validityCheck(radius_sq: number, height: number) {
  return radius_sq < 0 && height > 0;
}
