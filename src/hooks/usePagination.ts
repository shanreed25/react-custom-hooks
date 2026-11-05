import type  {PaginationOptions, PaginationResults } from "../types";


export default function usePagination({totalItems, itemsPerPage = 10}: PaginationOptions): PaginationResults{
    let numOfPages = totalItems / itemsPerPage//this can be a decimal, so i need to round up

    numOfPages = Math.ceil(numOfPages)

    return {totalPages: numOfPages, itemsPerPage: itemsPerPage}


}