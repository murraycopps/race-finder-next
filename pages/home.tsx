import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col gap-16 p-16 min-h-screen items-center text-center">
                <h1 className="text-4xl font-bold">Welcome to my website!</h1>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 w-full">
                    <Card
                        title="Strava"
                        description="Connect to Strava and view your stats"
                        link="/strava/login"
                    />
                    <Card
                        title="Tools"
                        description="Tools to help you with your running"
                        link="/tools"
                    />
                    <Card
                        title="Reviews"
                        description="Reviews of running shoes and gear"
                        link="/reviews"
                    />
                </div>

        </div>

    )
}

// create a card to link to any page

type CardProps = {
    title: string;
    description: string;
    link: string;
}

const Card = ({title, description, link}: CardProps) => (
    <Link href={link} className="flex flex-col justify-evenly rounded-3xl hover:bg-gray-700 bg-gray-600 p-8 gap-8 aspect-square">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-2xl">{description}</p>
    </Link>
)
