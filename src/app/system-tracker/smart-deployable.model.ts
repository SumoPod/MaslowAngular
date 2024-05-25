export class SmartDeployable {
  public id: string;
  public chainId: number;
  public stateId: number;
  public state: string;
  public isOnline: boolean;
  public name: string;
  public ownerId: string;
  public ownerName: string;
  public typeId: number;

  // Constructor with parameters
  constructor(id: string, chainId: number, stateId: number, state: string, isOnline: boolean, name: string, ownerId: string, ownerName: string, typeId: number) {
    this.id = id;
    this.chainId = chainId;
    this.stateId = stateId;
    this.state = state;
    this.isOnline = isOnline;
    this.name = name;
    this.ownerId = ownerId;
    this.ownerName = ownerName;
    this.typeId = typeId;

    console.log("Deployable creatde with id: " + id);
  }
}