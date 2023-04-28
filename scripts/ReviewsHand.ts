import {Review} from "@/scripts/types";

interface ReviewID extends Review {
    id: string
}

export default class ReviewsHand {
    static hasReview = false;

    static async getReviews() {
        // if(this.hasReview) {
        //     return [];
        // }
        this.hasReview = true;
        const reviews = await fetch('/api/reviews');
        const reviewsJson = await reviews.json();
        return reviewsJson.data
    }

    static async addReview(review: ReviewID) {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });
        const json = await response.json();
        return json;

    }
}
