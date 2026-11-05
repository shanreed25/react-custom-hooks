export interface PaginationOptions {
    totalItems: number;//number of items in the list
    itemsPerPage?: number;//how many items each page shows
}

//for what the hook returns
export interface PaginationResults{
    totalPages: number
    itemsPerPage?: number;
}