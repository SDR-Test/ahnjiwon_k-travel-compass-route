
export type Destination = {
  id: number;
  name: string;
  nameKr: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
  region: string;
};

export type Review = {
  id: number;
  userId: number;
  userName: string;
  destinationId: number;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
};

export type TripDay = {
  day: number;
  destinations: number[];
};

export type Trip = {
  id: number;
  name: string;
  days: TripDay[];
};

export type RoutePoint = {
  order: number;
  destinationId: number;
};
