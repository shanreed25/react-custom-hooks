import { useState } from "react";
import type  {PaginationOptions, PaginationResults } from "../types";
import { clamp, getValidPage } from "../utils/utils";


export default function usePagination({totalItems, itemsPerPage = 10, initialPage = 1}: PaginationOptions): PaginationResults{

    //neds to be above useState because it now needs totalPages
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(() =>
       getValidPage(totalPages, initialPage, 1)
 ) // initial value needs to be stored and only read on first render
    
    let numOfPages = totalItems / itemsPerPage//this can be a decimal, so i need to round up
    numOfPages = Math.ceil(numOfPages)


    //=================Start Index===================================================================
    //how many items come before the current page is the
    //  same number as the index of the pages's first item
    //index starts a 0, pages start at 1
    //suntracting 1 will get the correct index
    const pagesBeforeCurrent = (currentPage - 1)
    //the number of skipped items is the same number of the index of the first item on the page
    const itemsToSkip = pagesBeforeCurrent * itemsPerPage
    const startIndex = itemsToSkip


    //=================End Index===========================================================================
    const currentPageLastIndex = itemsToSkip + itemsPerPage -1
    const listLastIndex = totalItems -1 
    const endIndex = Math.min(currentPageLastIndex, listLastIndex) //smallest number wins


    //==========================Items for current page=====================================================
    const itemsOnCurrentPage = endIndex - startIndex + 1;



    //=================Can Prev and next===================================================================
    const canNextPage = currentPage < totalPages
    const canPrevPage = currentPage > 2


    
    function nextPage(): void {
        setCurrentPage((page) => clamp(1, totalPages, page + 1))
    }

    function prevPage(): void {
        setCurrentPage((page) => clamp(1, totalPages, page - 1))
    }

    function setPage(pageNumber: number): void{
        setCurrentPage((page) => getValidPage(totalPages, pageNumber, page))
    }

    

    return {
        currentPage: currentPage,
        totalPages: numOfPages,
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