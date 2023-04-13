type CardProps = {
    features: {
        name: string;
        value: string;
    }[];
}

export default function FeaturesCard({features}: CardProps) {
    return (
       <>
           {features.map((feature, i) =>(
                   <div className="flex flex-col items-center gap-2 justify-evenly" key={i}>
                       <p className="text-xl font-medium">{feature.name}:</p>
                       <p className="text-2xl font-bold">{feature.value}</p>
                   </div>
               )

           )}
       </>
    )
}