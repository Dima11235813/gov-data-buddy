export interface HouseService {
    end: number | null;
    start: number;
}

export interface SenateService {
    end: number | null;
    start: number;
}

export interface Served {
    House?: HouseService[];
    Senate?: SenateService[];
}