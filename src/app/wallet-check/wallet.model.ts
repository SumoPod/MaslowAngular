// https://eips.ethereum.org/EIPS/eip-6963#specification

import  { EIP1193Provider } from 'web3-types';

/**
 * Represents the assets needed to display a wallet
 */
export interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

// uuid - a globally unique identifier the Wallet Provider that MUST be (UUIDv4 compliant) to uniquely distinguish different EIP-1193 provider sessions that have matching properties defined below during the lifetime of the page. The cryptographic uniqueness provided by UUIDv4 guarantees that two independent EIP6963ProviderInfo objects can be separately identified.
// name - a human-readable local alias of the Wallet Provider to be displayed to the user on the DApp. (e.g. Example Wallet Extension or Awesome Example Wallet)
// icon - a URI pointing to an image. The image SHOULD be a square with 96x96px minimum resolution. See the Images/Icons below for further requirements of this property.
// rdns - The Wallet MUST supply the rdns property which is intended to be a domain name from the Domain Name System in reverse syntax ordering such as com.example.subdomain. It’s up to the Wallet to determine the domain name they wish to use, but it’s generally expected the identifier will remain the same throughout the development of the Wallet. It’s also worth noting that similar to a user agent string in browsers, there are times where the supplied value could be unknown, invalid, incorrect, or attempt to imitate a different Wallet. Therefore, the DApp SHOULD be able to handle these failure cases with minimal degradation to the functionality of the DApp.

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  // provider: EIP1193Provider;
}

// Announce Event dispatched by a Wallet
interface EIP6963AnnounceProviderEvent extends CustomEvent {
  type: "eip6963:announceProvider";
  detail: EIP6963ProviderDetail;
}