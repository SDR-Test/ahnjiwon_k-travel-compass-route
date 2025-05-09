
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';
import ReviewForm from '../components/ReviewForm';
import { reviews } from '../data/reviews';
import { destinations } from '../data/destinations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReviewsPage = () => {
  const [allReviews, setAllReviews] = useState(reviews);

  const handleReviewSubmit = (reviewData: { destinationId: number; rating: number; comment: string }) => {
    const newReview = {
      id: Math.max(...allReviews.map(r => r.id), 0) + 1,
      userId: 999,
      userName: "방문자",
      destinationId: reviewData.destinationId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    
    setAllReviews([newReview, ...allReviews]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">여행 리뷰</h1>
          <p className="text-lg text-gray-600 mb-6">다른 여행자들의 경험을 읽고 공유하세요</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ReviewForm 
                destinations={destinations} 
                onReviewSubmit={handleReviewSubmit} 
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Tabs defaultValue="recent">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">리뷰 목록</h2>
                    <TabsList>
                      <TabsTrigger value="recent">최신순</TabsTrigger>
                      <TabsTrigger value="rating">평점순</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="recent">
                    <Reviews 
                      reviews={[...allReviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                      destinations={destinations}
                    />
                  </TabsContent>
                  
                  <TabsContent value="rating">
                    <Reviews 
                      reviews={[...allReviews].sort((a, b) => b.rating - a.rating)}
                      destinations={destinations}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReviewsPage;
