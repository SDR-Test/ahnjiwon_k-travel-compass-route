
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full bg-gradient-to-r from-korea-blue to-korea-lightblue py-8 px-4 shadow-md rounded-md">
      <div className="container mx-auto text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">한국의 아름다운 여행지를 발견하세요</h1>
        <p className="text-lg text-white/90">지역, 명소 또는 활동을 검색하여 당신의 다음 모험을 찾아보세요</p>
      </div>

      <form 
        onSubmit={handleSearch} 
        className="mx-auto max-w-3xl flex flex-col md:flex-row gap-2 items-stretch"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="여행지, 명소, 또는 활동을 검색하세요..."
            className="pl-10 pr-4 py-6 rounded-md text-lg w-full bg-white"
          />
        </div>
        <Button type="submit" className="bg-korea-red hover:bg-korea-red/90 text-white px-8 py-6 rounded-md">
          검색
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
