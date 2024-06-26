import { DetailedDeployableInfo } from "./deployable-data.model";
import { SmartDeployable } from "./smart-deployable.model";

export interface SmartCharacterInfo {
  address: string;
  id: string;
  name: string;
  isSmartCharacter: boolean;
  createdAt: number;
  eveBalanceWei: string;
  gasBalanceWei: string;
  image: string;
  smartDeployables: SmartDeployable[];
}

export interface WebSocketMessage {
  smartCharacter: SmartCharacterInfo
  smartDeployable: DetailedDeployableInfo
}
