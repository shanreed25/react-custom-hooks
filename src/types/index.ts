export interface PaginationOptions {
    totalItems: number;//number of items in the list
    itemsPerPage?: number;//how many items each page shows
    initialPage?: number; //page to start on
    
}

//for what the hook returns
export interface PaginationResults{
    currentPage: number;
    totalPages: number;
    startIndex: number;//starting index of items for the current page (0-based)
    endIndex: number;// ending index of items for the current page (0-based)
    nextPage:() => void;
    prevPage:() => void;
    setPage: (pageNumber: number) => void;//function to jump to a specific page number
    canNextPage: boolean;
    canPrevPage: boolean;
    itemsOnCurrentPage: number;//actual number of items on the current page 
    // itemsPerPage?: number;
}