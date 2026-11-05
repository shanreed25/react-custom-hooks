



//Math.max(value, min) runs first, it sets the floor
//Math.min(result, max) sets the ceiling
export function clamp(min: number, max: number, value: number): number {
    const floor = Math.max(value, min)
  return Math.min(floor, max);
}


//takes any page number and turns it into a page that actually exists
//by swapping any of those page numbers for the closest page that does exist
// used by setPage and initialPage
//setPage keeps the current page
//initialPage falls back to page 1
export function getValidPage(totalPages: number, pageNumber: number, fallback: number): number {
  if (Number.isNaN(pageNumber)) return fallback;
  return clamp(1, totalPages, Math.floor(pageNumber));
}