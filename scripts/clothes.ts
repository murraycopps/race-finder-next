import {Clothes} from "@/scripts/types";

const clothes: Clothes[] = [
    {
        name: 'Boa 1" Elite split shorts',
        price: 42,
        rating: 5,
        img: "/images/vaporfly.png",
        color: "Black",
        use: "Training/Racing",
        brand: "BOA",
        brandLogo: "/images/boa-logo.png",
        link: "https://www.runningwarehouse.com/Mens_Nike_Vaporfly/catpage-MVAPORFLY.html",
        brandLink: "https://www.nike.com/w?q=vaporfly&vst=vaporfly",
        review: "stuff",
        id: 'boa-elite-split-shorts',
        type: "clothes",
        clotheType: "shorts",
        features: [
            {
                name: "Inseam",
                value: "1\""
            },
            {
                name: "Patterns",
                value: "Yes"
            },
        ]
    },
    {
        name: "Nike Dri-FIT ADV AeroSwift",
        price: 90,
        rating: 4,
        img: "/images/aeroswiftSinglet2.png",
        color: "Pink",
        use: "Training/Racing",
        brand: "Nike",
        brandLogo: "/images/nikeLogo.jfif",
        link: "https://www.runningwarehouse.com/Mens_Nike_Vaporfly/catpage-MVAPORFLY.html",
        brandLink: "https://www.nike.com/t/dri-fit-adv-aeroswift-mens-racing-singlet-9xgk0c",
        review: "stuff",
        id: 'nikr-dri-fit-adv-aeroswift',
        type: "clothes",
        clotheType: "shorts",
        features: [
            {
                name: "Inseam",
                value: "1\""
            },
            {
                name: "GPS",
                value: "Yes"
            },
        ]

    }
]
export {clothes};