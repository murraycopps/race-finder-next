type Shoe = {
    name: string;
    price: number;
    use: string;
    surface: string;
    rating: number;
    img: string;
    weight: number;
    drop: number | string;
    heelStackHeight: number | string;
    forefootStackHeight: number | string;
    arch: string;
    brand: string;
    brandLogo: string;
    link: string;
    brandLink: string;
    review: string;
    id: string;
    type: "shoe";
}

type User = {
    _id: string;
    username: string;
    password: string;
    accessToken?: string;
    expiresAt?: number;
    refreshToken?: string;
    goals?: Goal[];
};

type Goal = {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    createdAt: number;
    updatedAt: number;
};

type Clothes = {
    name: string;
    price: number;
    rating: number;
    img: string;
    croppedImg: string;
    use: string;
    brand: string;
    brandLogo: string;
    link: string;
    brandLink: string;
    review: string;
    id: string;
    type: "clothes";
    clotheType: "shorts" | "spandex" | "pants" | "tights" | "shirt" | "singlet" | "jacket" | "socks" | "other"
    features?: {
        name: string;
        value: string;
    }[];

};


type Item = {
    name: string;
    price: number;
    rating: number;
    img: string;
    brand: string;
    brandLogo: string;
    croppedImg?: string;
    link: string;
    brandLink: string;
    review: string;
    id: string;
    type: string;

}

type Other = {
    name: string;

    price: number;
    rating: number;
    img: string;
    color: string;
    use: string;
    brand: string;
    brandLogo: string;
    link: string;
    brandLink: string;
    review: string;
    id: string;
    type: "other";
    otherType: "watch" | "hydration" | "nutrition" | "accessories" | "other";
    features?: {
        name: string;
        value: string;
    }[];

}

type Quote = {
    name: string;
    quote: string;
    img: string;
}

type Review = {
    title: string;
    author: string;
    email: string;
    rating: number;
    review: string;

}

export type { Shoe, User, Goal, Clothes, Item, Other, Quote, Review }
