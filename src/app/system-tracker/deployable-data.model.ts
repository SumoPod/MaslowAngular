export interface SolarSystem {
  solarSystemId: number;
  solarSystemName: string;
  solarSystemNameId: number;
}

export interface Fuel {
  fuelAmount: number;
  fuelConsumptionPerMin: number;
  fuelMaxCapacity: number;
  fuelUnitVolume: number;
}

export interface StorageItem {
  typeId: number;
  itemId: string;
  quantity: number;
  name: string;
  image: string;
}

export interface Inventory {
  storageCapacity: number;
  usedCapacity: number;
  storageItems: StorageItem[];
  ephemeralInventoryList: any[];
}

export interface Gatekeeper {
  isGoalReached: boolean;
  acceptedItemTypeId: number;
  targetQuantity: number;
}

export interface DetailedDeployableInfo {
  id: string;
  typeId: number;
  ownerId: string;
  ownerName: string;
  chainId: number;
  name: string;
  description: string;
  dappUrl: string;
  image: string;
  isOnline: boolean;
  stateId: number;
  state: string;
  anchoredAtTime: string;
  solarSystemId: number;
  solarSystem: SolarSystem;
  region: string;
  locationX: number;
  locationY: number;
  locationZ: number;
  floorPrice: string;
  fuel: Fuel;
  modules: any;
  inventory: Inventory;
  gatekeeper: Gatekeeper;
}