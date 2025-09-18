export enum DepictionPropEnum {
    attribution = "attribution",
    imageUrl = "imageUrl",
}

export interface Depiction {
    [DepictionPropEnum.attribution]: string;
    [DepictionPropEnum.imageUrl]: string;
}
