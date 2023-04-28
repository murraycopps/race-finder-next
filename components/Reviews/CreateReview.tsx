import ReviewsHand from "@/scripts/ReviewsHand";
import {ChangeEvent, SyntheticEvent, useState} from "react";

export default function CreateReview({id}: { id: string}) {
    const [reviewText, setReviewText] = useState("");

const addReview = async (e: SyntheticEvent) => {
e.preventDefault();
    // get the title and author from the form
    const formDate = new FormData(e.target as HTMLFormElement);
    const title = formDate.get("title")?.toString() || "";
    const author = formDate.get("author")?.toString() || "";
    const email = formDate.get("email")?.toString() || "";
    const rating = parseInt(formDate.get("rating")?.toString() || "-1");


    const review = {
        id,
        title,
        author,
        email,
        review : reviewText,
        rating


    }
    console.log(review);
    if (!title || !author || !email || !reviewText || rating < 0 || rating > 5) {
        console.log("invalid review");
        return;

    }
    ReviewsHand.addReview(review);

}

    return (

            <form onSubmit={addReview} className="flex flex-col items-center gap-2 justify-evenly p-8">


                <input type="text" name="title" id="title" className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="Title" />
                <input type="text" name="author" id="author" className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="Author" />
                <input type="email" name="email" id="email" className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="RunnersHub@gmail.com"/>
                <textarea value={reviewText} onChange={(e: ChangeEvent <HTMLTextAreaElement>) => setReviewText(e.target.value)} className="w-128 h-32 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="Write your review here..."></textarea>

                <div className="flex flex-col items-center justify-center gap-2">
                    <label htmlFor="rating" className="text-xl font-medium">Rating:</label>
                    <input type="number" name="rating" id="rating" className="w-16 h-16 p-4 text-2xl border-2 border-gray-300 rounded-md text-black" placeholder="0" />
                    </div>
                <button type="submit" className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-white">Submit</button>

            </form>

    )
}