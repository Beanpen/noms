import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: combine with types.ts
export interface SearchResult {
    id: string;
    type: 'place' | 'dish' | 'cuisine' | 'user';
    name: string;
    description: string;
    image?: string;
    location?: {
      address: string;
      city: string;
      country: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    rating?: number;
    priceLevel?: string;
  }
  
  export const searchGooglePlaces = async (query: string, cityId?: string) => {
    // Modified to include locationbias
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=restaurant&key=${GOOGLE_API_KEY}`;
    
    if (cityId) {
      url += `&locationbias=place:${cityId}`;
    }
    
    const response = await fetch(url);
    return response.json();
  };
  
  export const searchSpoonacular = async (query: string) => {
    // Spoonacular API
    const SPOONACULAR_API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const response = await fetch(
      `https://api.spoonacular.com/food/search?query=${encodeURIComponent(query)}&apiKey=${SPOONACULAR_API_KEY}`
    );
    return response.json();
  };
  
  export const searchUserContent = async (query: string, cityId?: string) => {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('q', query);
    if (cityId) {
      params.append('cityId', cityId);
    }
  
    // Example API endpoint with filtering
    const response = await fetch(`/api/search/content?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user content');
    }
  
    return response.json();
  };
  
  // Format results from different APIs into a consistent structure
  export const formatPlacesResults = (results: any): SearchResult[] => {
    return results.results.map((place: any) => ({
      id: place.place_id,
      type: 'place',
      name: place.name,
      description: place.formatted_address,
      location: {
        address: place.formatted_address,
        city: place.city,
        country: place.country,
        coordinates: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
      },
      rating: place.rating,
      priceLevel: place.price_level,
    }));
  };
  
  export const formatDishResults = (results: any): SearchResult[] => {
    return results.searchResults.map((item: any) => ({
      id: item.id,
      type: 'dish',
      name: item.title,
      description: item.content,
      image: item.image,
    }));
  };
  
  export const formatUserResults = (results: any): SearchResult[] => {
    return results.map((item: any) => ({
      id: item.id,
      type: 'user',
      name: item.title,
      description: item.description,
      image: item.image,
    }));
  };