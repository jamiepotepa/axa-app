import { ChangeEvent } from "react";

import "./search-and-filter.scss";

type SearchAndFilterProps = {
  handleSearchOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function SearchAndFilter({ handleSearchOnChange }: SearchAndFilterProps) {
  return (
    <div className="search-and-filter">
      <input
        type="text"
        placeholder="Search notes..."
        className="search-and-filter__search"
        onChange={handleSearchOnChange}
      />

      <div className="search-and-filter__filter">
        <select>
          <option value="all">All</option>
          <option value="important">Important</option>
        </select>
      </div>
    </div>
  );
}

export default SearchAndFilter;
