import { useState } from "react";
import type  {PaginationOptions, PaginationResults } from "../types";


export default function usePagination({totalItems, itemsPerPage = 10, initialPage = 1}: PaginationOptions): PaginationResults{
    const [currentPage, setCurrentPage] = useState(initialPage); // initial value needs to be stored
    
    let numOfPages = totalItems / itemsPerPage//this can be a decimal, so i need to round up
    numOfPages = Math.ceil(numOfPages)

    return {
        currentPage: currentPage,
        totalPages: numOfPages, 
    }


}