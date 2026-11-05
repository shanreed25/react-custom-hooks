### Example

```tsx
const { startIndex, endIndex, nextPage, prevPage, canNextPage, canPrevPage } =
  usePagination({ totalItems: items.length, itemsPerPage: 10 });

// slice stops before its second argument, so add 1 to include the last item
const itemsToShow = items.slice(startIndex, endIndex + 1);
```

### How it works

**1. Page size**

```ts
const pageSize = Math.max(1, itemsPerPage);
```

If `itemsPerPage` is 0 or negative, it's treated as 1. This prevents dividing by zero.

**2. Total pages**

```ts
const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
```

The number of items is divided by the page size and rounded up, so leftover items get their own page. For example, 123 items at 10 per page is 12.3, which rounds up to 13. `Math.max(1, ...)` keeps at least one page, so an empty list shows "Page 1 of 1" instead of "Page 1 of 0".

**3. The requested page is stored in state**

```ts
const [requestedPage, setRequestedPage] = useState(() =>
  getValidPage(totalPages, initialPage, 1)
);
```

The hook stores the page that was asked for. The starting value is passed as a function, so React works it out only on the first render. `getValidPage` makes sure the starting page actually exists (see the helper functions below).

**4. The current page always fits**

```ts
const currentPage = clamp(1, totalPages, requestedPage);
```

The page count can shrink after a page was chosen. If you're on page 13 at 10 per page and switch to 20 per page, there are only 7 pages. This line runs on every render and pulls the page back into range, so page 13 becomes page 7.

**5. Start and end index**

```ts
const startIndex = (currentPage - 1) * pageSize;
const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
```

Pages start at 1 but array indexes start at 0. The number of items on earlier pages is the same as the index of the first item on this page. On page 2 at 10 per page, 10 items come before it, so `startIndex` is 10.

The end index is normally the start index plus the page size minus 1. On the last page there may be fewer items, so `Math.min` uses the last item in the list if that comes first. On page 13 this gives indexes 120 to 122, which are Item 121 to Item 123.

**6. Items on the current page**

```ts
const itemsOnCurrentPage = endIndex - startIndex + 1;
```

Indexes 120 to 122 are 3 items. For an empty list this is 0, which the component uses to show "No items to display".

**7. Can the user move?**

```ts
const canNextPage = currentPage < totalPages;
const canPrevPage = currentPage > 1;
```

The component uses these to disable the Next and Previous buttons.

**8. Navigation functions**

```ts
const nextPage = useCallback(() => {
  setRequestedPage(clamp(1, totalPages, currentPage + 1));
}, [currentPage, totalPages]);

const prevPage = useCallback(() => {
  setRequestedPage(clamp(1, totalPages, currentPage - 1));
}, [currentPage, totalPages]);

const setPage = useCallback((pageNumber: number) => {
  setRequestedPage((page) => getValidPage(totalPages, pageNumber, page));
}, [totalPages]);
```

`nextPage` and `prevPage` move one page and use `clamp` so they can't go past the first or last page. `setPage` jumps to any page and uses `getValidPage` to fix numbers that are out of range.

Each function is wrapped in `useCallback`, so React keeps the same function between renders unless a value in its dependency array changes.

### Helper functions

Both helpers are at the top of `src/hooks/usePagination.ts`, outside the hook.

**`clamp(min, max, value)`** keeps a number inside a range:

```ts
function clamp(min: number, max: number, value: number): number {
  const floor = Math.max(value, min);
  return Math.min(floor, max);
}
```

`Math.max` raises anything below `min` up to `min`, and `Math.min` lowers anything above `max` down to `max`.

**`getValidPage(totalPages, pageNumber, fallback)`** turns any number into a page that exists:

```ts
function getValidPage(totalPages: number, pageNumber: number, fallback: number): number {
  if (Number.isNaN(pageNumber)) return fallback;
  return clamp(1, totalPages, Math.floor(pageNumber));
}
```

- A decimal is rounded down: `2.5` becomes page `2`.
- A number that's too small or too large is clamped: `0` becomes `1`, and `99` becomes the last page.
- `NaN` returns the fallback. For `setPage` the fallback is the current page, so nothing changes. For `initialPage` the fallback is page `1`.

### Edge cases

| Input | Result |
|---|---|
| `setPage(99)` on a 13-page list | Page 13 |
| `setPage(0)` | Page 1 |
| `setPage(2.5)` | Page 2 |
| `setPage(NaN)` | Stays on the current page |
| `initialPage` of 0, 99, 2.5, or NaN | Page 1, 13, 2, or 1 |
| `totalItems` of 0 | "Page 1 of 1", both buttons disabled, 0 items |
| `itemsPerPage` of 0 or less | Treated as 1 |
| On page 13, switch from 10 to 20 per page | Page 7 |