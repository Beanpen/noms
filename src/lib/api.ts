// app/lib/api.ts

import { SearchResult } from "./types";

export interface SearchParams {
    query: string;
    category: string;
    priceFilter?: string[];
    ratingFilter?: number;
    distanceFilter?: number;
    openNowFilter?: boolean;
    sortBy?: string;
    page?: number;
  }
  
  export interface SearchResponse {
    results: SearchResult[];
    hasMore: boolean;
    total: number;
  }
  
  export async function fetchSearchResults(params: SearchParams): Promise<SearchResponse> {
    try {
      const queryParams = new URLSearchParams({
        q: params.query,
        category: params.category,
        page: (params.page || 1).toString(),
      });
  
      // Add optional filters
      if (params.priceFilter?.length) {
        queryParams.set('price', params.priceFilter.join(','));
      }
      if (params.ratingFilter) {
        queryParams.set('rating', params.ratingFilter.toString());
      }
      if (params.distanceFilter) {
        queryParams.set('distance', params.distanceFilter.toString());
      }
      if (params.openNowFilter) {
        queryParams.set('openNow', 'true');
      }
      if (params.sortBy) {
        queryParams.set('sort', params.sortBy);
      }
  
      const response = await fetch(`/api/search/content?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Search error:', error);
      throw error instanceof Error 
        ? error 
        : new Error('An error occurred while searching');
    }
  }