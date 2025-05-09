
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { destinations } from '../data/destinations';
import { Destination } from '../types';
import DestinationCard from '../components/DestinationCard';
import TripPlanner from '../components/TripPlanner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlannerPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = destinations.filter(destination => {
        const searchableText = `${destination.name.toLowerCase()} ${destination.nameKr.toLowerCase()} ${destination.location.toLowerCase()}`;
        return searchableText.includes(searchQuery.toLowerCase());
      });
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleAddDestination = (destination: Destination) => {
    if (selectedDestinations.find(d => d.id === destination.id)) {
      toast({
        title: "이미 추가된 여행지입니다",
        description: "다른 여행지를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedDestinations([...selectedDestinations, destination]);
    setSearchQuery('');
    setShowResults(false);
    
    toast({
      title: "여행지가 추가되었습니다",
      description: `${destination.nameKr}이(가) 여행 계획에 추가되었습니다.`,
    });
  };

  const handleRemoveDestination = (destinationId: number) => {
    setSelectedDestinations(selectedDestinations.filter(d => d.id !== destinationId));
    
    toast({
      title: "여행지가 제거되었습니다",
      description: "여행 계획에서 여행지가 제거되었습니다.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6">여행 계획</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">여행지 추가</h3>
                  
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="여행지 검색..."
                        className="pl-10 pr-4"
                      />
                    </div>
                  </form>
                  
                  {showResults && searchResults.length > 0 && (
                    <div className="mt-4 bg-white border rounded-md shadow-sm max-h-60 overflow-y-auto">
                      {searchResults.map(destination => (
                        <div 
                          key={destination.id} 
                          className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleAddDestination(destination)}
                        >
                          <div>
                            <p className="font-medium">{destination.nameKr}</p>
                            <p className="text-sm text-gray-600">{destination.location}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {showResults && searchQuery.trim() !== '' && searchResults.length === 0 && (
                    <div className="mt-4 text-center p-4 bg-white border rounded-md">
                      <p className="text-gray-500">검색 결과가 없습니다</p>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">선택한 여행지</h4>
                    <div className="space-y-3">
                      {selectedDestinations.length > 0 ? (
                        selectedDestinations.map(destination => (
                          <div 
                            key={destination.id}
                            className="flex justify-between items-center p-3 bg-white border rounded-md"
                          >
                            <div>
                              <p className="font-medium">{destination.nameKr}</p>
                              <p className="text-sm text-gray-600">{destination.location}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleRemoveDestination(destination.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          여행 계획에 여행지를 추가해주세요
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <TripPlanner selectedDestinations={selectedDestinations} />
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">추천 여행지</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {destinations
                .sort(() => 0.5 - Math.random()) // Shuffle array
                .slice(0, 4)
                .map(destination => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlannerPage;
