export interface Review {
    review_id: number;
    review_star: number;
    review_text: string;
    user_id: number;
    hotel_id: number;
    restaurant_id: number;
    is_hide: boolean;
  }