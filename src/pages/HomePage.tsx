
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PopularDestinations from '../components/PopularDestinations';
import { destinations } from '../data/destinations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredDestinations(destinations);
      return;
    }
    
    const searchTerms = query.toLowerCase().split(' ');
    
    const results = destinations.filter(destination => {
      const searchableText = `${destination.name.toLowerCase()} ${destination.nameKr.toLowerCase()} ${destination.location.toLowerCase()} ${destination.description.toLowerCase()} ${destination.tags.join(' ').toLowerCase()}`;
      
      return searchTerms.every(term => searchableText.includes(term));
    });
    
    setFilteredDestinations(results);
  };

  const popularDestinations = [...destinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-8">
          <SearchBar onSearch={handleSearch} />
          
          <section className="mt-12 mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">대한민국의 아름다운 여행지를 탐색하세요</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
              가장 인기있는 여행지부터 숨겨진 보석 같은 장소까지, 최적의 여행 계획을 세워보세요
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-korea-beige rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-korea-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">여행지 검색</h3>
                <p className="text-gray-600">지역, 명소 또는 활동으로 원하는 여행지를 찾아보세요</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-korea-beige rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-korea-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">여행 계획</h3>
                <p className="text-gray-600">관심있는 장소를 저장하고 여행 일정을 만들어보세요</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-korea-beige rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-korea-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">최적 경로</h3>
                <p className="text-gray-600">선택한 장소들을 효율적으로 방문할 수 있는 최적의 경로를 확인하세요</p>
              </div>
            </div>
          </section>
          
          <PopularDestinations destinations={filteredDestinations.length > 0 ? filteredDestinations : popularDestinations} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
