import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';

export default function SearchBox() {
  return (
    // {/* Search box */}
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center rounded-md border-b border-white/5">

    <div className="flex flex-1 self-stretch bg-[#38404b]">
        <form className="flex flex-1" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
            Search
        </label>
        <div className="relative w-full ">
            <FaSearch
            className="pointer-events-none absolute inset-y-0 lg:left-8 left-3 h-full w-5 text-gray-500"
            aria-hidden="true"
            />
            <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-10 lg:pl-16 pr-4 text-gray-300 lg:text-lg focus:ring-0 ring-0 text-sm"
            placeholder="Search name..."
            type="search"
            name="search"
            />
        </div>
        </form>
    </div>
    </div>
  )
}
