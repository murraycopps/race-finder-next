import Link from "next/link";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import ShoeList from "@/components/ShoeList";

export default function HomePage() {
    return (
        <PageWrapper page="Home" className="flex flex-col items-center min-h-screen gap-16 p-16 text-center">
            <h1 className="text-4xl font-bold">Welcome to my website!</h1>
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
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
            {/*<ShoeList />*/}
            <SlantedTitle title="Our Reviews"/>

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
    <Link href={link}
          className="relative flex flex-col gap-8 p-8 overflow-hidden justify-evenly rounded-3xl bg-strava aspect-square">
        <Image src={img} alt="" width="1000" height="1000" className="absolute inset-0 object-cover w-full h-ful"/>
        <div className="absolute inset-0 w-full h-full bg-gray-600 opacity-80 hover:opacity-70"/>
        <h2 className="z-50 text-4xl font-bold">{title}</h2>
        <p className="z-50 text-2xl">{description}</p>
    </Link>
)

const SlantedTitle = ({title}: { title: string }) => (
    <div className="relative flex flex-col items-center justify-center w-full h-full slanted">
        <h2 className="relative z-10 text-4xl font-bold">{title}</h2>
    </div>
)
