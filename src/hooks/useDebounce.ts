import { useEffect, useState } from "react";


//<T> is a generic type parameter: a placeholder for whatever type is passes in
//value: T means the input can be any type
//delay, in milliseconds, with a default of 500
export function useDebounce<T>(value: T, delay: number = 500): T {
    //starts as the current value
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        // get the ID that setTimeout returns so the cleanup can cancel this exact timer
        const timerId = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timerId)
        }
    }, [value, delay])

    return debouncedValue;
}