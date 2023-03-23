import Stars from "@/components/Reviews/Stars";


type CardProps ={
    item: {
        brand: string;
        price: number;
        use: string;
        rating: number;

}
}

export default function SpecsCard({item}: CardProps) {
    return (
        <>
       
        <div className="flex flex-col items-center gap-2 justify-evenly">
        <p><span className="text-lg font-medium">Brand:</span></p>
        <p className="text-lg font-bold">{item.brand}</p>
    </div>
    <div className="flex flex-col items-center gap-2 justify-evenly">
        <p><span className="text-lg font-medium">Price:</span></p>
        <p className="text-lg font-bold">${item.price}</p>
    </div>
    <div className="flex flex-col items-center gap-2 justify-evenly">
        <p><span className="text-lg font-medium">Best Use:</span></p>
        <p className="text-lg font-bold">{item.use}</p>
    </div>
   
    <div className="flex flex-col items-center gap-2 justify-evenly">
        <p><span className="text-lg font-medium">Rating:</span></p>
        <p className="m-0 text-xl ">
            <Stars number={item.rating} total={5}/>
        </p>
    </div>
    </>
    )
}