'use client'
import React, { useRef, useState, Fragment, useEffect } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Combobox, Transition } from '@headlessui/react'
import { HiChevronUpDown, HiMiniXMark } from 'react-icons/hi2'
import { AiOutlineCheck } from 'react-icons/ai'
import { useTextSearchNav } from '../../context/textSearch.context'
import { FaSearch } from 'react-icons/fa';
// import { useRouter } from 'next/navigation'

export  type searchType = {
    id: string | number,
    title: string,
    [key: string]: any,
}

export type styleOptions = {
  bg?: string;
  textColor?: string;
  placeholder?: string;
}

//Famimilizing with the code below (SearchBoxIndex)
//it's a dynamic search box to search array of data based on fullname and name following our api convertion for project 5s

//1. create a reactjs context for text(string) search based on the api search query
//1a. The context on change makes an api refetch query based off your search text
// 2. searchArray: is/should be the response data array from the api call
// 2a. The search query will also work well with any dummy array data but should have a property of
// 2aii. FullName or Name properties

//3. linkto: isn't really important but i've added should incase we want to redirect or view search result in another page.

//Happy coding guys ===>>>>>> Dimgba Micheal says 'hi'😅

export default function SearchBoxIndex({searchArray, linkTo, bg, textColor, placeholder }: {searchArray: [searchType], linkTo?: string, bg?: string, textColor?: string, placeholder?: string }) {
  const [selected, setSelected] = useState<any>(null)
  const [query, setQuery] = useState('')
  // const [ textSearch, setTextSearch ] = useState('')
  let { textSearch, setTextSearch } = useTextSearchNav()
  // const router = useRouter()

  useEffect(() => {
    setQuery(textSearch)
    setSelected(textSearch)
  }, [textSearch])
  
  const filteredPeople =
    query === ''
      ? searchArray
      : searchArray?.filter((person) =>
          (person?.FullName ?? person?.name)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query?.toLowerCase()?.replace(/\s+/g, ''))
        )

  const handleSearchChange = (admin: any) => {
      setTextSearch(query || (admin?.FullName?? admin?.name)?.trim()) 
    // router.push(`${linkTo}${query}`)
  }
  
  const handleArrowBackButton = () => {
    setQuery('')
    setSelected('')
    setTextSearch('')
    // router?.push('/admin')
  }

  const handleInputXbutton = () => {
    setTextSearch('')
  }

  const colorText = textColor ?? '#CBCBCB'
  return (
    <>
      <Combobox 
        as={'form'}
        value={textSearch} 
        onChange={handleSearchChange} 
        className="flex font-mono items-center box-border duration-300 ease-in-out">
          <div className="relative mt-1 mx-auto max-w-7xl w-full">
            <div className={`relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ${bg ?? 'bg-[#38404b]'} lg:h-16 h-12 flex justify-between items-center px-4 rounded-[0.99063rem] box-border
            `}>
              <p className={`text-base text-[${colorText}] z-20 lg:w-7 w-5 cursor-pointer`}>
                {query === '' || selected === '' || textSearch === '' ? <FaSearch title='search' className={`text-base text-[#CBCBCB] ` }/> : <BiArrowBack title='go back' onClick={handleArrowBackButton} className={`md:text-2xl text-xl text-[#CBCBCB] `} />}
              </p>
              <Combobox.Input
                className={`bg-inherit admin-search w-full h-full outline-none ring-0 border-none px-4 rounded-[0.99063rem] placeholde-[#CBCBCB] text-base box-border duration-200 ease-linear caret-[${colorText}] py-2 pl-3 pr-10 leading-5 text-[${colorText}] focus:ring-0 
                 border-b-2 border-gray-300 appearance-none focus:outline-none  focus:border-primary peer`}
                // displayValue={(person: any) => person.FullName}
                // value={query}
                // name='title'
                autoComplete="off"
                placeholder={`${placeholder ?? 'Search Names...'}`}
                required
                onChange={(event) => setQuery(event.target.value.trim() || (selected?.FullName ?? selected?.name).trim())}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
                {
                  query === '' || selected === '' || textSearch === '' ? 
                  <HiChevronUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    title='click to selete'
                  /> 
                  : 
                  <HiMiniXMark
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    onClick={handleInputXbutton}
                    title='clear search text'
                  /> 
                }
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              //the afterLeave sets the state after you leave or after you search as implemented
              // afterLeave={() => setQuery(qeury)}
            >
              <Combobox.Options className="absolute mt-1 max-h-80 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg drop-shadow-2xl ring-1 z-30 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredPeople?.length === 0 && textSearch !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-600">
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople?.map((person) => (
                    <Combobox.Option
                      key={person.id ?? person.Id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-primary/90 flex items-center z-[999] ${
                          active ? 'bg-primary text-white' : 'text-gray-600'
                        }`
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`truncate flex items-center ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {(person?.FullName ?? person?.name)}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-[#a60800]'
                              }`}
                            >
                              <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
      </Combobox>
    </>
  )
}
