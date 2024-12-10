import { ChangeEvent } from "react";

import "./search.scss";

type SearchAndFilterProps = {
  handleSearchOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function SearchAndFilter({ handleSearchOnChange }: SearchAndFilterProps) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search notes..."
        className="search__input"
        onChange={handleSearchOnChange}
      />
    </div>
  );
}

export default SearchAndFilter;
