export function volume(radius: number, height: number) {
  let radius_sq: number;
  radius_sq = radius * radius;
  let base_area = Math.PI * radius_sq;
  if (radius_sq < 0 && height > 0) return null;
  return base_area * height;
}