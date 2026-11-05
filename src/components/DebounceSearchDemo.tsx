import { useEffect, useState, type ChangeEvent  } from "react"
import { styles } from "../styles/styles";
import { useDebounce } from "../hooks/useDebounce";



export default function DebounceSearchDemo(){

    const [searchText, setSearchText] = useState("")

    //debouncedSearchTerm is a string because T is inferred as a string
    const debouncedSearchTerm = useDebounce(searchText)

    
    useEffect(() => {
        // do nothing for empty searches
        if (debouncedSearchTerm === "")  return

        console.log(`Searching for: ${debouncedSearchTerm}`);
    }, [debouncedSearchTerm])

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
        setSearchText(e.target.value)
        console.log("Changed");
      }

    return (
        <section className={`${styles.section} flex flex-col gap-5`}>
            <h2>Debounce Search Demo</h2>
            <input 
            type="text"
            placeholder="Type to search...."
            value={searchText} 
            onChange={handleSearchChange} />
            <p>Current Input: {searchText}</p>
            <p>Debounceed Value (after500ms): {debouncedSearchTerm}</p>
            <p>Simulate Search Results:</p>
            <p>Type to see results</p>
        </section>
    )
}