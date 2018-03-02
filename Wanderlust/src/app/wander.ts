export enum PickUp{
    Any = "Any",
    Hitchhike = "Hitchhike",
    Plane = "Plane",
    Train = "Train",
    Bus = "Bus",
    MyCar = "My car"
}

export enum Aim{
    Any = "Any",
    Cities = "Cities",
    NatureLandscapes = "Nature Landscapes",
    Culture = "Culture"
}

export class Wander {
    id: number;
    destinations: string[];
    startDate: string;
    endDate: string;
    pickUp: PickUp;
    aim: Aim;
    budget: number;
    people: number;
    description: string;
}
