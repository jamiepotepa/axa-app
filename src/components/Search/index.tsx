import { ChangeEvent, forwardRef, Ref } from "react";

import "./search.scss";

type SearchProps = {
  handleSearchOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
};

const Search = (
  { handleSearchOnChange }: SearchProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search notes..."
        className="search__input"
        onChange={handleSearchOnChange}
        ref={ref}
      />
    </div>
  );
};

const SearchWithForwardRef = forwardRef<HTMLInputElement, SearchProps>(Search);
export default SearchWithForwardRef;
