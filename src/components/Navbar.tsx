
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-korea-blue flex items-center justify-center">
              <span className="font-bold text-white">K</span>
            </div>
            <span className="text-xl font-bold text-korea-navy">트래블<span className="text-korea-red">나침반</span></span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-korea-blue font-medium">홈</Link>
            <Link to="/destinations" className="text-gray-700 hover:text-korea-blue font-medium">여행지</Link>
            <Link to="/planner" className="text-gray-700 hover:text-korea-blue font-medium">여행 계획</Link>
            <Link to="/reviews" className="text-gray-700 hover:text-korea-blue font-medium">리뷰</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline">로그인</Button>
          </div>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                ></path>
              </svg>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-korea-blue font-medium px-4 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>홈</Link>
              <Link to="/destinations" className="text-gray-700 hover:text-korea-blue font-medium px-4 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>여행지</Link>
              <Link to="/planner" className="text-gray-700 hover:text-korea-blue font-medium px-4 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>여행 계획</Link>
              <Link to="/reviews" className="text-gray-700 hover:text-korea-blue font-medium px-4 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>리뷰</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
