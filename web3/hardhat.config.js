/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = "fc167fe00625c80cae7b1925718aaed6b9cf01a57df8674dd4a0bc1d0063f740";
const RPC_URL = "https://97.rpc.thirdweb.com";

module.exports = {
  defaultNetwork: "bnb_network",
  networks: {
    hardhat: {
      chainId: 97,
    },
    bnb_network: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
