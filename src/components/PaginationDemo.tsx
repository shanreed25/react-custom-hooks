


/*
constant for the items list
Array.from(buildFrom, fillEachSloct()): takes two arguments and makes a new array, takes two arguments
Array.from({ length: 123 }): builds an array of 123 items: [undefined, undefined, undefined, ... 123 times]
(_, index) => `Item ${index + 1}`: The second argument the function 
    - `_`, first parameter is the slot value and since each slot is undefined '_'(convention) is used to ignore the parameter
    - 'index second parameter: Each item gets and index : index is the position, starting at 0 and going up to 122
        Position start at 0 so to name each item, Item 1, Item 2 etc..... 1 is added to the 
index to get Item 1 to Item 123
*/

const ITEMSLIST: string[] = Array.from({ length: 123 }, (_, index) => `Item ${index + 1}`);

export default function PaginationDemo(){



    return (
        <>
        <h2 className="text-3xl">Pagination Demo</h2>
        <ul>
            {ITEMSLIST.map((item) => (
                <li>{item}</li>

            ))}
        </ul>
        </>
    )
}