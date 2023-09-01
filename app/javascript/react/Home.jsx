import React, { useEffect } from "react";

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value)

    useEffect(() => {
        const timeoutHandler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeoutHandler)
    }, [value])

    return debouncedValue
}

const useRecipes = (search, currentPage) => {
    const [recipes, setRecipes] = React.useState([])
    const [totalPages, setTotalPages] = React.useState(0)

    const fetchData = async (search, currentPage) => {
        const result = await fetch(`recipes.json?page=${currentPage}${search.length > 0 ? `&search=${search}` : ''}`)
        const jayson = await result.json()
        setRecipes(jayson.data)
        setTotalPages(jayson.meta.total)
    }

    useEffect(() => {
        fetchData(search, currentPage)
    }, [search, currentPage])

    return [recipes, totalPages]
}

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalPages
}) => {

    const nextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
    }

    const prevPage = () => {
        setCurrentPage(prevPage => Math.max(1, prevPage - 1))
    }

    return (
        <div className="flex flex-row justify-end items-center mt-2 w-full">
            <span className="text-sm text-gray-700">
                Page <span className="font-semibold text-gray-900">{currentPage}</span> out of <span className="font-semibold text-gray-900">{totalPages}</span>
            </span>
            <div className="inline-flex ml-2">
                <button disabled={currentPage === 1} onClick={() => prevPage()} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-theme-pink rounded-l hover:bg-theme-light-pink disabled:opacity-50">
                    <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Prev
                </button>
                <button onClick={() => nextPage()} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-theme-pink border-0 border-l border-theme-light-pink rounded-r hover:bg-theme-light-pink disabled:opacity-50">
                    Next
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

const Rating = ({ ratings }) => {
    return (
        <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="text-sm font-bold text-theme-blue">{ratings}</p>
        </div>
    )
}

const RecipeCard = ({
    category,
    cook_time_min,
    image_url,
    ingredients,
    prep_time_min,
    ratings,
    title,
}) => {
    return (
        <div className="recipe-card bg-white max-w-sm rounded overflow-hidden shadow-lg w-full">
            <div className="relative h-48 w-full overflow-hidden text-center bg-gray-800">
                <div className="absolute top-2 right-2 rounded-md shadow-sm bg-white p-2">
                    <Rating ratings={ratings} />
                </div>
                <div className="absolute top-2 left-2 shadow-sm bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full">
                    <div className="flex items-center">
                        <span class="text-xs font-medium">{category}</span>
                    </div>
                </div>
                <img className="inline object-fill" src={image_url} alt={title} />
            </div>
            <div className="px-6 py-4 border-b-2 border-theme-purple">
                <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-xl text-gray-800">{title}</div>
                </div>
                <div className="text-gray-700 text-base h-36 overflow-y-auto">
                    <ul>
                        {ingredients.map((ingredient) => <li>{ingredient}</li>)}
                    </ul>
                </div>
            </div>
            <div className="flex justify-between items-center px-6 py-4 text-sm">
                {prep_time_min === 0 ? <span className="font-bold">No preping</span> : <span>Prep <span className="font-bold">{prep_time_min}</span>min</span>}
                {cook_time_min === 0 ? <span className="font-bold">No cooking</span> : <span>Cook <span className="font-bold">{cook_time_min}</span>min</span>}
            </div>
        </div>
    )
}

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="flex mt-2 rounded-md shadow-sm items-center justify-center w-full">
            <input
                type="text"
                name="search"
                id="search"
                className="block w-full h-14 rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-theme-purple placeholder:text-gray-400 focus:ring-4 outline-none sm:text-sm sm:leading-6"
                placeholder="Banana bread, Garlic and tomatoes, Mexican recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}

export default () => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const [search, setSearch] = React.useState('')
    const debouncedSearch = useDebounce(search, 500)
    const [recipes, totalPages] = useRecipes(debouncedSearch, currentPage)

    React.useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearch])

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-center justify-center w-full md:w-4/5 mb-10">
                <SearchBar search={search} setSearch={setSearch} />
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>
            <div className="flex flex-wrap justify-evenly gap-x-4 gap-y-8">
                {recipes.length === 0 ? (
                    <span>No results for {debouncedSearch}</span>
                ) : recipes.map(({ id, ...recipe }) => <RecipeCard key={id} {...recipe} />)
                }
            </div>
        </div>
    )
};
