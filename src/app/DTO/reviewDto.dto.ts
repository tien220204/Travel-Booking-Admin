export interface ReviewDto {
    reviewId: number;
    reviewStar: string;
    reviewText: string;
    userId: number;
    hotelId: number | null;
    restaurantId: number | null;
    isHide: string;
}