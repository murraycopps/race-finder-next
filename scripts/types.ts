type Shoe = {
    name: string;
    price: number;
    bestUse: string;
    surface: string;
    rating: string;
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
    rating: string;
    img: string;
    color: string;
    use: string;
    brand: string;
    brandLogo: string;
    link: string;
    brandLink: string;
    review: string;
    id: string;
    type: "clothes";

};


type Item = {
    name: string;
    price: number;
    rating: string;
    img: string;
    brand: string;
    brandLogo: string;
    link: string;
    brandLink: string;
    review: string;
    id: string;
    type: string;

}

export type { Shoe, User, Goal, Clothes, Item }
