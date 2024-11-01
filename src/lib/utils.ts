import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import { SearchResult, RestaurantResult, DishResult } from "./types" // Import SearchResult and PlaceResult from types.ts

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const searchGooglePlaces = async (query: string, cityId?: string) => {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=restaurant&key=${GOOGLE_API_KEY}`;
    
    if (cityId) {
        url += `&locationbias=place:${cityId}`;
    }
    
    const response = await fetch(url);
    return response.json();
};

export const searchSpoonacular = async (query: string) => {
    const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const response = await fetch(
        `https://api.spoonacular.com/food/search?query=${encodeURIComponent(query)}&apiKey=${SPOONACULAR_API_KEY}`
    );
    return response.json();
};

export const searchUserContent = async (query: string, cityId?: string) => {
    const params = new URLSearchParams();
    params.append('q', query);
    if (cityId) {
        params.append('cityId', cityId);
    }

    const response = await fetch(`/api/search/content?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch user content');
    }

    return response.json();
};

// export const formatPlacesResults = (results: { results: any[] }): RestaurantResult[] => {
//     return results.results.map((place: any) => ({
//         id: place.place_id,
//         type: 'restaurant',
//         title: place.name,
//         description: place.formatted_address,
//         location: place.formatted_address,
//         priceRange: place.price_level ? `$${place.price_level}` : 'N/A',
//         cuisine: place.types.join(', '),
//         rating: place.rating,
//         reviews: place.user_ratings_total,
//         image: place.photos ? place.photos[0].photo_reference : undefined,
//         tags: place.types,
//     }));
// };

// export const formatDishResults = (results: { searchResults: any[] }): DishResult[] => {
//     return results.searchResults.map((item: any) => ({
//         id: item.id,
//         type: 'dish',
//         title: item.title,
//         description: item.content,
//         image: item.image,
//         cuisine: item.cuisine,
//         priceRange: item.priceRange,
//         calories: item.calories,
//         ingredients: item.ingredients,
//         dietaryInfo: item.dietaryInfo,
//         whereToFind: item.whereToFind,
//     }));
// };

// export const formatUserResults = (results: any[]): SearchResult[] => {
//     return results.map((item: any) => ({
//         id: item.id,
//         type: 'post',
//         title: item.title,
//         description: item.description,
//         image: item.image,
//         author: item.author,
//         postedAt: item.postedAt,
//         likes: item.likes,
//         comments: item.comments,
//         locationTag: item.locationTag,
//     }));
// };
