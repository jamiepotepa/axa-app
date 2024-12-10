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

//! If clearing the search field when add note is clicked, you need to use forward ref below
// import { ChangeEvent, forwardRef, Ref } from "react";

// import "./search.scss";

// type SearchAndFilterProps = {
//   handleSearchOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   ref?: Ref<HTMLInputElement>;
// };

// const SearchAndFilter = (
//   { handleSearchOnChange }: SearchAndFilterProps,
//   ref: Ref<HTMLInputElement>
// ) => {
//   return (
//     <div className="search">
//       <input
//         type="text"
//         placeholder="Search notes..."
//         className="search__input"
//         onChange={handleSearchOnChange}
//         ref={ref}
//       />

//       {/* <div className="search-and-filter__filter">
//         <select>
//           <option value="all">All</option>
//           <option value="important">Important</option>
//         </select>
//       </div> */}
//     </div>
//   );
// };

// const SearchAndFilterForwardRef = forwardRef<
//   HTMLInputElement,
//   SearchAndFilterProps
// >(SearchAndFilter);
// export default SearchAndFilterForwardRef;
