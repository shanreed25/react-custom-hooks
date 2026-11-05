# React Custom Hook


## Pagination
> Custom hook for pagination

Shows a list of 123 items (Item 1 to Item 123) split into pages. On the page you can:

- See the items on the current page
- Go forward or back one page with the **Next** and **Previous** buttons
- Jump straight to a page by clicking its number
- Change how many items show per page (5, 10, 15, or 20) with the dropdown
- See the current page and total pages ("Page 1 of 13")
- See which items are showing and how many are on the page ("Showing items 1 - 10 (Total on this page: 10)")

**Previous** is disabled on the first page and **Next** is disabled on the last page. The current page number button is highlighted and disabled.

## The usePagination hook

`usePagination` (in `src/hooks/usePagination.ts`) does all the page math. It doesn't hold the list or render anything. It takes the number of items, works out which part of the list belongs on the current page, and gives back the values and functions the component needs. Any component with a list can use it.

### Options

```ts
usePagination({ totalItems, itemsPerPage, initialPage })
```

| Option | Type | Default | Description |
|---|---|---|---|
| `totalItems` | `number` | required | How many items are in the list |
| `itemsPerPage` | `number` | `10` | How many items each page shows |
| `initialPage` | `number` | `1` | The page to start on |

### What it returns

| Value | Type | Description |
|---|---|---|
| `currentPage` | `number` | The page being shown (starts at 1) |
| `totalPages` | `number` | How many pages there are |
| `startIndex` | `number` | Index of the first item on the current page (starts at 0) |
| `endIndex` | `number` | Index of the last item on the current page (starts at 0) |
| `itemsOnCurrentPage` | `number` | How many items are on the current page |
| `canNextPage` | `boolean` | `true` if there is a page after this one |
| `canPrevPage` | `boolean` | `true` if there is a page before this one |
| `nextPage` | `() => void` | Goes to the next page |
| `prevPage` | `() => void` | Goes to the previous page |
| `setPage` | `(pageNumber: number) => void` | Goes to a specific page |

[More Information About the `usePagination` hook](./PAGINATION.md)