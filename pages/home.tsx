import Link from "next/link";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";

export default function HomePage() {
    return (
        <PageWrapper page="Home" className="flex flex-col gap-16 p-16 min-h-screen items-center text-center">
                <h1 className="text-4xl font-bold">Welcome to my website!</h1>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 w-full">
                    <Card
                        title="Strava"
                        description="Connect to Strava and view your stats"
                        link="/strava/login"
                        img="/review-cards/strava-icon.png"
                    />
                    <Card
                        title="Tools"
                        description="Tools to help you with your running"
                        link="/tools"
                        img="/review-cards/clock-icon.png"
                    />
                    <Card
                        title="Reviews"
                        description="Reviews of running shoes and gear"
                        link="/reviews"
                        img="/review-cards/shoe.webp"
                    />
                </div>

        </PageWrapper>

    )
}

// create a card to link to any page

type CardProps = {
    title: string;
    description: string;
    link: string;
    img: string;
}

const Card = ({title, description, link, img}: CardProps) => (
    <Link href={link} className="relative rounded-3xl bg-strava aspect-square overflow-hidden">
        <Image src={img} alt="" width="1000" height="1000" className="absolute inset-0 w-full h-ful object-cover" />
        <div className="absolute inset-0 w-full h-full bg-gray-600 opacity-90 flex flex-col  justify-evenly p-8 gap-8" >
            <h2 className="text-4xl font-bold">{title}</h2>
            <p className="text-2xl">{description}</p>
        </div>

    </Link>
)
