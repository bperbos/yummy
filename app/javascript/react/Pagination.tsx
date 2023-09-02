import React from "react"
import ArrowLeftIcon from 'images/svg/arrow-left.svg'
import ArrowRightIcon from 'images/svg/arrow-right.svg'

interface PaginationProps {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
}

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalPages
}: PaginationProps) => {

    const nextPage = () => {
        setCurrentPage((prevPage: number) => Math.min(prevPage + 1, totalPages))
    }

    const prevPage = () => {
        setCurrentPage((prevPage: number) => Math.max(1, prevPage - 1))
    }

    return (
        <div className="flex flex-row justify-end items-center mt-2 w-full">
            <span className="text-sm text-gray-700">
                Page <span className="font-semibold text-gray-900">{currentPage}</span> out of <span className="font-semibold text-gray-900">{totalPages}</span>
            </span>
            <div className="inline-flex ml-2">
                <button disabled={currentPage < 2} onClick={prevPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-theme-pink rounded-l hover:bg-theme-light-pink disabled:opacity-50">
                    <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
                    Prev
                </button>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-theme-pink border-0 border-l border-theme-light-pink rounded-r hover:bg-theme-light-pink disabled:opacity-50">
                    Next
                    <ArrowRightIcon className="w-3.5 h-3.5 ml-2" />
                </button>
            </div>
        </div>
    )
}

export default Pagination
