export default function CreateReview() {


    return (

            <div className="flex flex-col items-center gap-2 justify-evenly p-8">


                <input type="text" name="title" id="title" className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="Title" />
                <input type="text" name="author" id="author" className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="Author" />
                <input type="email" name="email" id="email" className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="RunnersHub@gmail.com"/>
                <textarea className="w-128 h-32 p-4 text-xl border-2 border-gray-300 rounded-md text-black" placeholder="Write your review here..."></textarea>

                <div className="flex flex-col items-center justify-center gap-2">
                    <label htmlFor="rating" className="text-xl font-medium">Rating:</label>
                    <input type="number" name="rating" id="rating" className="w-16 h-16 p-4 text-2xl border-2 border-gray-300 rounded-md text-black" placeholder="0" />
                    </div>
                <button className="w-128 h-16 p-4 text-xl border-2 border-gray-300 rounded-md text-white">Submit</button>

            </div>

    )
}