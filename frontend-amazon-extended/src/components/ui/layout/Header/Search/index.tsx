import Link from "next/link";
import React from "react";
const Search: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="mb-3 ml-5 mt-6 w-1/2">
      <div className="relative mb-4 flex  flex-wrap items-stretch">
        <input
          type="search"
          id="message"
          autoComplete="off"
          className="relative text-white m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l-xl bg-black bg-clip-padding px-6 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 transition duration-200 ease-in-out focus:z-[3] focus:outline-none focus:border-primary focus:text-white "
          placeholder="Поиск"
          aria-label="Search"
          aria-describedby="button-addon1"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />

        <Link
          className="relative z-[2] flex items-center rounded-r-xl bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light"
          href={`/q?term=${inputValue}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#fff"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
export default Search;
