type CardProps = {
    title: String;
    
    info: {
        name: string;
        price: string;
        use: string;
        surface: string;
        rating: string;
        weight: string;
        drop: string;
        heelStackHeight: string;
        forefootStackHeight: string;
        arch: string;
        brand: string;

    }
    
}

export default function IndependentSpecsCard({ title, info}: CardProps) {
    return (
        <>
        <div className="flex flex-col items-center gap-2 justify-evenly">
            <p><span className="text-lg font-medium">{title}:</span></p>
            <p className="text-lg font-bold">{info}</p>
        </div>
        </>
    )
}