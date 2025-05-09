
import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import RegionFilter from '../components/RegionFilter';
import { destinations } from '../data/destinations';

const DestinationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Extract unique regions
  const regions = useMemo(() => {
    return Array.from(new Set(destinations.map(d => d.region)));
  }, []);

  // Filter destinations based on search query and region
  const filteredDestinations = useMemo(() => {
    let filtered = [...destinations];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      filtered = filtered.filter(destination => {
        const searchableText = `${destination.name.toLowerCase()} ${destination.nameKr.toLowerCase()} ${destination.location.toLowerCase()} ${destination.description.toLowerCase()} ${destination.tags.join(' ').toLowerCase()}`;
        return searchTerms.every(term => searchableText.includes(term));
      });
    }
    
    // Apply region filter
    if (selectedRegion) {
      filtered = filtered.filter(destination => destination.region === selectedRegion);
    }
    
    return filtered;
  }, [searchQuery, selectedRegion]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <SearchBar onSearch={handleSearch} />
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">대한민국 여행지</h1>
              <span className="text-gray-500">
                {filteredDestinations.length}개의 여행지
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <RegionFilter 
                    regions={regions} 
                    selectedRegion={selectedRegion}
                    onSelectRegion={setSelectedRegion}
                  />
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium mb-3">인기 태그</h3>
                    <div className="flex flex-wrap gap-2">
                      {['역사', '자연', '문화', '해변', '음식', '쇼핑', '도시', '산'].map(tag => (
                        <div key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-korea-beige">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                {filteredDestinations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map(destination => (
                      <div key={destination.id} className="animate-fade-in">
                        <DestinationCard destination={destination} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">검색 결과가 없습니다</h3>
                    <p className="text-gray-500">다른 검색어나 필터를 시도해보세요</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationsPage;
