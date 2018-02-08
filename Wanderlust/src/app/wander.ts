export enum PickUp{
    Hitchhike = "Hitchhike",
    Plane = "Plane",
    TrainBus = "Train/Bus",
    MyOwnCar = "My car"
}

export enum Aim{
    Cities = "Cities",
    NatureLandscapes = "Nature Landscapes",
    Culture = "Culture"
}

export class Wander{
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