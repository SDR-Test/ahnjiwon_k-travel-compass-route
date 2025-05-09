
import { Destination } from "../types";

// Simple implementation of nearest neighbor algorithm for route optimization
export const calculateOptimalRoute = (
  destinations: Destination[],
  startDestinationId?: number
): number[] => {
  if (destinations.length <= 1) {
    return destinations.map(d => d.id);
  }
  
  // Create a copy of destinations to work with
  const availableDestinations = [...destinations];
  const route: number[] = [];
  
  // Start with the first destination if no start is specified
  let currentDestination: Destination;
  
  if (startDestinationId) {
    const startIndex = availableDestinations.findIndex(d => d.id === startDestinationId);
    if (startIndex >= 0) {
      currentDestination = availableDestinations[startIndex];
      availableDestinations.splice(startIndex, 1);
      route.push(currentDestination.id);
    } else {
      currentDestination = availableDestinations[0];
      availableDestinations.splice(0, 1);
      route.push(currentDestination.id);
    }
  } else {
    currentDestination = availableDestinations[0];
    availableDestinations.splice(0, 1);
    route.push(currentDestination.id);
  }
  
  // Find nearest neighbor until all destinations are visited
  while (availableDestinations.length > 0) {
    let minDistance = Number.MAX_VALUE;
    let nextIndex = -1;
    
    for (let i = 0; i < availableDestinations.length; i++) {
      const distance = calculateDistance(
        currentDestination.coordinates,
        availableDestinations[i].coordinates
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nextIndex = i;
      }
    }
    
    currentDestination = availableDestinations[nextIndex];
    availableDestinations.splice(nextIndex, 1);
    route.push(currentDestination.id);
  }
  
  return route;
};

// Helper function to calculate distance between two points (haversine formula)
export const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(point2.lat - point1.lat);
  const dLng = deg2rad(point2.lng - point1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

// Split destinations into days based on proximity
export const distributeDestinationsIntoDays = (
  destinationIds: number[],
  destinations: Destination[],
  numDays: number
): { day: number; destinations: number[] }[] => {
  if (numDays <= 0 || destinationIds.length === 0) {
    return [];
  }

  const result: { day: number; destinations: number[] }[] = [];
  const destinationsPerDay = Math.ceil(destinationIds.length / numDays);
  
  for (let day = 1; day <= numDays; day++) {
    const startIdx = (day - 1) * destinationsPerDay;
    const endIdx = Math.min(startIdx + destinationsPerDay, destinationIds.length);
    
    if (startIdx < destinationIds.length) {
      result.push({
        day,
        destinations: destinationIds.slice(startIdx, endIdx)
      });
    }
  }
  
  return result;
};
