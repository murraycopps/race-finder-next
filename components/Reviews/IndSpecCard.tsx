type CardProps = {
    title: string;
    
    info: string|number;


    
}

export default function IndSpecsCard({title,info}: CardProps) {
    return (
        <>
        <div className="flex flex-col items-center gap-4 justify-evenly">
            <p className="text-xl font-medium">{title}:</p>
            <p className="text-2xl font-bold">{info}</p>
        </div>
        </>
    )
}