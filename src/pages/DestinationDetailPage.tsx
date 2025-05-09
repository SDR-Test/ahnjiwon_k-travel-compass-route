
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { reviews } from '../data/reviews';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reviews from '../components/Reviews';
import ReviewForm from '../components/ReviewForm';
import Map from '../components/Map';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const DestinationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState(destinations.find(d => d.id === Number(id)));
  const [destinationReviews, setDestinationReviews] = useState(reviews.filter(r => r.destinationId === Number(id)));
  const [inPlanner, setInPlanner] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">여행지를 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-6">요청하신 여행지 정보를 찾을 수 없습니다.</p>
            <Link to="/destinations">
              <Button>모든 여행지 보기</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToPlanner = () => {
    setInPlanner(!inPlanner);
    toast({
      title: inPlanner ? "여행 계획에서 제거되었습니다" : "여행 계획에 추가되었습니다",
      description: inPlanner ? 
        "여행 계획에서 해당 여행지가 제거되었습니다." : 
        "여행 계획 페이지에서 전체 일정을 확인하세요.",
    });
  };

  const handleReviewSubmit = (reviewData: { destinationId: number; rating: number; comment: string }) => {
    const newReview = {
      id: Math.max(...destinationReviews.map(r => r.id), 0) + 1,
      userId: 999,
      userName: "방문자",
      destinationId: reviewData.destinationId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    
    setDestinationReviews([newReview, ...destinationReviews]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-korea-blue to-korea-lightblue text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.nameKr}</h1>
                <p className="text-xl font-light">{destination.name}</p>
                <div className="flex items-center mt-2">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{destination.location}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-bold">{destination.rating.toFixed(1)}</span>
                    <span className="text-white/80 ml-1">({destination.reviewCount} 리뷰)</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddToPlanner}
                  className={`flex items-center ${inPlanner ? 'bg-white text-korea-blue' : 'bg-korea-red hover:bg-korea-red/90'}`}
                >
                  {inPlanner ? (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      여행 계획에 추가됨
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      여행 계획에 추가
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-80 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-korea-beige text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">소개</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {destination.description}
                  </p>
                  
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">위치</h2>
                    <Map 
                      destinations={[destination]} 
                      height="400px"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">리뷰</h2>
                <ReviewForm 
                  destinationId={destination.id} 
                  onReviewSubmit={handleReviewSubmit} 
                />
                
                <div className="mt-8">
                  {destinationReviews.length > 0 ? (
                    <Reviews reviews={destinationReviews} />
                  ) : (
                    <p className="text-center py-8 text-gray-500">
                      아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-20">
                <h3 className="text-xl font-bold mb-4">이 지역의 다른 여행지</h3>
                
                <div className="space-y-4">
                  {destinations
                    .filter(d => d.region === destination.region && d.id !== destination.id)
                    .slice(0, 3)
                    .map(d => (
                      <Link key={d.id} to={`/destination/${d.id}`} className="block">
                        <div className="flex items-start space-x-3 group">
                          <img 
                            src={d.image} 
                            alt={d.name} 
                            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                          />
                          <div>
                            <h4 className="font-medium group-hover:text-korea-blue transition-colors">{d.nameKr}</h4>
                            <p className="text-sm text-gray-500">{d.location}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm ml-1">{d.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Link to="/destinations" className="text-korea-blue hover:underline">
                    모든 여행지 보기 &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DestinationDetailPage;
