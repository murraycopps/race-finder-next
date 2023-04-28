import {Review} from "@/scripts/types";
import {shoes} from "@/scripts/shoes";

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
        const res = await fetch('/api/reviews');
        const reviewsJson = await res.json();
        const reviews =  reviewsJson.data as ReviewID[];
        shoes.map(shoe => {
            shoe.reviews = reviews.filter(review => review.id === shoe.id)
        })

        return reviews;
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
