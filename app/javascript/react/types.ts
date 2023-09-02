export interface Recipe {
    id: number,
    category: string,
    cook_time_min: number,
    image_url: string,
    ingredients: string[],
    prep_time_min: number,
    ratings: number,
    title: string,
}

export interface RecipesResponse {
    data: Recipe[],
    meta: {
        total: number
    }
}
