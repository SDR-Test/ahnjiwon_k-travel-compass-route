
import { Destination } from "../types";

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Gyeongbokgung Palace",
    nameKr: "경복궁",
    location: "Seoul",
    description: "Beautiful Joseon dynasty royal palace with stunning architecture and gardens.",
    image: "https://images.unsplash.com/photo-1548125745-49e019b568b9",
    rating: 4.7,
    reviewCount: 3256,
    coordinates: {
      lat: 37.5796,
      lng: 126.9770
    },
    tags: ["Historic", "Cultural", "Architecture"],
    region: "Seoul"
  },
  {
    id: 2,
    name: "Jeju Island",
    nameKr: "제주도",
    location: "Jeju Province",
    description: "Beautiful volcanic island with stunning beaches and unique natural landscapes.",
    image: "https://images.unsplash.com/photo-1580977251976-c0e7e8ab3458",
    rating: 4.9,
    reviewCount: 4752,
    coordinates: {
      lat: 33.3846,
      lng: 126.5535
    },
    tags: ["Nature", "Beach", "UNESCO"],
    region: "Jeju"
  },
  {
    id: 3,
    name: "Myeong-dong",
    nameKr: "명동",
    location: "Seoul",
    description: "Popular shopping area with countless fashion outlets, cosmetics stores and street food.",
    image: "https://images.unsplash.com/photo-1601562219658-3d608e7add51",
    rating: 4.5,
    reviewCount: 2879,
    coordinates: {
      lat: 37.5630,
      lng: 126.9838
    },
    tags: ["Shopping", "Food", "Urban"],
    region: "Seoul"
  },
  {
    id: 4,
    name: "Haeundae Beach",
    nameKr: "해운대 해변",
    location: "Busan",
    description: "Famous beach with beautiful coastline, festivals and nearby luxury hotels.",
    image: "https://images.unsplash.com/photo-1578338317471-bb0fcf68e3df",
    rating: 4.6,
    reviewCount: 3120,
    coordinates: {
      lat: 35.1588,
      lng: 129.1595
    },
    tags: ["Beach", "Urban", "Entertainment"],
    region: "Busan"
  },
  {
    id: 5,
    name: "Bukchon Hanok Village",
    nameKr: "북촌한옥마을",
    location: "Seoul",
    description: "Traditional Korean village with hundreds of hanok houses and cultural experiences.",
    image: "https://images.unsplash.com/photo-1595737361672-602db6c99329",
    rating: 4.5,
    reviewCount: 2245,
    coordinates: {
      lat: 37.5830,
      lng: 126.9857
    },
    tags: ["Historic", "Cultural", "Photography"],
    region: "Seoul"
  },
  {
    id: 6,
    name: "Namiseom Island",
    nameKr: "남이섬",
    location: "Chuncheon",
    description: "Small half-moon shaped island famous for its beautiful tree-lined roads and scenery.",
    image: "https://images.unsplash.com/photo-1611897948039-56c5878658e9",
    rating: 4.6,
    reviewCount: 1908,
    coordinates: {
      lat: 37.7904,
      lng: 127.5253
    },
    tags: ["Nature", "Peaceful", "Photography"],
    region: "Gangwon"
  },
  {
    id: 7,
    name: "Gamcheon Culture Village",
    nameKr: "감천문화마을",
    location: "Busan",
    description: "Colorful hillside community filled with vibrant houses, cafes and art installations.",
    image: "https://images.unsplash.com/photo-1617678151201-2999f0fecb32",
    rating: 4.4,
    reviewCount: 1622,
    coordinates: {
      lat: 35.0968,
      lng: 129.0114
    },
    tags: ["Cultural", "Art", "Photography"],
    region: "Busan"
  },
  {
    id: 8,
    name: "Seoraksan National Park",
    nameKr: "설악산 국립공원",
    location: "Sokcho",
    description: "Spectacular mountain scenery with hiking trails, waterfalls and Buddhist temples.",
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de",
    rating: 4.8,
    reviewCount: 2067,
    coordinates: {
      lat: 38.1195,
      lng: 128.4654
    },
    tags: ["Nature", "Hiking", "Mountains"],
    region: "Gangwon"
  }
];
