import { useState } from "react";


//<T> is a generic type parameter: a placeholder for whatever type is passes in
//value: T means the input can be any type
export function useDebounce<T>(value: T): T {
    //starts as the current value
    const [debouncedValue, setDebounceValue] = useState(value);

    return debouncedValue;
}