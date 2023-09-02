
import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timeoutHandler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeoutHandler)
    }, [value])

    return debouncedValue
}

export default useDebounce
