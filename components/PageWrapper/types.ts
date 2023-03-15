type Route  = {
    route: string;
    name: string;
    children?: Route[];
}

export type { Route }