export class EveWalletData {
  address: string;
  username: string;
  chain: string;
  // -- Tokens are stored with all decimals.
  gasBalance: number;
  // This should be array because there is lots of token.
  eveTokenBalance: number;

  constructor()
  {
    this.address = null;
    this.chain = null;
    this.username = null;
    this.gasBalance = null;
    this.eveTokenBalance = null;
  }
}