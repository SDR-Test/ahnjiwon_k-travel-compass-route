
import React, { useState } from 'react';
import { Destination } from '../types';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewFormProps {
  destinationId?: number;
  destinations?: Destination[];
  onReviewSubmit: (review: {
    destinationId: number;
    rating: number;
    comment: string;
  }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  destinationId,
  destinations,
  onReviewSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | undefined>(
    destinationId
  );
  const { toast } = useToast();

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDestinationId) {
      toast({
        title: "여행지를 선택해주세요",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "별점을 선택해주세요",
        variant: "destructive",
      });
      return;
    }

    if (comment.trim() === '') {
      toast({
        title: "리뷰 내용을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    onReviewSubmit({
      destinationId: selectedDestinationId,
      rating,
      comment,
    });

    // Reset form
    setRating(0);
    setComment('');
    if (!destinationId) {
      setSelectedDestinationId(undefined);
    }

    toast({
      title: "리뷰가 등록되었습니다",
      description: "소중한 리뷰 감사합니다!",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">리뷰 작성하기</h3>
      
      <form onSubmit={handleSubmit}>
        {!destinationId && destinations && (
          <div className="mb-4">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              여행지 선택
            </label>
            <select
              id="destination"
              value={selectedDestinationId || ''}
              onChange={(e) => setSelectedDestinationId(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-korea-blue focus:border-transparent"
              required
            >
              <option value="">여행지를 선택해주세요</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.nameKr} ({dest.location})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            별점
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                size={24}
                className={`cursor-pointer ${
                  value <= (hoverRating || rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                } mr-1`}
                onClick={() => handleStarClick(value)}
                onMouseEnter={() => handleStarHover(value)}
                onMouseLeave={handleStarLeave}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {rating > 0 && `${rating}/5`}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            리뷰 내용
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="여행 경험에 대해 자세히 알려주세요..."
            className="w-full min-h-[120px]"
            required
          />
        </div>

        <Button type="submit" className="bg-korea-blue hover:bg-korea-blue/90">
          리뷰 등록하기
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
