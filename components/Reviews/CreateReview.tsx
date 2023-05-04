import ReviewsHand from "@/scripts/ReviewsHand";
import {ChangeEvent, SyntheticEvent, useRef, useState} from "react";

export default function CreateReview({id}: { id: string}) {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(-1);
    const ref = useRef<HTMLFormElement>(null);

const addReview = async (e: SyntheticEvent) => {
e.preventDefault();
    // get the title and author from the form
    const formDate = new FormData(e.target as HTMLFormElement);
    const title = formDate.get("title")?.toString() || "";
    const author = formDate.get("author")?.toString() || "";
    const email = formDate.get("email")?.toString() || "";


    const review = {
        id,
        title,
        author,
        email,
        review : reviewText,
        rating


    }
    console.log(review);
    if (!title || !reviewText || rating < 0 || rating > 5) {
        console.log("invalid review");
        return;

    }
    ReviewsHand.addReview(review);
//     clear the form`
    setReviewText("");
    setRating(0);
    if (ref.current) {
        ref.current.reset();
    }



}

    return (
            <div className="flex flex-col gap-2 p-16  card-slant-lg bg-wisteria-600 col-end-5 col-start-3 row-start-1 row-end-3">

            <form onSubmit={addReview} className="flex flex-col items-center gap-2 justify-evenly p-8" ref={ref}>


                <input type="text" name="title" id="title" className=" w-full p-2 text-xl bg-wisteria-600 border-2 border-wisteria-500 rounded-md placeholder-gray-300" placeholder="Title" />
                <textarea value={reviewText} onChange={(e: ChangeEvent <HTMLTextAreaElement>) => setReviewText(e.target.value)} className="w-full h-32 p-2 text-xl bg-wisteria-600 border-2 border-wisteria-500 rounded-md placeholder-gray-300" placeholder="Write your review here..."></textarea>

                <div className="flex flex-col items-center justify-center gap-2">
                    {/*<label htmlFor="rating" className="text-xl font-medium">Rating:</label>*/}
                    <StarRating rating={rating} setRating={setRating} />
                    </div>
                <button type="submit" className=" py-4 px-20 text-2xl font-semibold bg-ronchi-500 border-2 border-ronchi-400 rounded-md text-white">Submit</button>

            </form>
</div>
    )
}

const StarRating = ({rating, setRating}: {rating: number; setRating: (rating: number) => void} ) =>(
    <div className="flex flex-row items-center justify-center gap-2">
        {[1,2,3,4,5].map((num) =>(
            <button key={num} onClick={() => setRating(num)} type="button" className={`text-4xl ${num <= rating ? "text-yellow-500" : "text-gray-200"}`}>★</button>
        ))}
    </div>

)