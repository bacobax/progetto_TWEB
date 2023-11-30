export interface Player{
    name: string;
    age: number;
    country: string;
    description: string;
    image: string;
    id: number | string;
    generalScore: number
    statistics: Statistic
}


type Statistic = {
    [key: string]: number
}
