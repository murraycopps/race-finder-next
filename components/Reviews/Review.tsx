import Stars from "@/components/Reviews/Stars";
import {useState} from "react";
const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
export default function Review({review}: {review: any}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div  className="flex flex-col justify-evenly gap-2 px-16 py-4 bg-wisteria-600 card-slant h-64" onClick={() => {setOpen(true)}}>
                {/*<p className="text-3xl text-center text-white">{review.title}</p>*/}
                <p className="text-3xl text-center text-white">{capitalize(review.title)}</p>
                <div className="flex flex-row gap-6 justify-evenly text-2xl">
                    {/*<p className="text-2xl text-center text-white">{review.author}</p>*/}
                    <p className="text-2xl text-center text-white">{capitalize(review.author)}</p>
                    <Stars number={review.rating}/>
                </div>
                {/*<p className="text-lg text-center text-white overflow-hidden h-full overflow-ellipse overflow-y-auto" >{review.review}</p>*/}
                {/*<p className="text-lg text-center text-white overflow-hidden overflow-ellipse overflow-y-auto" >{capitalize(review.review)}</p>*/}
            </div>
            {open && <div className="fixed inset-0 z-50 bg-base opacity-80" onClick={() => {setOpen(false)}}/>}
            {open && <div className="flex flex-col gap-4 justify-evenly bg-wisteria-600 w-128 aspect-square p-16 fixed z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-xl">
                <button
                    className="absolute flex flex-col justify-between w-12 h-10 px-1 py-2 text-white rounded-full right-4 nav-button open top-4 lg:left-4"
                    onClick={() => {setOpen(false)}}
                >
                    <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
                    <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
                    <span className="z-50 w-full h-1 bg-gray-200 rounded-full transition-all-300" />
                </button>
                <p className="text-3xl text-center text-white">{capitalize(review.title)}</p>
                <div className="flex flex-row gap-6 justify-evenly text-2xl">
                    {/*<p className="text-2xl text-center text-white">{review.author}</p>*/}
                    <p className="text-2xl text-center text-white">{capitalize(review.author)}</p>
                    <Stars number={review.rating}/>
                </div>
                <p className=" text-lg text-center text-white overflow-hidden overflow-ellipse overflow-y-auto" >{capitalize(review.review)}</p>
            </div>
            }
        </>
    )
}
