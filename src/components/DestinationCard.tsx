
import React from 'react';
import { Destination } from '../types';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/destination/${destination.id}`}>
      <Card className="destination-card overflow-hidden h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{destination.rating.toFixed(1)}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold mb-1">{destination.nameKr}</h3>
              <p className="text-sm text-gray-600 mb-1">{destination.name}</p>
              <p className="text-sm text-gray-500">{destination.location}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {destination.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-korea-beige text-gray-700">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 bg-gray-50 text-sm text-gray-600">
          리뷰 {destination.reviewCount}개
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DestinationCard;
