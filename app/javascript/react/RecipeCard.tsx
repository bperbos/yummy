import React from "react"
import StarIcon from 'images/svg/star.svg'

import type { Recipe } from "types"

const Rating = ({ ratings } : { ratings: number }) => (
    <div className="flex items-center">
        <StarIcon className="w-4 h-4 text-yellow-300 mr-1" />
        <p className="text-sm font-bold text-theme-blue">{ratings}</p>
    </div>
)

const RecipeCard = ({
    category,
    cook_time_min,
    image_url,
    ingredients,
    prep_time_min,
    ratings,
    title,
}: Omit<Recipe, 'id'>) => (
    <div className="recipe-card bg-white max-w-sm rounded overflow-hidden shadow-lg w-full">
        <div className="relative h-48 w-full overflow-hidden text-center bg-gray-800">
            <div className="absolute top-2 right-2 rounded-md shadow-sm bg-white p-2">
                <Rating ratings={ratings} />
            </div>
            <div className="absolute top-2 left-2 shadow-sm bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full">
                <div className="flex items-center">
                    <span className="text-xs font-medium">{category}</span>
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

export default RecipeCard
