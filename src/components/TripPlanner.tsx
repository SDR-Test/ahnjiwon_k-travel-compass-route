
import React, { useState, useEffect } from 'react';
import { Destination, RoutePoint } from '../types';
import { calculateOptimalRoute, distributeDestinationsIntoDays } from '../utils/routeCalculator';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Calendar, ArrowRight } from 'lucide-react';
import Map from './Map';

interface TripPlannerProps {
  selectedDestinations: Destination[];
}

const TripPlanner: React.FC<TripPlannerProps> = ({ selectedDestinations }) => {
  const [days, setDays] = useState(1);
  const [optimizedRoute, setOptimizedRoute] = useState<number[]>([]);
  const [dayPlans, setDayPlans] = useState<{ day: number; destinations: number[] }[]>([]);
  
  useEffect(() => {
    if (selectedDestinations.length > 0) {
      const route = calculateOptimalRoute(selectedDestinations);
      setOptimizedRoute(route);
      
      const plans = distributeDestinationsIntoDays(route, selectedDestinations, days);
      setDayPlans(plans);
    } else {
      setOptimizedRoute([]);
      setDayPlans([]);
    }
  }, [selectedDestinations, days]);
  
  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
  };
  
  const getDestinationById = (id: number): Destination | undefined => {
    return selectedDestinations.find(d => d.id === id);
  };

  // Convert route to actual destination objects for the map component
  const routeForMap = optimizedRoute.map(id => {
    const destination = getDestinationById(id);
    if (!destination) return null;
    return destination;
  }).filter(Boolean) as Destination[];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Navigation className="mr-2 text-korea-blue" />
        여행 경로 계획
      </h3>
      
      {selectedDestinations.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <MapPin className="mx-auto h-12 w-12 mb-4 text-gray-400" />
          <p>여행할 장소를 선택해주세요</p>
          <p className="text-sm mt-2">관심있는 여행지를 검색하고 추가하세요</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">여행 일수:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(num => (
                <Button 
                  key={num}
                  variant={days === num ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDaysChange(num)}
                  className={days === num ? "bg-korea-blue" : ""}
                >
                  {num}일
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-3 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-korea-blue" />
              일별 여행 계획
            </h4>
            
            <Tabs defaultValue="route" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="route">최적 경로</TabsTrigger>
                <TabsTrigger value="days">일정별</TabsTrigger>
              </TabsList>
              
              <TabsContent value="route" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">최적의 여행 경로</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {optimizedRoute.map((destinationId, index) => {
                        const destination = getDestinationById(destinationId);
                        if (!destination) return null;
                        
                        return (
                          <div key={index} className="flex items-center">
                            <Badge className="mr-2 bg-korea-blue">{index + 1}</Badge>
                            <div>
                              <p className="font-medium">{destination.nameKr}</p>
                              <p className="text-sm text-gray-500">{destination.location}</p>
                            </div>
                            {index < optimizedRoute.length - 1 && (
                              <ArrowRight className="mx-2 text-gray-400" size={16} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="days" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">일별 일정</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {dayPlans.map((day) => (
                        <div key={day.day} className="border-t pt-4 first:border-t-0 first:pt-0">
                          <h5 className="font-bold mb-2">Day {day.day}</h5>
                          <div className="space-y-2">
                            {day.destinations.map((destId, index) => {
                              const destination = getDestinationById(destId);
                              if (!destination) return null;
                              
                              return (
                                <div key={index} className="flex items-start py-1">
                                  <Badge className="mr-2 bg-korea-blue">{index + 1}</Badge>
                                  <div>
                                    <p className="font-medium">{destination.nameKr}</p>
                                    <p className="text-sm text-gray-500">{destination.location}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">여행 지도</h4>
            <Map destinations={routeForMap} optimizedRoute={optimizedRoute} />
          </div>
        </>
      )}
    </div>
  );
};

export default TripPlanner;
