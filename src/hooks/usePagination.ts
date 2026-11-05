import { useState, useCallback } from "react";
import type  {PaginationOptions, PaginationResults } from "../types";
//Math.max(value, min) runs first, it sets the floor
//Math.min(result, max) sets the ceiling
function clamp(min: number, max: number, value: number): number {
    const floor = Math.max(value, min)
  return Math.min(floor, max);
}


//takes any page number and turns it into a page that actually exists
//by swapping any of those page numbers for the closest page that does exist
// used by setPage and initialPage
//setPage keeps the current page
//initialPage falls back to page 1
function getValidPage(totalPages: number, pageNumber: number, fallback: number): number {
  if (Number.isNaN(pageNumber)) return fallback;
  
  //something like page 2.5, will be rounded down to 2
  return clamp(1, totalPages, Math.floor(pageNumber));
}


export default function usePagination({totalItems, itemsPerPage = 10, initialPage = 1}: PaginationOptions): PaginationResults{

    //10 only applies when itemsPerPage is not passed
    //passing a invalid number like a negative number or 0
    //needs to be handled, so either of these is just treated as 1
    const pageSize = Math.max(1, itemsPerPage);

    //needs to be above useState because it now needs totalPages
    //keeps at least 1 page, so an empty list shows "Page 1 of 1"
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

    const [requestedPage, setRequestedPage] = useState(() =>
       getValidPage(totalPages, initialPage, 1)
 ) // initial value needs to be stored and only read on first render
    
    // let numOfPages = totalItems / itemsPerPage//this can be a decimal, so i need to round up
    // numOfPages = Math.ceil(numOfPages)


    //the current page that shows
    //requestedPage is the page that was asked for, but it can end up too big
    //if the page count shrinks, like on page 13 at 10 per page, then switching to 20 per page
    //20 per page only has 7 pages, so clamp pulls page 13 down to page 7
    //this runs on every render, so the page always fits the current page count
    const currentPage = clamp(1, totalPages, requestedPage, );

    //=================Start Index===================================================================
    //how many items come before the current page is the
    //  same number as the index of the pages's first item
    //index starts a 0, pages start at 1
    //suntracting 1 will get the correct index
    const pagesBeforeCurrent = (currentPage - 1)
    //the number of skipped items is the same number of the index of the first item on the page
    const itemsToSkip = pagesBeforeCurrent * pageSize
    const startIndex = itemsToSkip


    //=================End Index===========================================================================
    const currentPageLastIndex = itemsToSkip + pageSize -1
    const listLastIndex = totalItems -1 
    const endIndex = Math.min(currentPageLastIndex, listLastIndex) //smallest number wins


    //==========================Items for current page=====================================================
    const itemsOnCurrentPage = endIndex - startIndex + 1;



    //=================Can Prev and next===================================================================
    const canNextPage = currentPage < totalPages
    const canPrevPage = currentPage > 1


    
    const nextPage = useCallback((): void => {
        setRequestedPage(clamp(1, totalPages, currentPage + 1))
    },[currentPage, totalPages] )

    const prevPage = useCallback((): void => {
        setRequestedPage(clamp(1, totalPages, currentPage - 1))
    }, [currentPage, totalPages])

    const setPage = useCallback((pageNumber: number): void =>{
        setRequestedPage((page) => getValidPage(totalPages, pageNumber, page))
    },[totalPages])

    

    return {
        currentPage: currentPage,
        totalPages: totalPages,
        startIndex: startIndex,
        endIndex: endIndex,
        nextPage: nextPage,
        prevPage: prevPage,
        setPage: setPage,
        canNextPage: canNextPage,
        canPrevPage: canPrevPage,
        itemsOnCurrentPage: itemsOnCurrentPage
    }


}