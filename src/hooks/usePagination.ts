import { useState, useCallback } from "react";
import type  {PaginationOptions, PaginationResults } from "../types";
import { clamp, getValidPage } from "../utils/utils";


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