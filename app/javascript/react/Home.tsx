import React, { useState, useEffect } from "react"

import Pagination from 'Pagination'
import RecipeCard from 'RecipeCard'

import useDebounce from 'hooks/useDebounce'
import useRecipes from 'hooks/useRecipes'

import SearchIcon from 'images/svg/search.svg'
import LoaderIcon from 'images/svg/loader.svg'

interface SearchBarProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
}

const SearchBar = ({ search, setSearch } : SearchBarProps) => (
    <div className="relative flex mt-2 rounded-md shadow-sm items-center justify-center w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-gray-500"/>
        </div>
        <input
            type="text"
            name="search"
            id="search"
            className="block w-full h-14 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-theme-purple placeholder:text-gray-400 focus:ring-4 outline-none sm:text-sm sm:leading-6"
            placeholder="Banana bread, Garlic and tomatoes, Mexican recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
)

export default () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const debouncedSearch = useDebounce<string>(search, 500)
    const { recipes, totalPages, isLoading } = useRecipes(debouncedSearch, currentPage)

    const noResults = recipes.length === 0

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch])

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-center justify-center w-full md:w-4/5 mb-10">
                <SearchBar search={search} setSearch={setSearch} />
                <Pagination currentPage={noResults ? 0 : currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
                {isLoading ? (
                    <LoaderIcon className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-theme-purple" />
                ) : noResults ? (
                    <span>No results for {debouncedSearch}</span>
                ) : recipes.map(({ id, ...recipe }) => <RecipeCard key={id} {...recipe} />)}
            </div>
        </div>
    )
};
