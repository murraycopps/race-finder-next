type CardProps = {
    title: String;
    item: {
        name: string;
        price: number;
        use: string;
        surface: string;
        rating: number;
        weight: number;
        drop: number | string;
        heelStackHeight: number | string;
        forefootStackHeight: number | string;
        arch: string;
        brand: string;
    }
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

export default function IndependentSpecsCard({item, title, info}: CardProps) {
    return (
        <>
        <div className="flex flex-col items-center gap-2 justify-evenly">
            <p><span className="text-lg font-medium">{title}:</span></p>
            <p className="text-lg font-bold">{item.info}</p>
        </div>
        </>
    )
}