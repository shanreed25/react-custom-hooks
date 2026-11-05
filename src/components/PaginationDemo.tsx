import type { ChangeEvent } from "react";
import usePagination from "../hooks/usePagination";

/*
constant for the items list
Array.from(buildFrom, fillEachSloct()): takes two arguments and makes a new array, takes two arguments
Array.from({ length: 123 }): builds an array of 123 items: [undefined, undefined, undefined, ... 123 times]
(_, index) => `Item ${index + 1}`: The second argument the function 
    - `_`, first parameter is the slot value and since each slot is undefined '_'(convention) is used to ignore the parameter
    - 'index second parameter: Each item gets and index : index is the position, starting at 0 and going up to 122
        Position start at 0 so to name each item, Item 1, Item 2 etc..... 1 is added to the index to get Item 1 to Item 123
*/

const ITEMSLIST: string[] = Array.from(
  { length: 123 },
  (_, index) => `Item ${index + 1}`,
);

export default function PaginationDemo() {
  //get total pages from the hook results
  //itemsPerPage can be passed or not becuse there is a default value
  const { currentPage, totalPages, startIndex, endIndex, nextPage, prevPage } =
    usePagination({ totalItems: ITEMSLIST.length });

  //slice will stop before endIndex so adding one include the last item
  const itemsToShow = ITEMSLIST.slice(startIndex, endIndex + 1);

  function handleItemsPerPageChange(e: ChangeEvent<HTMLSelectElement>): void {
    console.log("Changed");
  }

  return (
    <section className="w-3xl border rounded-sm p-10 text-center">
      <h2 className="text-3xl mb-10">Pagination Demo</h2>
      <div className="flex justify-between mb-10">
        <div>
          <label>Items per page:</label>
          <select
            value="10"
            onChange={handleItemsPerPageChange}
            className="bg-white text-[#0C0618] ml-3"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <p>Total Items: {ITEMSLIST.length}</p>
        </div>
      </div>
      <div className="flex">
        <ul>
          {itemsToShow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <div>
          <button
            onClick={prevPage}
            className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-500"
          >
            Previous
          </button>
        </div>
        <div>
          <p>Page {currentPage} of {totalPages}</p>
        </div>
        <div>
          <button
            onClick={nextPage}
            className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-500"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
