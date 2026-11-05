import { useEffect, useState } from "react";


//<T> is a generic type parameter: a placeholder for whatever type is passes in
//value: T means the input can be any type
//delay, in milliseconds, with a default of 1000
export function useDebounce<T>(value: T, delay: number = 1000): T {
    //starts as the current value
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        setTimeout(() => {
            setDebounceValue(value)
        }, delay)
    }, [value, delay])

    return debouncedValue;
}