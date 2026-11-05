import { useState, type ChangeEvent } from "react";
import usePagination from "../hooks/usePagination";
import { styles } from "../styles/styles";

/*
constant for the items list
Array.from(buildFrom, fillEachSloct()): takes two arguments and makes a new array, takes two arguments
Array.from({ length: 123 }): builds an array of 123 items: [undefined, undefined, undefined, ... 123 times]
(_, index) => `Item ${index + 1}`: The second argument the function 
    - `_`, first parameter is the slot value and since each slot is undefined '_'(convention) is used to ignore the parameter
    - 'index second parameter: Each item gets and index : index is the position, starting at 0 and going up to 122
        Position start at 0 so to name each item, Item 1, Item 2 etc..... 1 is added to the index to get Item 1 to Item 123
*/

const ITEMS_LIST: string[] = Array.from(
  { length: 123 },
  (_, index) => `Item ${index + 1}`,
);

const ITEMS_PER_PAGE: number[] = [5, 10, 15, 20];

export default function PaginationDemo() {

  const [itemsPerPage, setItemsPerPage] = useState(10)
  //get total pages from the hook results
  //itemsPerPage can be passed or not becuse there is a default value
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    setPage,
    canNextPage,
    canPrevPage,
    itemsOnCurrentPage
  } = usePagination({ totalItems: ITEMS_LIST.length, itemsPerPage });

  const pageNums = Array.from({length: totalPages}, (_, index) => index + 1)
  //slice will stop before endIndex so adding one include the last item
  const itemsToShow = ITEMS_LIST.slice(startIndex, endIndex + 1);

  function handleItemsPerPageChange(e: ChangeEvent<HTMLSelectElement>): void {
    setItemsPerPage(Number(e.target.value))
    console.log("Changed");
  }

  return (
    <section className={`${styles.section} text-center`}>
      <h2 className="text-3xl mb-10">Pagination Demo</h2>
      <div className="flex justify-between mb-10">
        <div>
          <label>Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="cursor-pointer bg-white text-[#0C0618] ml-3"
          >
            {ITEMS_PER_PAGE.map((numOfItems) => (
              <option key={numOfItems} value={numOfItems}>
                {numOfItems}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Total Items: {ITEMS_LIST.length}</p>
        </div>
      </div>

      {itemsOnCurrentPage === 0 ? (
             <p className="mb-4 italic text-gray-400">No items to display</p>
      ) : (
        <div className="flex">
        <ul>
          {itemsToShow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      )}
      

      <div className="flex justify-between items-center gap-4 mt-4">
        <div>
          <button
            onClick={prevPage}
            disabled={!canPrevPage}
            className="cursor-pointer px-4 py-2 rounded bg-violet-600 hover:bg-violet-500"
          >
            Previous
          </button>
        </div>

        <div>
          <p>
            Page {currentPage} of {totalPages}
          </p>
        </div>
        
        <div>
          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className="cursor-pointer px-4 py-2 rounded bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <div>
        <p>Showing items {startIndex +1} - {endIndex + 1} (Total on this page: {itemsOnCurrentPage})</p>
      </div>

      <div className="flex  flex-wrap gap-3 mt-4">
        {pageNums.map((pageNum) => {
          const currPage = pageNum === currentPage

          return (
            <button 
            key={pageNum}
            disabled={currPage}
            onClick={() => setPage(pageNum)}
            className={currPage ? styles.activePageBtn : styles.pageBtn}
            >
              {pageNum}
            </button>
          )
        })}
      </div>
    </section>
  );
}
