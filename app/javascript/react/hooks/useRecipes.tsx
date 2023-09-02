import { useState, useEffect } from "react";
import type { RecipesResponse, Recipe } from "types";

const useRecipes = (search: string, currentPage: number): {
    recipes: Recipe[], totalPages: number, isLoading: boolean
} => {
    const [loading, setLoading] = useState<boolean>(false)
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        const fetchRecipes = async () => {
            const result = await fetch(`recipes.json?page=${currentPage}${search.length > 0 ? `&search=${search}` : ''}`)
            return await result.json() as RecipesResponse
        }

        setLoading(true)
        fetchRecipes()
            .then(response => {
                setRecipes(response.data)
                setTotalPages(response.meta.total)
            }).catch(() => {
                setRecipes([])
                setTotalPages(0)
            }).finally(() => {
                setLoading(false)
            })
    }, [search, currentPage])

    return { recipes, totalPages, isLoading: loading }
}

export default useRecipes
