type CardProps = {
    title: string;
    
    info: string|number;


    
}

export default function IndSpecsCard({title,info}: CardProps) {
    return (
        <>
        <div className="flex flex-col items-center gap-2 justify-evenly">
            <p className="text-lg font-medium">{title}:</p>
            <p className="text-lg font-bold">{info}</p>
        </div>
        </>
    )
}