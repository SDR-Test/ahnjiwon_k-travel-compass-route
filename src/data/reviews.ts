
import { Review } from "../types";

export const reviews: Review[] = [
  {
    id: 1,
    userId: 101,
    userName: "홍길동",
    destinationId: 1,
    rating: 5,
    comment: "경복궁은 정말 아름답습니다. 특히 수문장 교대식을 꼭 보세요!",
    date: "2024-04-15",
    helpful: 24
  },
  {
    id: 2,
    userId: 102,
    userName: "김민지",
    destinationId: 1,
    rating: 4,
    comment: "역사적으로 중요한 장소입니다. 한복을 입고 방문하면 더 특별한 경험이 됩니다.",
    date: "2024-03-22",
    helpful: 18
  },
  {
    id: 3,
    userId: 103,
    userName: "이준호",
    destinationId: 2,
    rating: 5,
    comment: "제주도는 너무 아름답습니다! 성산일출봉, 우도, 한라산을 모두 가보세요.",
    date: "2024-04-10",
    helpful: 32
  },
  {
    id: 4,
    userId: 104,
    userName: "박서연",
    destinationId: 3,
    rating: 4,
    comment: "쇼핑하기 좋고 먹을 것도 많지만 주말에는 너무 붐빕니다.",
    date: "2024-02-28",
    helpful: 15
  },
  {
    id: 5,
    userId: 105,
    userName: "최도윤",
    destinationId: 4,
    rating: 5,
    comment: "여름에 방문했는데 해변이 정말 예쁘고 깨끗합니다. 밤에 보는 야경도 환상적이에요.",
    date: "2023-08-15",
    helpful: 27
  }
];
