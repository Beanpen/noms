"use client";

import React, { useState } from "react";
import {
  MapPin,
  Camera,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Book,
  Bookmark,
  Award,
  Settings,
  Grid,
  List,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const UserProfilePage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("stories");

  const userData = {
    name: "Cassie Zhang",
    handle: "@cassiezhang",
    bio: "Food explorer 🌎 | Photography enthusiast 📸 | Always hungry for new experiences",
    location: "San Francisco, CA",
    joinedDate: "Joined September 2023",
    avatar: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/1200/300",
    stats: {
      followers: 1240,
      following: 891,
      stories: 156,
    },
    achievements: [
      {
        icon: "🍜",
        title: "Ramen Master",
        level: 3,
        progress: 80,
        description: "Reviewed 50+ ramen shops",
      },
      {
        icon: "🥘",
        title: "Street Food Explorer",
        level: 2,
        progress: 60,
        description: "Discovered 30+ street food spots",
      },
      {
        icon: "🌏",
        title: "Globe Trotter",
        level: 4,
        progress: 95,
        description: "Shared from 10+ countries",
      },
    ],
    stories: [
      {
        title: "Amazing Ramen Experience",
        location: "Tokyo, Japan",
        date: "2 days ago",
        image: "/api/placeholder/400/300",
        likes: 234,
        comments: 45,
        tags: ["Japanese", "Ramen", "Tokyo"],
      },
      {
        title: "Hidden Taco Spot",
        location: "Mexico City, Mexico",
        date: "1 week ago",
        image: "/api/placeholder/400/300",
        likes: 189,
        comments: 32,
        tags: ["Mexican", "Street Food", "Tacos"],
      },
    ],
    savedPlaces: [
      {
        name: "Sushi Master",
        type: "Restaurant",
        location: "Tokyo, Japan",
        image: "/api/placeholder/400/300",
      },
      {
        name: "Street Food Market",
        type: "Market",
        location: "Bangkok, Thailand",
        image: "/api/placeholder/400/300",
      },
    ],
    medals: [
      {
        title: "Food Critic Excellence",
        description: "Write 50 detailed restaurant reviews",
        progress: 35,
        total: 50,
        icon: "🏅",
        status: "in-progress",
      },
      {
        title: "Photography Master",
        description:
          "Share 100 food photos with proper lighting and composition",
        progress: 82,
        total: 100,
        icon: "📸",
        status: "in-progress",
      },
      {
        title: "Cultural Ambassador",
        description: "Document traditional dishes from 20 different cultures",
        progress: 20,
        total: 20,
        icon: "🌏",
        status: "completed",
      },
      {
        title: "Recipe Creator",
        description: "Share 30 original recipe adaptations",
        progress: 12,
        total: 30,
        icon: "👨‍🍳",
        status: "in-progress",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-80">
        <img
          src={userData.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full text-white">
          <Camera className="h-5 w-5" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row gap-6 -mt-20">
          {/* Avatar and Basic Info */}
          {/* TODO: why is the profile picture so small */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Avatar className="w-56 h-56 border-4 border-white shadow-lg overflow-hidden">
                <AvatarImage
                  src={userData.avatar}
                  alt={userData.name}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex-grow pt-4 md:pt-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-gray-500">{userData.handle}</p>
                <div className="flex items-center gap-4 text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {userData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {userData.joinedDate}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Button className="gap-2">
                  <Users className="h-4 w-4" />
                  Follow
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="mt-4 text-gray-600">{userData.bio}</p>

            {/* Stats */}
            <div className="flex gap-6 mt-6">
              <div>
                <div className="text-2xl font-bold">
                  {userData.stats.followers}
                </div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {userData.stats.following}
                </div>
                <div className="text-gray-600">Following</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {userData.stats.stories}
                </div>
                <div className="text-gray-600">Stories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-gray-500">
                            Level {achievement.level}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {achievement.progress}%
                        </Badge>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      <p className="text-gray-600 text-sm mt-2">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {[
                { id: "stories", icon: Book, label: "Stories" },
                { id: "saved", icon: Bookmark, label: "Saved Places" },
                { id: "medals", icon: Award, label: "Digital Medals" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-1 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-b-2 border-gray-900 text-gray-900"
                      : "text-gray-500"
                  } font-medium transition-colors hover:text-gray-700`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Stories Tab Content */}
          {activeTab === "stories" && (
            <div className="mt-6">
              <div className="flex justify-end gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-gray-100" : ""}
                >
                  <Grid className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-gray-100" : ""}
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-3 gap-6"
                    : "grid-cols-1 gap-4"
                }`}
              >
                {userData.stories.map((story, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className={viewMode === "grid" ? "block" : "flex"}>
                      <img
                        src={story.image}
                        alt={story.title}
                        className={
                          viewMode === "grid"
                            ? "w-full h-48 object-cover"
                            : "w-48 h-48 object-cover"
                        }
                      />
                      <CardContent className="p-4 flex-1">
                        <h3 className="font-semibold text-lg">{story.title}</h3>
                        <div className="flex flex-wrap gap-2 my-2">
                          {story.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-600 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {story.location}
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          {story.date}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <span className="text-gray-600 text-sm flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {story.likes}
                          </span>
                          <span className="text-gray-600 text-sm flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {story.comments}
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Saved Places Tab Content */}
          {activeTab === "saved" && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userData.savedPlaces.map((place, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{place.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-600 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {place.location}
                        </p>
                        <Badge>{place.type}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Digital Medals Tab Content */}
          {activeTab === "medals" && (
            <div className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Digital Medals
                </h3>
                <p className="text-gray-600">
                  Earn medals by contributing to the community and sharing your
                  culinary adventures!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userData.medals.map((medal, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{medal.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {medal.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {medal.description}
                              </p>
                            </div>
                            <Badge
                              variant={
                                medal.status === "completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {medal.status === "completed"
                                ? "Completed"
                                : "In Progress"}
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>
                                {medal.progress}/{medal.total}
                              </span>
                            </div>
                            <Progress
                              value={(medal.progress / medal.total) * 100}
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
