"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Share2,
  ChevronDown,
  ChevronUp,
  Map,
  Star,
  Heart,
  Navigation,
  Bookmark,
  Building2,
  Utensils,
  MessageSquare,
  Trophy,
  User,
  Globe,
  Clock3,
  DollarSign,
  Sparkles,
  Award,
  LucideIcon,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SearchResult, RestaurantResult, DishResult, PostResult, ExpertResult } from "@/lib/types";

// Types
type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
};

// Wrap the main component in Suspense
function SearchResults() {
  // Router and params
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("top");
  const [expandedResults, setExpandedResults] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  // Additional states for filters
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [distanceFilter, setDistanceFilter] = useState<number | null>(null);
  const [openNowFilter, setOpenNowFilter] = useState(false);
  const [sortBy] = useState<"relevance" | "rating" | "distance" | "price">(
    "relevance"
  );

  // Move searchResults into useMemo to prevent unnecessary re-renders
  const searchResults: SearchResult[] = useMemo(
      () => [
        // Example search results data
        {
          id: "1",
          type: "restaurant",
          title: "Sushi Master",
          description:
            "Traditional Edomae sushi experience with fresh seasonal fish",
          image: "/api/placeholder/400/300",
          location: "Ginza, Tokyo",
          priceRange: "$$$$",
          cuisine: "Japanese",
          rating: 4.9,
          reviews: 1250,
          isVerified: true,
          tags: ["Sushi", "Fine Dining", "Omakase"],
          openNow: true,
          distance: "0.8 km",
          popularDishes: [
            { name: "Omakase Course", price: "$150", rating: 4.9 },
            { name: "Seasonal Nigiri Set", price: "$85", rating: 4.8 },
          ],
        } as RestaurantResult,
        {
          id: "2",
          type: "dish",
          title: "Tonkotsu Ramen",
          description: "Rich and creamy pork bone broth ramen",
          image: "/api/placeholder/400/300",
          cuisine: "Japanese",
          priceRange: "$$",
          rating: 4.8,
          tags: ["Ramen", "Popular", "Comfort Food"],
          ingredients: ["Pork bone broth", "Chashu pork", "Ajitsuke egg"],
          dietaryInfo: ["Contains pork", "Non-vegetarian"],
          whereToFind: [
            {
              name: "Ichiran Ramen",
              location: "Shibuya",
              price: "¥980",
              rating: 4.7,
              distance: "0.3 km",
            },
          ],
        } as DishResult,
        {
          id: "3",
          type: "post",
          title: "My Tokyo Food Diary",
          description: "A collection of my favorite food spots in Tokyo",
          image: "/api/placeholder/400/300",
          author: {
            name: "John Doe",
            image: "/api/placeholder/100/100",
            isVerified: true,
          },
          postedAt: "3 days ago",
          likes: 150,
          comments: 20,
        } as PostResult,
        {
          id: "4",
          type: "expert",
          title: "Sushi Expert",
          description: "Local sushi chef with 20 years of experience",
          image: "/api/placeholder/400/300",
          expertise: ["Sushi", "Japanese Cuisine", "Omakase"],
          languages: ["Japanese", "English"],
          recentActivity: [
            { type: "review", title: "Best Sushi in Tokyo", date: "2 days ago" },
            { type: "guide", title: "Sushi Etiquette 101", date: "1 week ago" },
          ],
          followers: 500,
          recommendations: 50,
          location: "Tokyo, Japan",
        } as ExpertResult,
      ],
      []
    ); // Empty dependency array since this data is static

  // Toggle expanded state
  const toggleExpanded = (id: string) => {
    setExpandedResults(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("q", searchQuery);
    params.set("category", activeCategory);
    router.push(`/search?${params.toString()}`);
  };

  // Apply filters and sort
  useEffect(() => {
    let results = [...searchResults]; // Assuming searchResults is your base data

    // Apply category filter
    if (activeCategory !== "top") {
      results = results.filter((result) => {
        switch (activeCategory) {
          case "restaurants":
            return result.type === "restaurant";
          case "dishes":
            return result.type === "dish";
          case "posts":
            return result.type === "post";
          case "experts":
            return result.type === "expert";
          default:
            return true;
        }
      });
    }

    // Apply price filter
    if (priceFilter.length > 0) {
      results = results.filter(
        (result) =>
          "priceRange" in result &&
          result.priceRange &&
          priceFilter.includes(result.priceRange)
      );
    }

    // Apply rating filter
    if (ratingFilter) {
      results = results.filter(
        (result) => result.rating && result.rating >= ratingFilter
      );
    }

    // Apply distance filter
    if (distanceFilter && results.some((r) => "distance" in r)) {
      results = results.filter((result) => {
        if ("distance" in result && result.distance) {
          const distanceNum =
            typeof result.distance === "string"
              ? parseFloat(result.distance.replace("km", ""))
              : 0;
          return distanceNum <= distanceFilter;
        }
        return false;
      });
    }

    // Apply open now filter
    if (openNowFilter) {
      results = results.filter(
        (result) => result.type === "restaurant" && result.openNow
      );
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "distance":
          if ("distance" in a && "distance" in b) {
            const distA =
              typeof a.distance === "string"
                ? parseFloat(a.distance.replace("km", ""))
                : 0;
            const distB =
              typeof b.distance === "string"
                ? parseFloat(b.distance.replace("km", ""))
                : 0;
            return distA - distB;
          }
          return 0;
        case "price":
          if ("priceRange" in a && "priceRange" in b) {
            return (a.priceRange?.length || 0) - (b.priceRange?.length || 0);
          }
          return 0;
        default:
          return 0;
      }
    });

    setFilteredResults(results);
  }, [
    activeCategory,
    priceFilter,
    ratingFilter,
    distanceFilter,
    openNowFilter,
    sortBy,
    searchResults,
  ]);

  // Initialize from URL params - use null check for searchParams
  useEffect(() => {
    if (searchParams) {
      const query = searchParams.get('q') || '';
      const category = searchParams.get('category') || 'top';
      
      setSearchQuery(query);
      setActiveCategory(category);
    }
  }, [searchParams]);

  // Categories definition
  const categories: Category[] = [
    {
      id: "top",
      // label: "Top Results",
      label: "Top",
      icon: Trophy,
      description: "Most relevant results across all categories",
    },
    {
      id: "restaurants",
      // label: "Restaurants & Places",
      label: "Places",
      icon: Building2,
      description: "Find dining spots and food locations",
    },
    {
      id: "dishes",
      // label: "Dishes & Cuisines",
      label: "Food",
      icon: Utensils,
      description: "Explore specific foods and traditional cuisines",
    },
    {
      id: "experts",
      // label: "Local Experts & Tips",
      label: "Locals",
      icon: User,
      description: "Advice from food experts and locals",
    },
    {
      id: "posts",
      // label: "Community Posts",
      label: "Community",
      icon: MessageSquare,
      description: "Food stories and experiences from the community",
    },
  ];

  // Render the filters section
  const renderFilters = () => (
    <div className="sticky top-0 bg-white z-10 space-y-4 pb-4 border-b">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for restaurants, dishes, or local tips..."
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue={activeCategory} className="w-full overflow-x-auto">
        <TabsList className="w-full justify-start flex-nowrap">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="gap-2 flex-shrink-0"
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Filter Actions */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Price
              {priceFilter.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {priceFilter.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setPriceFilter(["$"])}>
              $ (Under $10)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriceFilter(["$$"])}>
              $$ ($10-30)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriceFilter(["$$$"])}>
              $$$ ($31-60)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriceFilter(["$$$$"])}>
              $$$$ (Above $60)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Star className="h-4 w-4" />
              Rating
              {ratingFilter && (
                <Badge variant="secondary" className="ml-2">
                  {ratingFilter}+
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setRatingFilter(4.5)}>
              4.5+ Rating
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRatingFilter(4.0)}>
              4.0+ Rating
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRatingFilter(3.5)}>
              3.5+ Rating
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Navigation className="h-4 w-4" />
              Distance
              {distanceFilter && (
                <Badge variant="secondary" className="ml-2">
                  {distanceFilter}km
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDistanceFilter(1)}>
              Within 1 km
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDistanceFilter(3)}>
              Within 3 km
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDistanceFilter(5)}>
              Within 5 km
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setOpenNowFilter(!openNowFilter)}
        >
          <Clock3 className="h-4 w-4" />
          Open Now
          {openNowFilter && (
            <Badge variant="secondary" className="ml-2">
              ✓
            </Badge>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 ml-auto"
          onClick={() =>
            setViewMode((prev) => (prev === "list" ? "grid" : "list"))
          }
        >
          <Map className="h-4 w-4" />
          View Map
        </Button>
      </div>
    </div>
  );

  // Render a single search result
  const renderSearchResult = (result: SearchResult) => {
    const isExpanded = expandedResults.includes(result.id);

    return (
      <Card key={result.id} className="overflow-hidden">
        <div className={`flex ${viewMode === "grid" ? "flex-col" : ""}`}>
          {result.image && (
            <div
              className={viewMode === "grid" ? "w-full" : "w-48 flex-shrink-0"}
            >
              <img
                src={result.image}
                alt={result.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          <CardContent className="flex-1 p-4">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{result.title}</h3>
                  {result.isVerified && (
                    <Badge variant="secondary">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{result.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tags */}
            {result.tags && result.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {result.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Metrics Section */}
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              {"location" in result && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {result.location}
                </div>
              )}
              {result.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {result.rating}
                </div>
              )}
              {"reviews" in result && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {result.reviews} reviews
                </div>
              )}
              {"distance" in result && (
                <div className="flex items-center gap-1">
                  <Navigation className="h-4 w-4" />
                  {result.distance}
                </div>
              )}
            </div>

            {/* Expanded Content Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(result.id)}
              className="w-full justify-between mt-4"
            >
              {isExpanded ? "Show Less" : "Show More"}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {/* Expanded Content */}
            {isExpanded && renderExpandedContent(result)}
          </CardContent>
        </div>
      </Card>
    );
  };

  // Render expanded content based on result type
  const renderExpandedContent = (result: SearchResult) => {
    switch (result.type) {
      case "restaurant":
        return (
          <div className="mt-4 space-y-4">
            {/* Popular Dishes */}
            {result.popularDishes && (
              <div>
                <h4 className="font-medium mb-2">Popular Dishes</h4>
                <div className="grid grid-cols-2 gap-2">
                  {result.popularDishes.map((dish) => (
                    <div key={dish.name} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{dish.name}</div>
                      <div className="flex items-center justify-between mt-1 text-sm text-gray-600">
                        <span>{dish.price}</span>
                        <span>★ {dish.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features & Hours */}
            <div className="grid grid-cols-2 gap-4">
              {result.features && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {result.hours && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Hours</h4>
                  <div className="text-sm text-gray-600">{result.hours}</div>
                </div>
              )}
            </div>
          </div>
        );

      case "dish":
        return (
          <div className="mt-4 space-y-4">
            {/* Dish Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  {result.cuisine && <div>Cuisine: {result.cuisine}</div>}
                  {result.priceRange && <div>Price: {result.priceRange}</div>}
                  {result.calories && <div>Calories: {result.calories}</div>}
                </div>
              </div>
              {result.dietaryInfo && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Dietary Information</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.dietaryInfo.map((info) => (
                      <Badge key={info} variant="outline">
                        {info}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Where to Find */}
            {result.whereToFind && (
              <div>
                <h4 className="font-medium mb-2">Where to Find</h4>
                <div className="space-y-2">
                  {result.whereToFind.map((place) => (
                    <div
                      key={place.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{place.name}</div>
                        <div className="text-sm text-gray-600">
                          {place.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>{place.price}</span>
                        <span>★ {place.rating}</span>
                        <span>{place.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "post":
        return (
          <div className="mt-4 space-y-4">
            {/* Author Info */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={result.author.image} />
                  <AvatarFallback>{result.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {result.author.name}
                    {result.author.isVerified && (
                      <Badge variant="secondary" className="h-5">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{result.postedAt}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>

            {/* Engagement Stats */}
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                {result.likes} likes
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                {result.comments} comments
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Location Tag if exists */}
            {result.locationTag && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{result.locationTag}</span>
              </div>
            )}
          </div>
        );

      case "expert":
        return (
          <div className="mt-4 space-y-4">
            {/* Expertise Areas */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {result.expertise.map((area) => (
                  <Badge key={area} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages if available */}
            {result.languages && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {result.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      <Globe className="h-3 w-3 mr-1" />
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            {result.recentActivity && (
              <div>
                <h4 className="font-medium mb-2">Recent Activity</h4>
                <div className="space-y-2">
                  {result.recentActivity.map((activity) => (
                    <div
                      key={activity.title}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {activity.type === "review" && (
                          <MessageSquare className="h-4 w-4" />
                        )}
                        {activity.type === "guide" && (
                          <Book className="h-4 w-4" />
                        )}
                        {activity.type === "recommendation" && (
                          <Award className="h-4 w-4" />
                        )}
                        <span className="font-medium">{activity.title}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {activity.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact/Follow Actions */}
            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <User className="h-4 w-4" />
                Follow
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Main component return
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Filters Section */}
        {renderFilters()}

        {/* Results Section */}
        <div className="mt-6">
          {/* Results Count & Sort */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              {filteredResults.length} results found
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort by: Relevance
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Relevance</DropdownMenuItem>
                <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Distance: Near to Far</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results Grid */}
          <div
            className={`grid gap-4 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredResults.map((result) => renderSearchResult(result))}
          </div>

          {/* Load More Button */}
          {filteredResults.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" className="gap-2">
                Load More
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Empty State */}
          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you&apos;re
                looking for
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrap the export in Suspense
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}