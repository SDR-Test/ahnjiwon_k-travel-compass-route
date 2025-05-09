
import React from 'react';
import { Review as ReviewType, Destination } from '../types';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ReviewsProps {
  reviews: ReviewType[];
  destinations?: Destination[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, destinations }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  const getDestinationName = (id: number) => {
    if (!destinations) return null;
    const destination = destinations.find(d => d.id === id);
    return destination ? destination.nameKr : null;
  };

  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <Card key={review.id} className="bg-white hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback className="bg-korea-lightblue text-korea-blue">
                  {review.userName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{review.userName}</p>
                    {destinations && (
                      <p className="text-sm text-gray-500">{getDestinationName(review.destinationId)}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(review.date), { addSuffix: true, locale: ko })}
                  </span>
                </div>
                <div className="flex mt-2">
                  {renderStars(review.rating)}
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <button className="flex items-center hover:text-korea-blue">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    도움이 됐어요 ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Reviews;
