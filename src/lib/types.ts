// app/lib/types.ts

export type ResultType = 'restaurant' | 'dish' | 'post' | 'expert' | 'cuisine';

export interface BaseResult {
  id: string;
  type: ResultType;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  rating?: number;
  isVerified?: boolean;
}

export interface RestaurantResult extends BaseResult {
  type: 'restaurant';
  location: string;
  priceRange: string;
  cuisine: string;
  openNow?: boolean;
  distance?: string;
  reviews: number;
  popularDishes?: {
    name: string;
    price: string;
    rating: number;
  }[];
  hours?: string;
  features?: string[];
}

export interface DishResult extends BaseResult {
  type: 'dish';
  cuisine: string;
  priceRange: string;
  calories?: string;
  ingredients?: string[];
  dietaryInfo?: string[];
  whereToFind?: {
    name: string;
    location: string;
    price: string;
    rating: number;
    distance: string;
  }[];
}

export interface PostResult extends BaseResult {
  type: 'post';
  author: {
    name: string;
    image?: string;
    isVerified?: boolean;
  };
  postedAt: string;
  likes: number;
  comments: number;
  locationTag?: string;
}

export interface ExpertResult extends BaseResult {
  type: 'expert';
  expertise: string[];
  followers: number;
  recommendations: number;
  location: string;
  languages?: string[];
  recentActivity?: {
    type: 'review' | 'guide' | 'recommendation';
    title: string;
    date: string;
  }[];
}

export type SearchResult = RestaurantResult | DishResult | PostResult | ExpertResult;