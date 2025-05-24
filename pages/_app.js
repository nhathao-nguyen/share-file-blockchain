import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../Context/NFTs"

const chainId = ChainId.BinanceSmartChainTestnet;
const clientId = "c38a9e12590dce38c8e4ddd3b82ebeed";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={chainId} clientId={clientId}>
      <StateContextProvider>
        <Component {...pageProps}/>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}
