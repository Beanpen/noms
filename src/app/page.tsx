"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Camera,
  X,
  ChevronDown,
  Trophy,
  Book,
  Utensils,
  Navigation,
  Heart,
  Share2,
  MessageCircle,
  Users,
  Bookmark,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface City {
  id: string;
  name: string;
  country: string;
  placeId: string;
}

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [popularCities] = useState<City[]>([
    { id: "1", name: "New York", country: "USA", placeId: "nyc_id" },
    { id: "2", name: "Tokyo", country: "Japan", placeId: "tokyo_id" },
    { id: "3", name: "Paris", country: "France", placeId: "paris_id" },
    { id: "4", name: "Bangkok", country: "Thailand", placeId: "bangkok_id" },
    {
      id: "5",
      name: "Singapore",
      country: "Singapore",
      placeId: "singapore_id",
    },
  ]);

  const userProfile = {
    name: "Cassie Zhang",
    achievements: 15,
    memories: 127,
    followers: 342,
    following: 289,
    favoriteCuisines: ["Chinese", "Korean", "Japenese"],
    recentAchievements: [
      { title: "Ramen Master", progress: 80 },
      { title: "Street Food Explorer", progress: 60 },
    ],
    savedPlaces: 45,
    contributions: 89,
  };

  const featuredStories = [
    {
      title: "Hidden Ramen Gems in Tokyo",
      author: "Mike T.",
      image: "/api/placeholder/300/200",
      likes: 234,
      comments: 45,
      cuisine: "Japanese",
    },
    {
      title: "Street Food Tour: Bangkok",
      author: "Lisa K.",
      image: "/api/placeholder/300/200",
      likes: 189,
      comments: 32,
      cuisine: "Thai",
    },
    {
      title: "Best Pasta in Rome",
      author: "Marco P.",
      image: "/api/placeholder/300/200",
      likes: 156,
      comments: 28,
      cuisine: "Italian",
    },
    {
      title: "Seoul BBQ Guide",
      author: "Jin K.",
      image: "/api/placeholder/300/200",
      likes: 201,
      comments: 37,
      cuisine: "Korean",
    },
  ];

  const recommendedPlaces = [
    {
      name: "Ramen Ichiran",
      location: "Shibuya",
      cuisine: "Japanese",
      distance: "0.8 km",
    },
    {
      name: "La Piazza",
      location: "Downtown",
      cuisine: "Italian",
      distance: "1.2 km",
    },
    {
      name: "Bangkok Street Kitchen",
      location: "Westside",
      cuisine: "Thai",
      distance: "1.5 km",
    },
    {
      name: "Seoul BBQ House",
      location: "Eastside",
      cuisine: "Korean",
      distance: "2.0 km",
    },
  ];

  const renderProfileSection = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/api/placeholder/48/48" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{userProfile.name}</CardTitle>
            <p className="text-sm text-gray-500">Food Explorer</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 text-sm">
          <div className="text-center">
            <Trophy className="h-4 w-4 mx-auto mb-1" />
            <div className="font-medium">{userProfile.achievements}</div>
            <div className="text-gray-500 text-xs">Achievements</div>
          </div>
          <div className="text-center">
            <Book className="h-4 w-4 mx-auto mb-1" />
            <div className="font-medium">{userProfile.memories}</div>
            <div className="text-gray-500 text-xs">Memories</div>
          </div>
          <div className="text-center">
            <Users className="h-4 w-4 mx-auto mb-1" />
            <div className="font-medium">{userProfile.followers}</div>
            <div className="text-gray-500 text-xs">Followers</div>
          </div>
          <div className="text-center">
            <Globe className="h-4 w-4 mx-auto mb-1" />
            <div className="font-medium">{userProfile.contributions}</div>
            <div className="text-gray-500 text-xs">Posts</div>
          </div>
        </div>

        {/* Current Achievements */}
        <div>
          <h4 className="text-sm font-medium mb-3">Current Quests</h4>
          <div className="space-y-3">
            {userProfile.recentAchievements.map((achievement, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{achievement.title}</span>
                  <span className="text-gray-500">{achievement.progress}%</span>
                </div>
                <Progress value={achievement.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Cuisines */}
        <div>
          <div className="text-sm font-medium mb-2">Favorite Cuisines</div>
          <div className="flex flex-wrap gap-2">
            {userProfile.favoriteCuisines.map((cuisine) => (
              <Badge key={cuisine} variant="secondary">
                {cuisine}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-between text-sm pt-2 border-t">
          <div className="flex items-center gap-1 text-gray-500">
            <Bookmark className="h-4 w-4" />
            <span>{userProfile.savedPlaces} places saved</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => router.push("/user-profile")}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchQuery.trim() && !selectedCity) return;
  
    setIsSearching(true);
    try {
      // Create search parameters
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      if (selectedCity) {
        params.set('cityName', selectedCity.name);
        params.set('cityId', selectedCity.placeId);
        params.set('country', selectedCity.country);
      }
  
      // Navigate to search results page with the parameters
      router.push(`/search-results?${params.toString()}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Get user's current city on load
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const city = await reverseGeocode(latitude, longitude);
          if (city) {
            setSelectedCity(city);
          }
        } catch (error) {
          console.error("Error getting user location:", error);
        }
      });
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    // TODO: Use Google's Geocoding API to get city from coordinates
    // const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    // );
    // const data = await response.json();

    // if (data.results?.length > 0) {
    //   const cityComponent = data.results[0].address_components.find(
    //     (component: any) => component.types.includes("locality")
    //   );
    //   const countryComponent = data.results[0].address_components.find(
    //     (component: any) => component.types.includes("country")
    //   );

    //   if (cityComponent && countryComponent) {
    //     return {
    //       id: data.results[0].place_id,
    //       name: cityComponent.long_name,
    //       country: countryComponent.long_name,
    //       placeId: data.results[0].place_id,
    //     };
    //   }
    // }
    if (lat === 0 && lng === 0) {
      return null;
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative flex gap-2">
          {/* City Selector */}
          <div className="w-48">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">
                      {selectedCity?.name || "Select City"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                  onClick={() => setSelectedCity(null)}
                  className="text-muted-foreground"
                >
                  All Cities
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={getUserLocation}
                  className="font-medium"
                >
                  📍 Current Location
                </DropdownMenuItem>
                {popularCities.map((city) => (
                  <DropdownMenuItem
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city.name}, {city.country}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <Input
              placeholder={`Search ${
                selectedCity ? `in ${selectedCity.name}` : "anywhere"
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    router.push("/"); // Reset to homepage
                  }}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
              <button
                type="submit"
                className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Search"
                disabled={isSearching}
              >
                <Search
                  className={`h-4 w-4 ${
                    isSearching ? "text-primary" : "text-gray-500"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <Button variant="outline" className="gap-2">
          <Camera className="h-4 w-4" />
          Upload Image
        </Button>
      </form>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Enhanced User Profile */}
        {renderProfileSection()}

        {/* Right Column - Interactive Map */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Your Food Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Interactive Map Component
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Stories */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Stories</h2>
          <Button variant="ghost" className="text-sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredStories.map((story, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-36 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                  {story.cuisine}
                </Badge>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-2">
                  {story.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="/api/placeholder/20/20" />
                    <AvatarFallback>{story.author[0]}</AvatarFallback>
                  </Avatar>
                  <span>{story.author}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {story.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {story.comments}
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Quick Links */}
        <Card className="h-fit">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start gap-2 h-9 sm:h-10 text-xs sm:text-sm w-full"
              >
                <Utensils className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Popular Cuisines
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-9 sm:h-10 text-xs sm:text-sm w-full"
              >
                <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Nearby Dishes
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 h-9 sm:h-10 text-xs sm:text-sm w-full"
              >
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Food Adventures
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="md:col-span-2">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              Recommended Near You
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recommendedPlaces.map((place, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm sm:text-base truncate">
                      {place.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {place.location} • {place.cuisine}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge
                      variant="secondary"
                      className="text-[10px] sm:text-xs whitespace-nowrap"
                    >
                      {place.distance}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                    >
                      <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* End of component */}
    </div>
  );
};

export default HomePage;


// TODO: Replace with actual API calls
  // useEffect(() => {
  //   const performSearch = async () => {
  //     if (!searchQuery) return;

  //     setIsSearching(true);
  //     setError(null);

  //     try {
  //       const searchTerm = selectedCity
  //         ? `${searchQuery} in ${selectedCity.name}`
  //         : searchQuery;

  //       // API calls
  //       const placesResults = await searchGooglePlaces(
  //         searchTerm,
  //         selectedCity?.placeId
  //       );
  //       const dishResults = await searchSpoonacular(searchQuery);
  //       const userResults = await searchUserContent(
  //         searchQuery,
  //         selectedCity?.id
  //       );

  //       const combinedResults = [
  //         ...formatPlacesResults(placesResults),
  //         ...formatDishResults(dishResults),
  //         ...formatUserResults(userResults),
  //       ];

  //       setSearchResults(combinedResults);
  //     } catch (error) {
  //       console.error("Search error:", error);
  //       setError("Failed to fetch search results");
  //     } finally {
  //       setIsSearching(false);
  //     }
  //   };

  //   performSearch();
  // }, [searchQuery, selectedCity]);