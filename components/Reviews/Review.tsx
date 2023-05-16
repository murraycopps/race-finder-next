import Stars from "@/components/Reviews/Stars";
const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
export default function Review({review}: {review: any}) {

    return (
        <div  className="flex flex-col gap-2 px-16 py-4 bg-wisteria-600 card-slant h-64">
            {/*<p className="text-3xl text-center text-white">{review.title}</p>*/}
            <p className="text-3xl text-center text-white">{capitalize(review.title)}</p>
            <div className="flex flex-row gap-6 justify-evenly text-2xl">
                {/*<p className="text-2xl text-center text-white">{review.author}</p>*/}
                <p className="text-2xl text-center text-white">{capitalize(review.author)}</p>
                <Stars number={review.rating}/>
            </div>
            {/*<p className="text-lg text-center text-white overflow-hidden h-full overflow-ellipse overflow-y-auto" >{review.review}</p>*/}
            <p className="text-lg text-center text-white overflow-hidden overflow-ellipse overflow-y-auto" >{capitalize(review.review)}</p>
        </div>
    )
}
