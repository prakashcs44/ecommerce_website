import React from "react";


function Search({value,onChange,onSearch}) {

    

    return (
        <form onSubmit={onSearch} className="flex flex-col sm:flex-row">
            <input
                type='text'
                placeholder='Search a product...'
                className="border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0 sm:mr-2"
                onChange={onChange}
                value={value}
            />
            <button
                type='submit'
                className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
                Search
            </button>
        </form>
    );
}

export default Search;
