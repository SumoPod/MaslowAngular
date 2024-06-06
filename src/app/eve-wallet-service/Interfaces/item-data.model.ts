export interface ItemData {
    name: string;
    description: string;
    image: string;
    attributes: Attribute[];
    chainId?: number;
}

export interface Attribute {
  trait_type: string;
  value: number | string;
}

export interface ItemDetailedData {
  cid: string;
  metadata: Metadata;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: number | string;
}