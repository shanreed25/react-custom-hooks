



//Math.max(value, min) runs first, it sets the floor
//Math.min(result, max) sets the ceiling
export function clamp(min: number, max: number, value: number): number {
    const floor = Math.max(value, min)
  return Math.min(floor, max);
}
