import { useEffect, useState, type ChangeEvent } from "react";
import { styles } from "../styles/styles";
import { useDebounce } from "../hooks/useDebounce";

const RESULT_COUNT = 3;

export default function DebounceSearchDemo() {
  const [searchText, setSearchText] = useState("");
  const [delay, setDelay] = useState(500);
  //debouncedSearchTerm is a string because T is inferred as a string
  const debouncedSearchTerm = useDebounce(searchText, delay);

  const results = Array.from(
    { length: RESULT_COUNT },
    (_, index) => `Result for "${debouncedSearchTerm}": Item ${index + 1}`,
  );

  useEffect(() => {
    // do nothing for empty searches
    if (debouncedSearchTerm.trim() === "") return;

    console.log(`Searching for: ${debouncedSearchTerm}`);
  }, [debouncedSearchTerm]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchText(e.target.value);
  }

  function handleDelayChange(e: ChangeEvent<HTMLInputElement>): void {
    const parsedValue = Number(e.target.value);
    setDelay(Number.isNaN(parsedValue) ? 0 : Math.max(0, parsedValue));
  }

  return (
    <section className={`${styles.section} flex flex-col gap-5`}>
      <h2>Debounce Search Demo</h2>

      <div>
        <label>Debounce Delay (ms):</label>
        <input
          type="number"
          min={0}
          step={100}
          value={delay}
          onChange={handleDelayChange}
        />
      </div>
      <input
        type="text"
        placeholder="Type to search...."
        value={searchText}
        onChange={handleSearchChange}
      />
      <p>Current Input: {searchText}</p>
      <p>Debounceed Value (after500ms): {debouncedSearchTerm}</p>
      <p>Simulate Search Results:</p>
      {debouncedSearchTerm.trim() === "" ?( 
        <p>Type to see results</p>
       ) : (
        <ul>
            {results.map((result) => (
                <li key={result}>{result}</li>
            ))}
        </ul>
       )
    }
    </section>
  );
}
