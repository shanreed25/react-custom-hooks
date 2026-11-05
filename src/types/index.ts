export interface PaginationOptions {
    totalItems: number;//number of items in the list
    itemsPerPage?: number;//how many items each page shows
    initialPage?: number; //page to start on
    
}

//for what the hook returns
export interface PaginationResults{
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    nextPage:() => void;
    prevPage:() => void;
    canNextPage: boolean;
    canPrevPage: boolean;
    itemsOnCurrentPage: number;
    // itemsPerPage?: number;
}