export interface ItemData {
    name: string;
    description: string;
    image: string;
    attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: number | string;
}