import { useState, type ChangeEvent  } from "react"
import { styles } from "../styles/styles";

export default function DebounceSearchDemo(){

    const [searchText, setSearchText] = useState("")

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
            <p>Current Input:</p>
            <p>Debounceed Value (after500ms):</p>
            <p>Simulate Search Results:</p>
            <p>Type to see results</p>
        </section>
    )
}