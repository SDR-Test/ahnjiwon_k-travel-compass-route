
import React, { useEffect, useRef } from 'react';
import { Destination } from '../types';

interface MapProps {
  destinations: Destination[];
  optimizedRoute?: number[];
  height?: string;
}

const Map: React.FC<MapProps> = ({ destinations, optimizedRoute = [], height = "400px" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const polyline = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current && destinations.length > 0) {
      updateMap();
    }
  }, [destinations, optimizedRoute]);

  const initMap = () => {
    if (!mapRef.current) return;

    // Default center to South Korea
    const defaultCenter = { lat: 35.907757, lng: 127.766922 };

    mapInstance.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 7,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    if (destinations.length > 0) {
      updateMap();
    }
  };

  const updateMap = () => {
    if (!mapInstance.current) return;

    // Clear previous markers
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];

    // Clear previous polyline
    if (polyline.current) {
      polyline.current.setMap(null);
    }

    // Add markers for each destination
    const bounds = new google.maps.LatLngBounds();
    
    destinations.forEach((destination, index) => {
      const position = {
        lat: destination.coordinates.lat,
        lng: destination.coordinates.lng,
      };
      
      bounds.extend(position);
      
      const marker = new google.maps.Marker({
        position,
        map: mapInstance.current,
        title: destination.nameKr,
        label: {
          text: (index + 1).toString(),
          color: "white",
        },
        animation: google.maps.Animation.DROP,
      });
      
      markers.current.push(marker);
      
      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <strong style="font-size: 14px;">${destination.nameKr}</strong>
            <p style="font-size: 12px; margin: 4px 0 0;">${destination.name}</p>
            <p style="font-size: 12px; margin: 4px 0 0;">${destination.location}</p>
          </div>
        `,
      });
      
      marker.addListener("click", () => {
        infoWindow.open(mapInstance.current, marker);
      });
    });
    
    // Draw route line if optimizedRoute is provided
    if (optimizedRoute.length > 1) {
      const routeCoordinates: google.maps.LatLngLiteral[] = [];
      
      optimizedRoute.forEach(destId => {
        const destination = destinations.find(d => d.id === destId);
        if (destination) {
          routeCoordinates.push({
            lat: destination.coordinates.lat,
            lng: destination.coordinates.lng
          });
        }
      });
      
      polyline.current = new google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true,
        strokeColor: "#3B82F6",
        strokeOpacity: 0.8,
        strokeWeight: 3,
      });
      
      polyline.current.setMap(mapInstance.current);
    }
    
    // Fit the map to show all markers
    if (destinations.length > 0) {
      mapInstance.current.fitBounds(bounds);
      
      // If only one marker, zoom out a bit
      if (destinations.length === 1) {
        mapInstance.current.setZoom(10);
      }
    }
  };

  return <div ref={mapRef} style={{ height, width: '100%', borderRadius: '8px' }} />;
};

export default Map;
