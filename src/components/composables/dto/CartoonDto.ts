export interface CartoonDto {
    id: string,
    slug: string,
    name: string,
    age: string,
    gender: string,
    show: string,
    description: string,
    color: string;
    video: string;
    hearts: string;
    stars: string;
}

export type PartialCartoon = Partial<CartoonDto>