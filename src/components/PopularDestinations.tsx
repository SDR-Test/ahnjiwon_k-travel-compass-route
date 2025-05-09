
import React from 'react';
import DestinationCard from './DestinationCard';
import { Destination } from '../types';

interface PopularDestinationsProps {
  destinations: Destination[];
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ destinations }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">인기 여행지</h2>
          <a href="/destinations" className="text-korea-blue hover:underline">더 보기 &rarr;</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {destinations.map(destination => (
            <div key={destination.id} className="animate-fade-in">
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
